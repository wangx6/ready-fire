const axios = require('axios');
const util = require('./util');
const { calStartTime, calDuration } = require('./interceptors');

axios.interceptors.request.use(calStartTime);
axios.interceptors.response.use(calDuration);

function User(options) {
    const { url, payload, methodType} = options;
    const uid = util.genKey('uid');

    function fire(rid) {
        return new Promise((resolve, reject) => {
            axios({
                url, 
                method: methodType,
                data: payload,
                timeout: 10000,
            })
                .then((res) => {
                    resolve({rid, data: res.duration});
                })
                .catch((err) => {
                    reject({rid, data: 'failed'});
                });
        });
    }

    function getUid() {
        return uid
    }

    return {
        fire,
        getUid,
    };
}

module.exports = User;