const { expect } = require('chai');
const {
    mergeSets,
} = require('../src/util');
const {
    setupBoard,
} = require('../src/board');
const {
    generateMoves,
    generateRingDrops,
} = require('../src/move');

describe('move.generateRingDrops', () => {
    it('generates the ring drop set for the starting postion', () => {
        const board = setupBoard({}, `
            BRB
            R0R
            BRB
        `);
        const rings = mergeSets(board.blueRings, board.redRings);
        const ringDrops = generateRingDrops(board, rings);
        expect(ringDrops).to.have.lengthOf(13);
    });

    it('generates the ring drop set for a cramped positon', () => {
        const board = setupBoard({}, `
            0rr0
            bBRbbb
            bRBbrrr
            bBRbrrr
            bRBb
            0rr0
        `);
        const rings = mergeSets(board.blueRings, board.redRings);
        const ringDrops = generateRingDrops(board, rings);
        expect(ringDrops).to.have.lengthOf(12);
    });
});

describe('move.generateMoves', () => {
    it('generates all legal moves for starting position', () => {
        const board = setupBoard({}, `
            BRB
            R0R
            BRB
        `);
        const moves = generateMoves(board);
        expect(moves).to.have.lengthOf(92);
    });

    it('generates all legal moves for board with 4 disks', () => {
        const board = setupBoard({}, `
            BRBbb
            RrRb0
            BRBr0
            rrr00
        `);
        const moves = generateMoves(board);
        expect(moves).to.have.lengthOf(42);
    });

    it('generates all legal moves for board with 6 disks', () => {
        const board = setupBoard({}, `
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
        const board = setupBoard({}, `
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

    it('generates all legal moves for cramped board with 8 disks', () => {
        const board = setupBoard({}, `
            0rr0
            bBRb
            bRBbrr
            bBRbrr
            bRBb
            0rr0
        `);
        const moves = generateMoves(board);
        expect(moves).to.have.lengthOf(0);
    });

    it('generates all legal moves for cramped board with 10 disks', () => {
        const board = setupBoard({}, `
            0rr0
            bBRbbb
            bRBbrrr
            bBRbrrr
            bRBb
            0rr0
        `);
        const moves = generateMoves(board);
        expect(moves).to.have.lengthOf(56);
    });
});

describe('move.generateRandomMove', () => {
    it('generates all legal moves for board with 10 disks', () => {
        const board = setupBoard({}, `
            BRBbbb0
            R0Rbbb0
            BRBbbbb
            rrr0000
            rrr0000
            rrr0000
            00r0000
        `);
        // const moves = generateMoves(board);

        //const move = generateRandomMove(board);

        //console.log(move);
    });
});
