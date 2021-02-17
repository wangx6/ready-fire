/**
 * 
 * param {  }
 * return {  }
 */

function Response() {
    function fail(message) {
        if(!Array.isArray(message)) message = [message];
        return { ok: false, error: message }
    }

    function done(data = []) {
        return { ok: true, data: data }
    }

    return {
        fail,
        done
    };
}

module.exports = Response;