const { expect } = require('chai');
const {
    isBlueDisk,
    isBlueRing,
    isRedDisk,
    isRedRing,
} = require('../src/board');
const {
    generateMoves,
    generateRandomMove,
    makeMove,
    unmakeMove,
} = require('../src/move');
const util = require('./util');
const { GRID_SIZE } = require('../src/constants');

describe('move.generateMoves', () => {
    it('generates all legal moves for start position', () => {
        const board = util.setupBoard(`
            BRB
            R0R
            BRB
        `);
        const moves = generateMoves(board);
        expect(moves).to.have.lengthOf(92);
    });

    it('generates all legal moves for board with 4 disks', () => {
        const board = util.setupBoard(`
            BRBbb
            RrRb0
            BRBr0
            rrr00
        `);
        const moves = generateMoves(board);
        expect(moves).to.have.lengthOf(42);
    });

    it('generates all legal moves for board with 6 disks', () => {
        const board = util.setupBoard(`
            0rrr0
            bBRBb
            bR0Rb
            bBRBb
            0rrr0
        `);
        const moves = generateMoves(board);
        expect(moves).to.have.lengthOf(8);
    });

    it('generates all legal moves for board with 10 disks', () => {
        const board = util.setupBoard(`
            BRBbbb0
            R0Rbbb0
            BRBbbbb
            rrr0000
            rrr0000
            rrr0000
            00r0000
        `);
        const moves = generateMoves(board);
        expect(moves).to.have.lengthOf(521);
    });
});

describe.only('move.generateRandomMove', () => {
    it('generates all legal moves for board with 10 disks', () => {
        const board = util.setupBoard(`
            BRBbbb0
            R0Rbbb0
            BRBbbbb
            rrr0000
            rrr0000
            rrr0000
            00r0000
        `);
        const moves = generateMoves(board);

        const move = generateRandomMove(board);

        console.log(move);
    });
});
