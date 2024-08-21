const cells = document.querySelectorAll('[data-cell]');
const winnerMessageElement = document.getElementById('winnerMessage');
const restartButton = document.getElementById('restartButton');
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let currentPlayer = 'X';
let board = Array(9).fill(null);
let gameActive = true;

const startGame = () => {
    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick, { once: true });
    });
    setHoverEffect();
    updateWinnerMessage();
};

const handleCellClick = (e) => {
    const cell = e.target;
    const cellIndex = Array.from(cells).indexOf(cell);

    if (gameActive && !board[cellIndex]) {
        board[cellIndex] = currentPlayer;
        cell.textContent = currentPlayer;
        if (checkWin(currentPlayer)) {
            endGame(false);
        } else if (isDraw()) {
            endGame(true);
        } else {
            swapTurns();
            setHoverEffect();
            updateWinnerMessage();
        }
    }
};

const swapTurns = () => {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
};

const setHoverEffect = () => {
    cells.forEach(cell => {
        cell.classList.remove('x', 'o');
        cell.classList.add(currentPlayer.toLowerCase());
    });
};

const updateWinnerMessage = () => {
    winnerMessageElement.textContent = `${currentPlayer}'s Turn`;
};

const checkWin = (player) => {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return board[index] === player;
        });
    });
};

const isDraw = () => {
    return board.every(cell => cell !== null);
};

const endGame = (draw) => {
    gameActive = false;
    if (draw) {
        winnerMessageElement.textContent = `It's a Draw!`;
    } else {
        winnerMessageElement.textContent = `${currentPlayer} Wins!`;
    }
};

const restartGame = () => {
    currentPlayer = 'X';
    board = Array(9).fill(null);
    gameActive = true;
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o');
        cell.removeEventListener('click', handleCellClick);
        cell.addEventListener('click', handleCellClick, { once: true });
    });
    setHoverEffect();
    updateWinnerMessage();
};

restartButton.addEventListener('click', restartGame);

startGame();
