const {v4: uuid} = require('uuid');
const genKey = () => {
    return uuid();
}

module.exports = {
    genKey,
}