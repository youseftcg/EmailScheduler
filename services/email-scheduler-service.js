const Random = require("../utils/random");
const logger = require("../utils/logger")
const EMAIL_SUBJECT = "Your daily email: ";

/**
 * This service is responsible for scheduling sending emails to users every given time. (e.g. sending emails every one minute)
 */
class EmailSchedulerService {
    /**
     * Constructor
     *
     * @param EmailService used to send emails.
     * @param intervalInSeconds time to wait in seconds before sending emails again.
     * @param usersRepository to send the messages to.
     * @param messagesRepository to be used
     */
    constructor(EmailService, intervalInSeconds, usersRepository, messagesRepository) {
        this.intervalInSeconds = intervalInSeconds;
        this.usersRepository = usersRepository;
        this.messagesRepository = messagesRepository;
        this.emailService = EmailService;
    }

    /**
     * Start sending emails to all users every {@link EmailSchedulerService#intervalInSeconds}
     */
    start() {
        logger.info(`Starting Email Scheduler ... \nUsers will get new emails every ${this.intervalInSeconds} seconds`)
        const intervalInMs = this.intervalInSeconds * 1000;
        setInterval(() => this.sendNewEmailToAllUsers(), intervalInMs)
    }


    /**
     * Sends new email to every user. (A user should never receive the same message more than once)
     */
    async sendNewEmailToAllUsers() {
        const users = this.usersRepository.getAllUsersAsArray();
        const messages = this.messagesRepository.getAllMessagesAsMap();

        if(users.length === 0){
            logger.warn("No users to send emails to");
            return;
        }

        if(messages.size === 0){
            logger.warn("No messages to be sent to users");
            return;
        }

        logger.info("================= SENDING EMAILS TO USERS =================")
        for (const user of users) {
            // Check that user didn't receive all these messages already
            if (!this.didUserGetAllMessages(user, messages)) {
                const message = this.getUniqueMessageForUserFromMessagesMap(user, messages);
                const isSent = await this.emailService.sendEmail(user.email,  EMAIL_SUBJECT + message.title, message.body);
                if(isSent){
                    // Add this message to the list of sent messages to user
                    user.addSentMessageId(message.id);
                    console.info(`Success: Message sent to ${user.email}. Title: ${message.title}. Body: ${message.body}`)
                } else {
                    console.log("Error: Message failed to be sent");
                }
            } else {
                logger.trace(`User with email ${user.email} got all emails already`);
            }
        }
    }

    /**
     * Helper method to check if a user received all messages or not.
     *
     * NOTE:
     *  The current way of checking the size of the messages against the size of the messages received by the user
     *  is probably not the best way to check if a user got all messages, since we could remove/replace messages.
     *  So this would work well assuming that we never remove or replace messages.
     *
     *  A better way that could be explored (without having to loop over all messages and user received messages)
     *  is trying to hash the messages IDs or try to produce a single value from all the messages to be able to check
     *  this value/hash of the user against the messages hash/value.
     *
     * @returns {boolean}
     */
    didUserGetAllMessages(user, messages) {
        return user.sentMessagesIDsSet.size >= messages.size;
    }

    /**
     * Gets a unique message for a user (i.e. message not sent before to the user)
     * @param user to get the message
     * @param messages Map {ID: Message}
     * @returns new message object
     */
    getUniqueMessageForUserFromMessagesMap(user, messages) {
        // Store messageIDs in a set
        const messageIDsSet = new Set(messages.keys());
        // Get a new unique messageID not sent before to user
        const newUniqueMessageID = this.getRandomMessageIDNotSentBeforeToUser(messageIDsSet, user.sentMessagesIDsSet);

        if (newUniqueMessageID !== null) {
            return messages.get(newUniqueMessageID);
        } else {
            // This shouldn't happen since we are ensuring in a previous step that a user didn't receive all messages
            logger.warn(`No unique messages available. User with email ${user.email} got all messages already`)
            return null;
        }
    }

    /**
     * Gets a random message ID ensuring that it wasn't sent before the user
     *
     * @param messagesSrc set/pool of messages IDs to get a random message ID from
     * @param messagesSentBefore set of messages that were sent to the user before to avoid getting again
     */
    getRandomMessageIDNotSentBeforeToUser(messagesSrc, messagesSentBefore){
        return Random.getRandomItemFromSetFilterBy(messagesSrc, messagesSentBefore);
    }
}

module.exports = EmailSchedulerService;