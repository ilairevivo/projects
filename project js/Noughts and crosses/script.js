const cells = document.querySelectorAll('.cell');// all the cells
const status = document.querySelector('.status');//sttatus of the game
const restartBtn = document.querySelector('.restart');//botton of the game start
let currentPlayer = 'X';//השחקן הנוכחי
let gameBoard = ['', '', '', '', '', '', '', '', ''];// מערך שמציג את מצב הלוח
let gameActive = true;

const winningCombinations = [// מערך שמציג את כל האיפשרויות לניצחון
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // שורות
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // עמודות
    [0, 4, 8], [2, 4, 6] // אלכסונים
];

function handleCellClick(e, index) {
    const cell = e.target;

    if (cell.textContent !== '' || !gameActive) return;

    cell.textContent = currentPlayer;
    gameBoard[index] = currentPlayer;

    if (checkWin()) {
        status.innerHTML = `<span class="winner">שחקן ${currentPlayer} ניצח!</span>`;
        gameActive = false;
        return;
    }

    if (checkDraw()) {
        status.textContent = 'תיקו!';
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    status.textContent = `תור השחקן: ${currentPlayer}`;
}

function checkWin() {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return gameBoard[index] === currentPlayer;
        });
    });
}

function checkDraw() {
    return gameBoard.every(cell => cell !== '');
}



function restartGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    status.textContent = `תור השחקן: ${currentPlayer}`;
    cells.forEach(cell => cell.textContent = '');
}

cells.forEach((cell, index) => {
    cell.addEventListener('click', (e) => handleCellClick(e, index));
    
    
});

restartBtn.addEventListener('click', restartGame);

