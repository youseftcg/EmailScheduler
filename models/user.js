class User{

    constructor(email) {
        this.email = email;
        this.sentMessagesIDsSet = new Set();
    }

    /**
     * Adds the message ID to the list of sent messages.
     * @param id of the message
     */
    addSentMessageId(id){
        this.sentMessagesIDsSet.add(id);
    }
}

module.exports = User;