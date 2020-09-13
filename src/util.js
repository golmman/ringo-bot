// Division function which behaves like most other languages when dividing
// integers. E.g. intDiv(-2044, 1000) returns -2.
function intDiv(dividend, divisor) {
    return (dividend / divisor) | 0;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function mergeSets(set1, set2) {
    return new Set(function*() { yield* set1; yield* set2; }());
}

module.exports = {
    getRandomInt,
    intDiv,
    mergeSets,
};
