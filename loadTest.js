const util = require('./util');
const User = require('./user');
const reportManager = require('./reportManager');
const { parentPort } =  require('worker_threads');

parentPort.on('message', (data) => {
    const {
        maxThroughput,  // max throughput
        tid,            // test id: tracking report
        duration,       // example: 1000 sec
        testType,       // [STRESS, BURST]
        url,            // endpoint to test
        payload,        // payload [POST, PUT, DELETE]
        methodType,     // [POST, GET]
    } = data;
    
    let c = 0;
    const users = [];
    const rm = reportManager(tid);
    const totalRequests = duration * maxThroughput;
    const requestsMap = {};
    const stack = [];
    let resCount = 0;
    
    function initUsers(numOfUsers, config) {
        for(let i = 0; i < numOfUsers; i++) {
            users.push(User(config));
        }
    }
    
    function readySteadyFire() {
        users.forEach(u => {
            const rid = util.genKey('rid');
            const dateTime = new Date().getTime();
            stack.push({rid, dateTime});
            requestsMap[rid] = {};
            u.fire(rid)
                .then(res => {requestsMap[rid] = res;})
                .catch((err) => {requestsMap[rid] = err;})
                .finally(() => {
                    resCount++;
                    if(resCount === totalRequests) {
                        const records = stack.map((s) => ({...requestsMap[s.rid], dateTime: s.dateTime}));
                        rm.appendRecordToReportFile(records);
                        parentPort.postMessage('done');
                    } else {
                        const progress = (Math.ceil(resCount / totalRequests * 100));
                        process.stdout.write(progress + '%\n');
                    }
                })
        });
    }
    
    function run(duration) {
        const it = setInterval( async() => {
            readySteadyFire();
            c++;
            if(c === duration) {
                clearInterval(it);
            }
        }, 1000);
    }
    
    
    initUsers(maxThroughput, {url, methodType, payload});
    run(duration);
});
