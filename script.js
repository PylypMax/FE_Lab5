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

'use strict';
class TableView {
    size = {
        cols: 6,
        rows: 6,
    };
    refs = {
        table: document.querySelector('.table'),
        colorPicker: document.querySelector('.color-picker'),
    };
    variantNumber = 9 % (this.size.rows * this.size.cols);
    preventClick = false;
    timer = null;
    clickEventDelay = 100;
    constructor() {
        this.init();
    }
    generateCells() {
        let counter = 1;
        for (let i = 0; i < this.size.rows; i++) {
            const row = document.createElement('tr');
            for (let j = 0; j < this.size.cols; j++) {
                const col = document.createElement('td');
                col.dataset['id'] = counter;
                col.textContent = counter;
                row.appendChild(col);
                counter++;
            }
            this.refs.table.appendChild(row);
        }
    }
    getRandomColor() {
        const red = this.getRandomNumber(256);
        const green = this.getRandomNumber(256);
        const blue = this.getRandomNumber(256);
        return `rgb(${red},${green},${blue})`;
    }

    getRandomNumber(max) {
        return Math.floor(Math.random() * max);
    }
    handleCellClick(e) {
        e.target.style.backgroundColor = this.refs.colorPicker.value;
    }
    handleDbClick() {
        const cells = this.refs.table.querySelectorAll('td');
        const color = this.getRandomColor();
        cells.forEach((cell) => {
            const cellNumber = Number(cell.dataset['id']);
            if (cellNumber !== this.variantNumber) {
                cell.style.backgroundColor = this.refs.colorPicker.value;
            }
        });
    }
    init() {
        this.generateCells();
        const myCell = this.refs.table.querySelector(
            `td[data-id="${this.variantNumber}"]`
        );
        myCell.addEventListener('dblclick', () => {
            clearTimeout(this.timer);
            this.preventClick = true;
            this.handleDbClick();
        });
        myCell.addEventListener('click', (e) => {
            this.timer = setTimeout(() => {
                if (!this.preventClick) {
                    this.handleCellClick.call(this, e);
                }
                this.preventClick = false;
            }, this.clickEventDelay);
        });
        myCell.addEventListener('mouseover', this.handleCellMouseOver.bind(this));
    }
}
const tableView = new TableView();