let currentQuestion = 0;//משתנה שמאחסן את מספר השאלות הנוכחי
let score = 0;//משתנה שמאחסן את הניקוד של המשתמש
let totalQuestions = 10;// משתנה קבוע שמאחסן את מספר השאלות הכולל
let operator;//משתנה שיבחר את האופרטור המתאים לפי רמת הקושי
let range;//משתנה שמגדיר את טווח המספרים לפי רמת הקושי
let difficulty;//משתנה שמאחסן את רמת הקושי שנבחרה

const startButton = document.getElementById("start");//משתנה שמאחסן את כפתור ההתחלה
const questionElement = document.getElementById("question");//משתנה שמחיל את השאלה הנוכחית
const answerInput = document.getElementById("answer");//משתנה שמאחסן את התשובה של המשתמש
const submitButton = document.getElementById("submit");//משתנה שמאחסן את כפתור השליחה
const feedbackElement = document.getElementById("feedback");//משתנה שמחיל את התוצאה
const quizElement = document.getElementById("quiz");//משתנה שמחיל את המשחק
const resultElement = document.getElementById("result");
const scoreElement = document.getElementById("score");
const restartButton = document.getElementById("restart");
const difficultySelect = document.getElementById("difficulty");


startButton.addEventListener("click", startGame);
submitButton.addEventListener("click", checkAnswer);
restartButton.addEventListener("click", restartGame);


window.onload = function () {
    const previousScore = localStorage.getItem("lastScore");
    if (previousScore) {
        const history = document.getElementById("history");
        history.innerHTML = `התוצאה הקודמת שלך היא: ${ previousScore }`
    }
};


function startGame() {
    difficulty = difficultySelect.value;
    setDifficulty();
    currentQuestion = 0; score = 0;
    feedbackElement.innerText = "";
    quizElement.classList.remove("hidden");
    resultElement.classList.add("hidden");
    loadQuestion();
}


function setDifficulty() {
    switch (difficulty) {
        case "easy":
            operator = "+";
            range = 10;
            break;
        case "medium":
            operator = "×";
            range = 100;
            break;
        case "hard":
            operator = "/";
            range = 1000;
            break;
    }
}

//
function loadQuestion() {
    if (currentQuestion < totalQuestions) {
        const num1 = getRandomInt(range);
        const num2 = getRandomInt(range);
        questionElement.innerText = ` מה התוצאה של ${num1} ${operator} ${num2}?`;//
        answerInput.value = '';
    } else {
        showResult();
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max) + 1;
} function checkAnswer() {
    const userAnswer = parseFloat(answerInput.value);
    const [num1, num2] = questionElement.innerText.match(/\d+/g).map(Number);
    let correctAnswer;

    switch (operator) {
        case "+":
            correctAnswer = num1 + num2;
            break;
        case "×":
            correctAnswer = num1 * num2;
            break;
        case "/":
            correctAnswer = num1 / num2;
            break;
    }

    if (userAnswer === correctAnswer) {
        score++;
        feedbackElement.innerText = "נכון!";
    } else {
        feedbackElement.innerText = ` לא נכון! התשובה הייתה ${correctAnswer}.`;
    }

    currentQuestion++;
    loadQuestion();
}

function showResult() {
    quizElement.classList.add("hidden");
    resultElement.classList.remove("hidden");
    scoreElement.innerText = ` נכון: ${score} מתוך ${totalQuestions}`;

    localStorage.setItem("lastScore", `${ score } מתוך ${ totalQuestions }`);
} function restartGame() {
    resultElement.classList.add("hidden");
    quizElement.classList.remove("hidden");
    startGame();
}
