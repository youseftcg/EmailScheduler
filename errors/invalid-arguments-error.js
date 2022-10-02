/**
 * This error is used when an invalid argument is passed to a function.
 */
class InvalidArgumentError extends Error {
    constructor(msg) {
        super(msg);
        this.name = this.constructor.name;
    }
}

module.exports = InvalidArgumentError;