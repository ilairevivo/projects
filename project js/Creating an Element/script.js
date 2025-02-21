let lastElement; // משתנה לשמור על האלמנט האחרון שנוסף

document.getElementById('addElement').addEventListener('click', function () {
    const elementType = document.getElementById('element-select').value;
    const content = document.getElementById('content').value;
    const width = document.getElementById('width').value;
    const height = document.getElementById('height').value;
    const bgColor = document.getElementById('bgColor').value;
    const textColor = document.getElementById('textColor').value;
    const fontSize = document.getElementById('fontSize').value;

    const newElement = document.createElement(elementType);

    if (elementType === 'img') {
        newElement.src = content; // Assuming content is an image URL
    } else {
        newElement.textContent = content;
    }


    newElement.style.display = 'inline-block';
    newElement.style.width = `${width}px`;
    newElement.style.height = `${height}px`;
    newElement.style.backgroundColor = bgColor;
    newElement.style.color = textColor;
    newElement.style.fontSize = `${fontSize}px`;

    


    document.getElementById('ShadowClick').addEventListener('click', function () {
        newElement.style.boxShadow = '0px 0px 10px black';
    })


    document.getElementById('output').appendChild(newElement);
    lastElement = newElement; // שומר את האלמנט האחרון שנוסף
});

document.getElementById('removeElement').addEventListener('click', function () {
    const outputDiv = document.getElementById('output');
    if (lastElement) {
        outputDiv.removeChild(lastElement); // מסיר את האלמנט האחרון
        lastElement = null; // מאפס את משתנה ה-lastElement
    } else {
        alert("אין אלמנט למחוק!"); // אם אין אלמנט למחוק
    }
});