function restartGame(x) {
    console.log(x);
}

window.restartGame = restartGame;

window.onload = () => restartGame('game started');
