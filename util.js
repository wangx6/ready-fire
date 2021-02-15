const {v4: uuid} = require('uuid');
const genKey = (prefix) => {
    prefix = prefix ?  `${prefix}-` : '';
    return `${prefix}${Math.random().toString(32).substr(2)}`;
}
const argsHandler = (args) => {
    const t = {};
    args.forEach((arg) => {
        const tt = arg.split(/=/);
        t[tt[0]] = JSON.parse(tt[1]);
    });
    return t;
}
module.exports = {
    genKey,
    argsHandler,
}