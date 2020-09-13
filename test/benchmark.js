const move = require('../src/move');
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
