const { expect } = require('chai');
const { isBlueWinAt, isRedWinAt } = require('../src/evaluation');
const util = require('./util');
const { GRID_SIZE } = require('../src/constants');

describe('evaluation', () => {
    it('blue wins south and twice', () => {
        const board = util.setupBoard(`
            bb0rrB
            bbrrrR
            brb000
            bbbbr0
        `);
        util.printBoard(board);

        const blueWin = isBlueWinAt(board, GRID_SIZE * 128 + 128);

        expect(blueWin).to.equal(true);
    });

    it('blue wins east', () => {
        const board = util.setupBoard(`
            bb0rrB
            bbrrrR
            brb000
            bbbbr0
        `);
        util.printBoard(board);

        const blueWin = isBlueWinAt(board, GRID_SIZE * 131 + 130);

        expect(blueWin).to.equal(true);
    });

    it('blue wins south-east', () => {
        const board = util.setupBoard(`
            bb0rrB
            bbrrrR
            brb000
            bbbbr0
        `);
        util.printBoard(board);

        const blueWin = isBlueWinAt(board, GRID_SIZE * 129 + 129);

        expect(blueWin).to.equal(true);
    });
});
