const util  = require('./util');
const axios = require('axios');
const { calStartTime, calDuration } = require('./interceptors');


axios.interceptors.request.use(calStartTime);
axios.interceptors.response.use(calDuration);

(async () => {
    // collect test configs
    const {tid, methodType, url, data} = util.argsHandler(process.argv.splice(2));
    
    // fire request
    const res = await axios[methodType](url, data);

    // collecting data
    process.stdout.write(JSON.stringify({
        tid,
        data: JSON.stringify(res.data), 
        duration: res.duration,
        startTime: res.config.metadata.startTime,
        endTime: res.config.metadata.endTime,
    }));

})();
