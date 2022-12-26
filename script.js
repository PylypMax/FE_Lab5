const body = document.querySelector('body');

let isValid = 1;
let errorFields = [];
let answers = [];
const answerDiv = document.createElement('div');
const task1 = document.getElementById('task1');


function onSubmit() {
    clearData();
    checkAndAnalyze('name', 'ПІБ', /^[A-ZА-Я][a-zA-ZА-Яа-я]+ [A-ZА-Я]\.[A-ZА-Я]\.$/);
    checkAndAnalyze('group', 'Група', /^[A-ZА-Я]{2}-\d{2}$/);
    checkAndAnalyze('idCard', 'ID-card', /^[A-Z]{2} №\d{6}$/);
    checkAndAnalyze('birthData', 'Дата народження', /^\d{2}.\d{2}.\d{4}$/, validateDate);
    checkAndAnalyze('email', 'E-mail', /^\w+@\w+\.com$/);

    if (isValid) {
        answers.forEach(answer => answerDiv.appendChild(answer));
        task1.appendChild(answerDiv);
    } else {
        errorFields.forEach(errorField => {
            const field = document.getElementById(errorField);
            field.style.border = '2px red solid';
        });
    }
}

function clearData() {
    while (answerDiv.firstChild) answerDiv.removeChild(answerDiv.firstChild);
    if (task1.querySelector('.answerDiv')) task1.removeChild(answerDiv);
    errorFields.forEach(errorField => {
        const field = document.getElementById(errorField);
        field.style.border = '2px gray solid';
    });
    isValid = 1;
    errorFields = [];
    answers = [];
}

function checkAndAnalyze(type, text, regex, additionalCheck = () => true) {
    const valueFromElement = document.getElementById(type).value;
    if (regex.test(valueFromElement) && additionalCheck(valueFromElement)) {
        const answer = document.createElement('h3');
        answer.innerHTML = `${text}: ` + valueFromElement;
        answers.push(answer);
    } else {
        isValid *= 0;
        errorFields.push(type);
    }
}

function validateDate(value) {
    const arrD = value.split('.');
    arrD[1] -= 1;
    const d = new Date(arrD[2], arrD[1], arrD[0]);
    if (new Date(Date.now()) < d) return false;
    return (d.getFullYear() === Number(arrD[2])) && (d.getDate() === Number(arrD[0]));
}

function onMouseOverRandomBg(element) {
    element.style.background = getRandomColorStyle();
}

function onMouseLeaveClearBg(element) {
    element.style.background = '#FFF';
}

function getRandomInt() {
    return Math.floor(Math.random() * 255);
}

function getRandomColorStyle() {
    return 'rgb(' + getRandomInt() + ',' + getRandomInt() + ',' + getRandomInt() + ')';
}

/*--------------------Task2-----------------------------*/

const VARIANT = 9;

for (let row = 0; row < 6; row++) {
    const rowElement = document.createElement('tr');
    for (let data = 0; data < 6; data++) {
        const index = String(data + 1 + (row * 6));
        const dataElement = document.createElement('td');
        dataElement.innerHTML = index;
        dataElement.id = index;
        rowElement.appendChild(dataElement);
        body.appendChild(rowElement);
    }
}

function onMouseClickCell(element) {
    element.style.background = document.getElementById('color_input').value;
}

function onDoubleClickCell() {
    const startColumn = VARIANT % 6;
    for (let j = startColumn; j <= 6; j += 2) {
        for (let i = 0; i < 6; i++) {
            const currentElement = document.getElementById(String(j + i * 6));
            currentElement.style.background = document.getElementById('color_input').value;
        }
    }
}

const elementByVariant = document.getElementById(String(VARIANT));

elementByVariant.onmouseover = () => {
    onMouseOverRandomBg(elementByVariant);
};

elementByVariant.onmouseup = () => {
    onMouseClickCell(elementByVariant);
};

elementByVariant.ondblclick = () => {
    onDoubleClickCell();
};