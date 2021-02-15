const express = require('express');
const bodyParser = require('body-parser');
const testManager = require('./testManager');
const PORT = 8080;

// middle ware
const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// run test
app.post('/runtest', (req, res) => {
    const { config } = req.body;
    if(testManager.getCount() >= 5) {
        res.json({ ok: false, error: ['buffer queue is full atm'] });
    } else {
        testManager.runTest(config);
        res.json({ok: true, data: {}});
    }
});

// health check
app.post('/healthcheck', (req, res) => {
    res.json({ok: true});
});

// start the api
app.listen(PORT, () => {
    console.log(`running on port ${PORT} `);
});