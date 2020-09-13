const { expect } = require('chai');
const {
    isBlueDisk,
    isBlueRing,
    isRedDisk,
    isRedRing,
    setupBoard,
} = require('../src/board');
const {
    isBlueDiskWinAt,
    isRedDiskWinAt,
    isBlueRingWinAt,
    isRedRingWinAt,
} = require('../src/evaluation');
const { GRID_SIZE } = require('../src/constants');

describe('evaluation', () => {
    it('correctly recognizes all wins', () => {
        const board = setupBoard({}, `
            bb0rrB0R
            bbrrrR0R
            brbb0rBR
            bbbbr0rR
            0b00000r
            b0BBBBBB
        `);

        const wins = setupBoard({}, `
            b00r000R
            bb00r00R
            b00b0r0R
            bbbb00rR
            0b00000r
            b0BBBBBB
        `);

        let blueDiskWins = 0;
        let redDiskWins = 0;
        let blueRingWins = 0;
        let redRingWins = 0;

        for (let k = 0; k < GRID_SIZE * GRID_SIZE; k += 1) {
            const blueDiskWin = isBlueDiskWinAt(board, k);
            const redDiskWin = isRedDiskWinAt(board, k);
            const blueRingWin = isBlueRingWinAt(board, k);
            const redRingWin = isRedRingWinAt(board, k);

            if (isBlueDisk(wins.grid[k])) {
                expect(blueDiskWin).to.equal(true);
                expect(redDiskWin).to.equal(false);
                expect(blueRingWin).to.equal(false);
                expect(redRingWin).to.equal(false);
                blueDiskWins += 1;
            }

            if (isRedDisk(wins.grid[k])) {
                expect(blueDiskWin).to.equal(false);
                expect(redDiskWin).to.equal(true);
                expect(blueRingWin).to.equal(false);
                expect(redRingWin).to.equal(false);
                redDiskWins += 1;
            }

            if (isBlueRing(wins.grid[k])) {
                expect(blueDiskWin).to.equal(false);
                expect(redDiskWin).to.equal(false);
                expect(blueRingWin).to.equal(true);
                expect(redRingWin).to.equal(false);
                blueRingWins += 1;
            }

            if (isRedRing(wins.grid[k])) {
                expect(blueDiskWin).to.equal(false);
                expect(redDiskWin).to.equal(false);
                expect(blueRingWin).to.equal(false);
                expect(redRingWin).to.equal(true);
                redRingWins += 1;
            }
        }

        expect(blueDiskWins).to.equal(11);
        expect(redDiskWins).to.equal(5);
        expect(blueRingWins).to.equal(6);
        expect(redRingWins).to.equal(4);
    });
});
