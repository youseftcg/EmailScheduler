const sgMail = require('@sendgrid/mail')
const emailValidator = require("../utils/email-validator")
const logger = require("../utils/logger")


class EmailService{
    /**
     * Constructor
     *
     * @param sender email to be used when sending emails to users
     */
    constructor(sender) {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        if(emailValidator.validate(sender)){
            this.sender = sender;
        } else {
            throw new Error("Invalid Argument: Email is invalid!")
        }
    }

    /**
     * Sends an email with the passed params
     *
     * @param to, email address of the receiver
     * @param subject of the email
     * @param body, content of the email
     * @return {Boolean} whether the email was sent or not
     */
    async sendEmail(to, subject, body){
        const email = {from: this.sender, to: to, subject: subject, text: body}
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