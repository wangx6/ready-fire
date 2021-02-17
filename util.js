/**
 * utility file
 * 
 * Contains generic functions
 * 
 */

const {v4: uuid} = require('uuid');

/**
 * 
 * param {  }
 * return {  }
 */
const genKey = (prefix) => {
    prefix = prefix ?  `${prefix}-` : '';
    return `${prefix}${Math.random().toString(32).substr(2)}`;
}

/**
 * 
 * param {  }
 * return {  }
 */
const argsHandler = (args) => {
    const t = {};
    args.forEach((arg) => {
        const tt = arg.trim().split(/=/);
        t[tt[0]] = JSON.parse(tt[1]);
    });
    return t;
}

/**
 * 
 * param {  }
 * return {  }
 */
module.exports = {
    genKey,
    argsHandler,
}