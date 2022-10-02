class Message{

    constructor(id, title, body) {
        this.id = id;
        this.title = title; // to be used in the email subject
        this.body = body;
    }

}

module.exports = Message;