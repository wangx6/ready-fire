/**
 * testManager
 * 
 * @createdby Yinghan Wang
 * @date 16/02/2021
 * 
 * The test manager is handling worker pool
 * if there is an request coming in the test manager
 * will first check if there is an idle worker available
 * if so, it will post the data to the worker
 * when works job is done it will post a message back to the
 * parentPort. And then the worker will be returned back to 
 * the worker poll.
 */

const util = require('./util');
const { Worker } = require('worker_threads');

/**
 * Path of the worker process
 * param {  }
 * return {  }
 */
const WORKER_PATH =__dirname + '/loadTest.js';

/**
 * Worker pool
 * param {  }
 * return {  }
 */
const workerPool = [
    new Worker(WORKER_PATH),
    new Worker(WORKER_PATH),
    new Worker(WORKER_PATH),
    new Worker(WORKER_PATH),
    new Worker(WORKER_PATH),
    new Worker(WORKER_PATH),
    new Worker(WORKER_PATH),
    new Worker(WORKER_PATH),
    new Worker(WORKER_PATH),
    new Worker(WORKER_PATH),
];

/**
 * Check if there is an available worker
 * param {  }
 * return {  }
 */
function hasFreeWorker() {
    return workerPool.length > 0;
}

/**
 * Grab a free worker
 * param {  }
 * return {  }
 */
function getFreeWorker() {
    return workerPool.shift();
}

/**
 * Run the test
 * param {  }
 * return {  }
 */
const runTest = (config, worker) => {
    const tid = util.genKey('tid');
    worker.postMessage({...config, tid});
    worker.once('message', (message) => {
        if(message === 'done') {
            workerPool.push(worker);
        }
    });
    return tid;
}

/**
 * Api
 * param {  }
 * return {  }
 */
module.exports = {
    runTest, 
    hasFreeWorker, 
    getFreeWorker
}