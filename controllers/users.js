const User = require("../models/user");
const userRepository = require("../repositories/users-repository");
const emailValidator = require("../utils/email-validator");
const logger = require("../utils/logger")

function addUser(req, res) {
    // Get email from the request
    const email = req.body.email;

    // Validate the email and added it to the list of users or reject it if invalid email
    if(validateEmail(email)){
        addUserToRepository(email);
        logger.info(`New email added to subscribers: ${email}`)
        // Send response
        res.status(200);
        res.json({"success":"Email added"})
    } else {
        logger.info(`Email rejected as subscriber: invalid email ${email}`)
        // Send response
        res.status(403);
        res.json({"error":"Invalid email"})
    }
}

/**
 * Adds the user to the list of users
 */
function addUserToRepository(email){
    userRepository.addUser(new User(email));
}

/**
 * Checks if the passed email is a valid email address
 */
function validateEmail(email){
    return emailValidator.validate(email);
}

module.exports.addUser = addUser;