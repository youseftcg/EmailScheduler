const sgMail = require('@sendgrid/mail')
const emailValidator = require("../utils/email-validator")
const logger = require("../utils/logger")
const InvalidArgumentError = require("../errors/invalid-arguments-error")

/**
 * This the service responsible for sending emails to users.
 */
class EmailService {

    /**
     * Constructor
     *
     * @param senderEmail, email to be used when sending emails to users
     */
    constructor(senderEmail) {
        this.config();
        if (emailValidator.validate(senderEmail)) {
            this.senderEmail = senderEmail;
        } else {
            throw new InvalidArgumentError("Email is invalid!");
        }
    }

    /**
     * Configures the email service.
     */
    config() {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    }

    /**
     * Sends an email with the passed params
     *
     * @param to, email address of the receiver
     * @param subject of the email
     * @param body, content of the email
     * @return {Boolean} whether the email was sent or not
     */
    async sendEmail(to, subject, body) {
        const email = {from: this.senderEmail, to: to, subject: subject, text: body}
        try {
            await sgMail.send(email)
            logger.trace("EmailService: Email sent")
            return true;
        } catch (error) {
            logger.error(`EmailService: Error happened while sending email. Error: ${error}`)
            return false;
        }
    }
}


module.exports = EmailService;