/**
 * Map of users {id:User} where the id is the user email
 */
const users = new Map();

/**
 * Return all users as a map
 */
function getAllUsersAsMap() {
    return users;
}

/**
 * Return all users as an array
 */
function getAllUsersAsArray() {
    return Array.from(users.values());
}

/**
 * Add new users to the list of users. User with the same email can only be added once
 * @param user
 */
function addUser(user) {
    users.set(user.email, user);
}

module.exports.getAllUsersAsMap = getAllUsersAsMap;
module.exports.getAllUsersAsArray = getAllUsersAsArray;
module.exports.addUser = addUser;