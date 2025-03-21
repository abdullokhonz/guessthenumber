window.addEventListener('beforeunload', (event) => {
    event.preventDefault();
    event.returnValue = '';
});

var ohNo = document.getElementById('oh-no');
var wow = document.getElementById('wow');

var startWindow = document.getElementById('start-window');
var mainWindow = document.getElementById('main-window');

var minNum = document.getElementById('min-num');
var maxNum = document.getElementById('max-num');

var subTitle = document.getElementById('sub-title');
var replyField = document.getElementById('reply-field');
var result = document.getElementById('result');
var clue = document.getElementById('clue');
var attempt = document.getElementById('attempt');
var attemptCounter = 0;

var answer = document.getElementById('answer');

var randomNumber;

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
};

document.getElementById('confirm-button').addEventListener('click', () => {
    if (minNum.value != '' && maxNum.value != '') {
        randomNumber = getRandomIntInclusive(parseInt(minNum.value), parseInt(maxNum.value));
        subTitle.innerHTML = `Компьютер загадал число от ${minNum.value} до ${maxNum.value}.<br>Ваша задача его угадать.`;
        startWindow.style.display = 'none';
        mainWindow.style.display = 'flex';
        console.log(`
            Min: ${minNum.value} ${typeof(minNum.value)};\n
            Max: ${maxNum.value} ${typeof(maxNum.value)};\n
            Random Number: ${randomNumber} ${typeof(randomNumber)};
        `);
        minNum.value = '';
        maxNum.value = '';
    }
});

document.getElementById('reply-button').addEventListener('click', () => {
    if (answer.value != '') {
        attemptCounter++;
        attempt.innerHTML = attemptCounter;
        replyField.innerHTML = answer.value;
        if (answer.value == randomNumber) {
            ohNo.pause() && wow.play() ? ohNo.play() : wow.play();
            subTitle.innerHTML = `Поздравляю! Вы угадали число`;
            result.innerHTML = 'Правильно';
            clue.innerHTML = 'В самый раз';
            document.getElementById('reply-button').style.display = 'none';
            document.getElementById('fields-container').style.display = 'none';
            console.log(true, answer.value);
            answer.value = '';
        } else if (answer.value != randomNumber) {
            ohNo.play() ? !ohNo.play() : ohNo.pause();
            result.innerHTML = 'Неправильно';
            if (answer.value > randomNumber) {
                clue.innerHTML = 'Меньше';
            }
            if (answer.value < randomNumber) {
                clue.innerHTML = 'Больше';
            }
            console.log(false, answer.value);
            answer.value = '';
        }
    }
});

document.getElementById('restart').addEventListener('click', () => {
    window.location.reload();
});
