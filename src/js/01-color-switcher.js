const CHANGE_COLOR_DELAY = 1000;
let intervalId = null;

const startButtonEl = document.querySelector('[data-start]');
const stopButtonEl = document.querySelector('[data-stop]');
const bodyEl = document.querySelector('body');

stopButtonEl.disabled = true;

startButtonEl.addEventListener('click', onStartChangeColor);
stopButtonEl.addEventListener('click', onStopChangeColor);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
};

function startBtnDisabled() {
    startButtonEl.disabled = true;
    stopButtonEl.removeAttribute('disabled');
};

function stopBtnDisabled() {
    startButtonEl.removeAttribute('disabled');
    stopButtonEl.disabled = true;
};

function onStartChangeColor() {
     intervalId = setInterval(() => {
        let changeColor = getRandomHexColor();
         bodyEl.style.backgroundColor = changeColor;
         startBtnDisabled();
    }, CHANGE_COLOR_DELAY);
};

function onStopChangeColor() {
    clearInterval(intervalId);
    stopBtnDisabled();
};


    
