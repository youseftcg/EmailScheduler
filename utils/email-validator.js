const validator = require("email-validator");

/**
 * Checks if the passed email is a valid email address
 */
function validate(email){
    return validator.validate(email);
}

module.exports.validate = validate;