const {spawn}  = require('child_process');
const express = require('express');
const bodyParser = require('body-parser');
const util = require('./util');
const testManager = require('./testManager');

const PORT = 8080;

// middle ware
const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// run test
app.post('/runtest', (req, res) => {
    const tid = util.genKey();
    const { body } = req;

    testManager.runTest(tid, body);
    res.json({ok: true, data: {tid}});
});

// health check
app.post('/healthcheck', (req, res) => {
    res.json({ok: true});
});

// start the api
app.listen(PORT, () => {
    console.log(`running on port ${PORT} `);
});