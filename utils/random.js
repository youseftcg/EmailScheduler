/**
 * Returns a random number between min (inclusive) and max (inclusive)
 */
function generateRandomNumber (max, min=0){
    const randomNumber = Math.random() * (max - min + 1) + min;
    return Math.floor(randomNumber);
}

/**
 * Gets a random item from a set.
 */
function getRandomItemFromSet(set) {
    return getRandomItemFromList(Array.from(set));
}

/**
 * Gets a random item from a list.
 */
function getRandomItemFromList(list) {
    if(list.length === 1){
        // There is only 1 item, return it.
        return list[0];
    }
    // Get the size of the list to determine the max value allowed.
    const max = list.length - 1;
    // Get a random number with `max` as the upper boundary
    const randomNumber = generateRandomNumber(max);
    // Return the item at the random number
    return list[randomNumber];
}


/**
 * Gets a random message id from the `srcMessages` ensuring that it's not in teh `sentMessages`
 *
 * @param srcSet set of all messages
 * @param filterSet set of messages that were sent before
 * @return new random ID or NULL if no all messages were sent before
 */

function getRandomItemFromSetFilterBy(srcSet, filterSet) {
    // Get a random item from srcSet
    let randomItem = getRandomItemFromSet(srcSet);

    // Keep getting a new item until it's a new one (not in the filterSet) or until we have only 1 item left.
    while (filterSet.has(randomItem) && srcSet.size > 1) {
        // Remove the item from the srcSet set to ensure we don't get it again
        srcSet.delete(randomItem);
        // Get another random item from the list
        randomItem = getRandomItemFromSet(srcSet);
    }

    // Check if the remaining item is unique or if we ran out of items and it's just the last one.
    const isNewItem = !filterSet.has(randomItem);

    if (isNewItem) {
        // This is a new item that wasn't sent before
        return randomItem;
    } else {
        // No new items are available
        return null;
    }
}


module.exports.generateRandomNumber = generateRandomNumber;
module.exports.getRandomItemFromList = getRandomItemFromList;
module.exports.getRandomItemFromSet = getRandomItemFromSet;
module.exports.getRandomItemFromSetFilterBy = getRandomItemFromSetFilterBy;