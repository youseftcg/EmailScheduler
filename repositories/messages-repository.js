/**
 * List of messages stored in a map <ID:Message> for easy lookup
 *
 * @type {Map<number, Message>}
 */
const messages = new Map();

/**
 * Return all messages
 */
function getAllMessagesAsMap() {
    return messages;
}


/**
 * Add message to the map
 * @param message object
 */
function addMessage(message){
    messages.set(message.id, message);
}

/**
 * Function to generate a new ID for the new message to be added
 * @returns {number}
 */
function generateNewId() {
    return messages.size;
}

module.exports.getAllMessagesAsMap = getAllMessagesAsMap;
module.exports.addMessage = addMessage;
module.exports.generateNewId = generateNewId;
