const move = require('../src/move');
const move2 = require('../src/move2');
const {
    setupBoard,
} = require('../src/board');

const MAX = 100000;

const board = setupBoard({}, `
    BRBbbb0
    R0Rbbb0
    BRBbbbb
    rrr0000
    rrr0000
    rrr0000
    00r0000
`);

console.time('move');
for (let k = 0; k < MAX; k += 1) {
    move.generateMoves(board);
}
console.timeEnd('move');

console.time('move2');
for (let k = 0; k < MAX; k += 1) {
    move2.generateMoves(board);
}
console.timeEnd('move2');
