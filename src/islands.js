// This is the list of all the vicinities of a disk which result in illegal
// islands when moved.
//
// There are 2^8 = 256 unique combinations of vicinities. We map each vicinity
// to the boolean value which is the answer to the question "Does removing the
// center disk result in an island?".

const islands = [
`
000
0 0
000
`
];

function generateIslandIndex(vicinityString) {
    return parseInt(vicinityString, 2);
}

function generateIslandBuckets() {

}

const x = islands[0].replace(/\s/g , '');
console.log(generateIslandIndex(x));

module.exports = {
};
