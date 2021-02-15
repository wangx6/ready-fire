const axios = require('axios');
const util = require('./util');
const { calStartTime, calDuration } = require('./interceptors');

axios.interceptors.request.use(calStartTime);
axios.interceptors.response.use(calDuration);

function User(options) {
    const { url, payload, methodType} = options;
    const uid = util.genKey('uid');

    async function fire(rid) {
        try{
            const res = await axios[methodType](url, payload);
            console.log(rid + ' --- ' + res.duration);
            return {ok: true, rid, res};
        } catch(err) {
            return {ok: false, rid, err}
        }
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