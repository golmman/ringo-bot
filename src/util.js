// Division function which behaves like most other languages when dividing
// integers. E.g. intDiv(-2044, 1000) returns -2.
function intDiv(dividend, divisor) {
    return (dividend / divisor) | 0;
}

module.exports = {
    intDiv,
};
