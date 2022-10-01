const pino = require("pino")()

function info(message) {
    pino.info(message)
}

function error(message) {
    pino.error(message)
}

function debug(message) {
    pino.debug(message)
}

function warn(message) {
    pino.warn(message)
}

function trace(message) {
    pino.trace(message)
}

function fatal(message) {
    pino.fatal(message)
}


module.exports.trace = trace;
module.exports.debug = debug;
module.exports.info = info;
module.exports.warn = warn;
module.exports.error = error;
module.exports.fatal = fatal;