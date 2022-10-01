const Random = require("../../utils/random")

test('Generating random number between 3 and 7', () => {
    const random = Random.generateRandomNumber(7, 3);
    expect(random).toBeGreaterThanOrEqual(3);
    expect(random).toBeLessThanOrEqual(7);
})


test('Getting random item from list', () => {
    const list = ['hi', 1, 'ok', 4];
    const randomItem = Random.getRandomItemFromList(list);
    expect(list).toContain(randomItem);
})

test('Getting random item from empty list', () => {
    const list = [];
    const randomItem = Random.getRandomItemFromList(list);
    expect(randomItem).toBeFalsy();
})


test('Getting random item from set', () => {
    const set = new Set(["one", "two", "three"]);
    const randomItem = Random.getRandomItemFromSet(set);
    expect(set).toContain(randomItem);
})


test('Getting random item from set1 not in set2', () => {
    const set1 = new Set(["one", "two", "unique"]);
    const set2 = new Set(["one", "two", "four"]);
    const randomItem = Random.getRandomItemFromSetFilterBy(set1, set2);
    expect(randomItem).toBe("unique");
})

test('Identical sets returns no random iem', () => {
    const set1 = new Set(["one", "two", "three"]);
    const set2 = new Set(["one", "two", "three"]);
    const randomItem = Random.getRandomItemFromSetFilterBy(set1, set2);
    expect(randomItem).toBeNull();
})
