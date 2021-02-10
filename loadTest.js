const util  = require('./util');
const axios = require('axios');
const { calStartTime, calDuration } = require('./interceptors');
const reportManager = require('./reportManager');

axios.interceptors.request.use(calStartTime);
axios.interceptors.response.use(calDuration);

(async () => {
    // collect test configs
    const {tid, methodType, url, data} = util.argsHandler(process.argv.splice(2));
    rm = reportManager(tid);
    
    // fire request
    const res = await axios[methodType](url, data);
    rm.appendRecordToReportFile([{name: 'adaf', lang: 'dfdlk;jkj'}]);

    // collecting data
    process.stdout.write(JSON.stringify({
        tid,
        data: JSON.stringify(res.data), 
        duration: res.duration,
        startTime: res.config.metadata.startTime,
        endTime: res.config.metadata.endTime,
    }));

})();
