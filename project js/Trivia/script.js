function saveScore(score) {
    let scores = JSON.parse(localStorage.getItem('triviaScores')) || [];
    const newScore = {
        score: score,
    };
    scores.push(newScore);
    localStorage.setItem('triviaScores', JSON.stringify(scores));
    updateScoreHistory();
}
// פונקציה לעדכון תצוגת היסטוריית הניקוד
function updateScoreHistory() {
    const historyElement = document.getElementById('score-history');
    const scores = JSON.parse(localStorage.getItem('triviaScores')) || [];

    historyElement.innerHTML = scores.map((score, index) => `
                <div class="score-item">
                    <div style="display: flex; align-items: center;">
                        <span>${score.score} נקודות</span>
                    </div>
                </div>
            `).join('');
}
function showGameOver() {
    saveScore(score); // שמירת הניקוד
    const container = document.querySelector('.game-container');
    container.innerHTML = `
                <div class="game-over">
                    <h1>המשחק הסתיים!</h1>
                    <p>הניקוד הסופי שלך: ${score}</p>
                    <button class="restart-btn" onclick="restartGame()">שחק שוב</button>
                </div>
            `;
}
const questions = [
    {
        question: "מהי העיר הגדולה ביותר בישראל?",
        options: ["תל אביב", "ירושלים", "חיפה", "באר שבע"],
        correct: 1
    },
    {
        question: "מי כתב את 'הרצל אמר'?",
        options: ["ביאליק", "טשרניחובסקי", "אלתרמן", "פן"],
        correct: 2
    },
    {
        question: "באיזו שנה הוקמה מדינת ישראל?",
        options: ["1947", "1948", "1949", "1950"],
        correct: 1
    },
    {
        question: "מהו ההר הגבוה ביותר בעולם?",
        options: ["קילימנג'רו", "מון בלאן", "אוורסט", "מקינלי"],
        correct: 2
    },
    {
        question: "מי צייר את המונה ליזה?",
        options: ["ואן גוך", "לאונרדו דה וינצ'י", "פיקאסו", "רמברנדט"],
        correct: 1
    },
    {
        question: "כמה שבטים היו בעם ישראל?",
        options: ["10", "11", "12", "13"],
        correct: 2
    },
    {
        question: "מהו האיבר הגדול ביותר בגוף האדם?",
        options: ["העור", "הכבד", "המעיים", "הריאות"],
        correct: 0
    },
    {
        question: "מי המציא את הטלפון?",
        options: ["תומאס אדיסון", "אלכסנדר גרהם בל", "ניקולה טסלה", "מייקל פאראדיי"],
        correct: 3
    },
    {
        question: "מי המציא את המנורה",
        options: ["תומאס אדיסון", "אינשטין", "ניקולה טסלה", "מייקל פאראדיי"],
        correct: 0
    },
    {
        question: "איזו יבשת הכי גדולה",
        options: ["אמריקה הדרומית", "אפריקה", "אסיה", "אירופה"],
        correct: 2
    }
];

let currentQuestion = 0;
let score = 0;

const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const feedbackElement = document.getElementById('feedback');
const scoreElement = document.getElementById('score');
const nextButton = document.getElementById('next-btn');

function showQuestion() {
    const question = questions[currentQuestion];
    questionElement.textContent = question.question;
    optionsElement.innerHTML = '';
    isAnswered = false;
    nextButton.style.display = 'none';
    feedbackElement.textContent = '';
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'option';
        button.textContent = option;
        button.addEventListener('click', () => checkAnswer(index));
        optionsElement.appendChild(button);
    });
}
function checkAnswer(selectedIndex) {
    if (isAnswered) return;

    isAnswered = true;
    const correct = questions[currentQuestion].correct;
    const options = document.querySelectorAll('.option');

    options.forEach((option, index) => {
        option.disabled = true;
        if (index === correct) {
            option.classList.add('correct');
        }
        if (index === selectedIndex && selectedIndex !== correct) {
            option.classList.add('wrong');
        }
    });
    if (selectedIndex === correct) {
        score += 10;
        scoreElement.textContent = score;
        feedbackElement.textContent = 'כל הכבוד! תשובה נכונה!';
    } else {
        feedbackElement.textContent = 'טעות! נסה שוב בשאלה הבאה.';
    }
    if (currentQuestion < questions.length - 1) {
        nextButton.style.display = 'inline-block';
    } else {
        showGameOver();
    }
}

// עדכון פונקציית סיום המשחק
function showGameOver() {
    saveScore(score); // שמירת הניקוד
    const container = document.querySelector('.game-container');
    container.innerHTML = `
                <div class="game-over">
                    <h1>המשחק הסתיים!</h1>
                    <p>הניקוד הסופי שלך: ${score}</p>
                    <button class="restart-btn" onclick="restartGame()">שחק שוב</button>
                </div>
            `;
}

function restartGame() {
    currentQuestion = 0;
    score = 0;
    scoreElement.textContent = score;
    showQuestion();
    const container = document.querySelector('.game-container');
    container.innerHTML = `
                <h1>טריוויה כללית</h1>
                <div class="score-board">ניקוד: <span id="score">0</span></div>
                <div class="question" id="question"></div>
                <div class="options" id="options"></div>
                <div class="feedback" id="feedback"></div>
                <button class="next-btn" id="next-btn" style="display: none;">השאלה הבאה</button>
            `;
    questionElement = document.getElementById('question');
    optionsElement = document.getElementById('options');
    feedbackElement = document.getElementById('feedback');
    scoreElement = document.getElementById('score');
    nextButton = document.getElementById('next-btn');
    showQuestion();
}
nextButton.addEventListener('click', () => {
    currentQuestion++;
    showQuestion();
});
// עדכון פונקציית איתחול המשחק
function initGame() {
    currentQuestion = 0;
    score = 0;
    updateScoreHistory(); // טעינת היסטוריית הניקוד בתחילת המשחק
    showQuestion();
}
// טעינה ראשונית של היסטוריית הניקוד
updateScoreHistory();

// התחלת המשחק
initGame();