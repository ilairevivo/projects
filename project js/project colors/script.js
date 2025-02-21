let bgColor = '';
let isDrawing = false;

const btnColor = document.querySelector('#btnColor');
btnColor.addEventListener('input', (e) => {
    bgColor = e.target.value;
});

const containerColors = document.querySelector('.containerColors');

containerColors.addEventListener('mousedown', () => isDrawing = true);
containerColors.addEventListener('mouseup', () => {
    isDrawing = false;
    saveToLocalStorage();
});
containerColors.addEventListener('mouseleave', () => isDrawing = false);

document.querySelector('#blue').addEventListener('click', () => bgColor = 'blue');
document.querySelector('#red').addEventListener('click', () => bgColor = 'red');
document.querySelector('#green').addEventListener('click', () => bgColor = 'green');
document.querySelector('#black').addEventListener('click', () => bgColor = 'black');

// יצירת הריבועים ושמירת המצב
for (let i = 0; i < 100; i++) {
    const div = document.createElement('div');
    div.classList.add('square');
    containerColors.appendChild(div);
    div.style.border = '1px solid black';

    div.addEventListener('mouseover', () => {
        if (isDrawing) {
            div.style.backgroundColor = bgColor;
            saveToLocalStorage();
        }
    });

    div.addEventListener('mousedown', () => {
        div.style.backgroundColor = bgColor;
        saveToLocalStorage();
    });
}

document.querySelector('#btn-delete').addEventListener('click', () => {
    document.querySelectorAll('.square').forEach(square => {
        square.style.backgroundColor = '';
    });
    saveToLocalStorage();
});

// פונקציה לשמירה ב-localStorage
function saveToLocalStorage() {
    const squares = document.querySelectorAll('.square');
    const colors = Array.from(squares).map(square => square.style.backgroundColor);
    localStorage.setItem('drawing', JSON.stringify(colors));
}

// טעינת המצב בעת טעינת העמוד
document.addEventListener('DOMContentLoaded', () => {
    const savedColors = JSON.parse(localStorage.getItem('drawing'));
    if (savedColors) {
        const squares = document.querySelectorAll('.square');
        squares.forEach((square, index) => {
            square.style.backgroundColor = savedColors[index];
        });
    }
});