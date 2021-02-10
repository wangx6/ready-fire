const axios = require('axios');
const { response } = require('express');

axios.interceptors.request.use((request) => {
    request.metadata = { startTime: new Date() }
    return request;
});

axios.interceptors.response.use((response) => {
    response.config.metadata.endTime = new Date();
    const { startTime, endTime } = response.config.metadata;
    response.duration = endTime - startTime;
    return response;
});

const runTest = async (tid, body) => {
    console.log(tid);
    console.log(body);
    const {
        url,
        methodType,
        data
    } = body;
    console.log(tid)
    const res = await axios.get(url, data);
    console.log(res.duration);
};


module.exports = {
    runTest,
}