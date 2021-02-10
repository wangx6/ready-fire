const util = require('./util');
const {spawn} = require('child_process');

function createThreads(options) {
    const ps = [];
    const args = Object.keys(options).map(key => `${key}=${JSON.stringify(options[key])}`);
    for(let i = 0; i < options.concurrentUser; i++) {
        ps.push(spawn('node', ['loadTest.js', ...args]));
    }
    return ps;
};

function runTest(config) {
    const options = {tid: util.genKey(), ...config};
    const ps = createThreads(options);
    
    let responses = ps.map((p) => {
        return new Promise((res, rej) => {
            p.stdout.on('data', (data) => {
                res(data.toString());
            });
            p.on('exit', (code) => {
                console.log(`Exit code:: ${code}`);
            });
        });
    });

    Promise.all(responses).then((r) => {
        console.log('###############');
        console.log(r);
    });
}

module.exports = {
    runTest,
}