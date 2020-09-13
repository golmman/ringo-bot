const { generateRandomMove } = require('./move');

function findBestMove(board) {
    return generateRandomMove(board);
}

module.exports = {
    findBestMove,
};
