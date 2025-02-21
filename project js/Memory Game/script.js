const container = document.querySelector('.container');
container.style.display = 'none';
const h2 = document.querySelector('.h2');
const startGame = document.getElementById('start-button');
const gameStartSound = document.getElementById('game-start-sound');
const winSound = document.getElementById('win-sound');
const h1 = document.querySelector('.h1');
startGame.addEventListener('click', function (e) {
    container.style.display = 'block';
    startGame.style.display = 'none';
    h1.style.display = 'none';
    h2.style.display = 'none';
    container.style.display = 'flex';
    gameStartSound.play();
});

const fruits = [
    './imgs/apple.jpg', './imgs/apple.jpg',
    './imgs/olive.jpg', './imgs/olive.jpg',
    './imgs/orange.jpg', './imgs/orange.jpg',
    './imgs/strawberry.jpg', './imgs/strawberry.jpg',
    './imgs/grape.jpg', './imgs/grape.jpg',
    './imgs/watermelon.jpg', './imgs/watermelon.jpg',
    './imgs/kiwi.jpg', './imgs/kiwi.jpg',
    './imgs/pear.jpg', './imgs/pear.jpg'
];

let cardElements = [];
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let score = 0;


const gameContainer = document.getElementById('game-container');
const scoreDisplay = document.getElementById('score');
const restartButton = document.getElementById('restart-button');

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}


function createCards() {
    shuffle(fruits);
    fruits.forEach(fruit => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.value = fruit;
        card.style.backgroundImage = `url(./imgs/beackgond card project.jpeg)`;
        card.addEventListener('click', flipCard);
        gameContainer.appendChild(card);
        cardElements.push(card);
        return card;
    });
}
createCards();


function flipCard() {
    if (lockBoard || this === firstCard || this.classList.contains('matched')) return;

    this.classList.add('flipped');
    this.style.backgroundImage = `url(${this.dataset.value})`;

    if (!firstCard) {
        firstCard = this;
        return;
    }
    

    secondCard = this;
    lockBoard = true;

    checkForMatch();
}

function checkForMatch() {
    const isMatch = firstCard.dataset.value === secondCard.dataset.value;

    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');
    score++;
    updateScore();
    resetBoard();
}


function unflipCards() {
    setTimeout(() => {
        if (firstCard) {
            firstCard.classList.remove('flipped');
            firstCard.style.backgroundImage = 'url("./imgs/beackgond card project.jpeg")';
              }
        if (secondCard) {
            secondCard.classList.remove('flipped');
            secondCard.style.backgroundImage = 'url("./imgs/beackgond card project.jpeg")';
        }
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

function updateScore() {
    scoreDisplay.textContent = `ניקוד: ${score}`;
    if (score === 8) {
        winSound.play();
    }
}

function restartGame() {
    cardElements.forEach(card => {
        card.remove();
    });
    cardElements = [];
    score = 0;
    updateScore();
    createCards();
}
restartButton.addEventListener('click', restartGame);

loadScore();
createCards();

