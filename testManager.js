const util = require('./util');
const reportManager = require('./reportManager');
const { Worker } = require('worker_threads');

const cache = {};

const runTest = (config) => {
    const tid = util.genKey('tid');
    const w = new Worker(__dirname + '/loadTest.js', {
        workerData: {...config, tid},
    });

    cache[tid] = w;
    w.on('exit', () => {
        console.log('Test complete:: '+ tid);
        delete cache[tid]
    })
    w.on('message', (message) => {
        console.log(message);
    });

}

function getCount(){
    return Object.keys(cache).length;
}

module.exports = {
    runTest, getCount
}