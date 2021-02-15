const util = require('./util');
const User = require('./user');
const reportManager = require('./reportManager');

const { parentPort, workerData } =  require('worker_threads');

const {
    maxThroughput,  // max throughput
    tid,            // test id: tracking report
    duration,       // example: 1000 sec
    testType,       // [STRESS, BURST]
    url,            // endpoint to test
    payload,        // payload [POST, PUT, DELETE]
    methodType,     // [POST, GET]
} = workerData;

const count = duration;
let c = 0;
const users = [];
const rm = reportManager(tid);

// const requestsMap = {};

function initUsers(count) {
    for(let i = 0; i < maxThroughput; i++) {
        users.push(User({url, methodType, payload}));
    }
}

function readySteadyFire() {
    // this is the place to checke the test type
    users.forEach(u => {
        const requestId = util.genKey('rid');
        // requestsMap[requestId] = {};
        u.fire(requestId).then(res => {
            const record = {rid: res.rid};
            const data = res.ok ? res.res.duration : 'failed';
            rm.appendRecordToReportFile([{rid: res.rid, data: res.res.duration}]);
        });
    });
}

function run() {
    const it = setInterval( async() => {
        c++;
        if(c === count) {
            clearInterval(it);
        } else{
            readySteadyFire();
        }
    }, 1000);
}


initUsers();
run();


