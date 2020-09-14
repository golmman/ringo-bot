const seedrandom = require('seedrandom');
const Alea = require('alea');
const move = require('../src/move');
const {
    setupBoard,
} = require('../src/board');

const MAX = 10000000;

const board = setupBoard({}, `
    BRBbbb0
    R0Rbbb0
    BRBbbbb
    rrr0000
    rrr0000
    rrr0000
    00r0000
`);

//console.time('move');
//for (let k = 0; k < MAX; k += 1) {
//    move.generateMoves(board);
//}
//console.timeEnd('move');

// https://github.com/davidbau/seedrandom
const al = new Alea(100);
console.time('move');
for (let k = 0; k < MAX; k += 1) {
    al();
}
console.timeEnd('move');

const rng = seedrandom('bla');
console.time('move');
for (let k = 0; k < MAX; k += 1) {
    rng();
}
console.timeEnd('move');

console.time('move');
for (let k = 0; k < MAX; k += 1) {
    Math.random();
}
console.timeEnd('move');
