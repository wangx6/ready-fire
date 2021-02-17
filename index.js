const express = require('express');
const bodyParser = require('body-parser');
const testManager = require('./testManager');
const rs = require('./response')();
const PORT = 8080;

// middle ware
const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

/**
 * run test
 * param {  }
 * return {  }
 */
app.post('/run-test', (req, res) => {
    const { config } = req.body;
    if(testManager.hasFreeWorker()) {
        const tid = testManager.runTest(config, testManager.getFreeWorker());
        res.json(rs.done({tid}));
    } else {
        res.json(rs.fail('buffer queue is full atm'));
    }
});

/**
 * 
 * param {  }
 * return {  }
 */
app.get('/status', (req, res) => {
    const {tid} = req.query;
    if(tid) {
        res.json(rs.done());
    } else{
        res.json(rs.fail([]));
    }
});

/**
 * health check
 * param {  }
 * return {  }
 */
app.post('/health-check', (req, res) => {
    res.json(rs.done([]));
});

// start the api
app.listen(PORT, () => {
    console.log(`running on port ${PORT} `);
});