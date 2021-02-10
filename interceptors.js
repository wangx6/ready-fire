/**
 * interceptors
 * param {  }
 * return {  }
 */
const calStartTime = (request) => {
    request.metadata = { startTime: new Date() }
    return request;
};

/**
 * interceptors
 * param {  }
 * return {  }
 */
const calDuration = (response) => {
    response.config.metadata.endTime = new Date();
    const { startTime, endTime } = response.config.metadata;
    response.duration = endTime - startTime;
    return response;
};

/**
 * interceptors
 * param {  }
 * return {  }
 */
module.exports = {
    calStartTime, 
    calDuration,
};