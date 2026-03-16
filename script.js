// app script
const timer = document.querySelector('#timer');
const focusTime = 1500;
const restTime = 300;

let timerValue = focusTime;

const modeLabel = document.querySelector('#mode-label');

let modeFlag = Boolean(true); // true -> focusing, false -> resting
let buttonFlag = Boolean(true); // true -> start, false -> pause

const startBtn = document.querySelector('#start-btn');
startBtn.addEventListener('click', () => {timerHandle(focusTime);});

const settingsBtn = document.querySelector('#settings-btn');
settingsBtn.addEventListener('click', () => {setWindow()});

// functions
function playChime() {
  new Audio('./assets/chime.mp3').play();
}

// settings to be implemented in future ?
function setWindow() {
  var box = document.createElement('div');
  var fLabel = document.createTextNode('focus duration:');
  var fInput = document.createElement('input');
  fInput.type = 'number';
  fInput.id = 'focus-input';
  var rLabel = document.createTextNode('rest duration:');
  var rInput = document.createElement('input');
  rInput.type = 'number';
  rInput.id = 'rest-input';
  var btn = document.createElement('button');
  btn.innerHTML = 'save';
  btn.onclick = function() {
    document.body.removeChild(this.parentNode);
  }
  
  box.appendChild(fLabel);
  box.appendChild(fInput);
  box.appendChild(rLabel);
  box.appendChild(rInput);
  box.appendChild(btn);

  box.style.position = 'absolute';
  box.style.width = '200px';
  box.style.height = '100px';

  document.body.appendChild(box);
}

function msgWindow() {
  var box = document.createElement('div');
  var btn = document.createElement('button');
  btn.innerHTML = 'continue';
  btn.onclick = function() {
    document.body.removeChild(this.parentNode);
    if (modeFlag) {
      modeLabel.textContent = 'resting';
      timer.textContent = '05:00';
      timerHandle(restTime);
      modeFlag = false;
    }
    else {
      modeLabel.textContent = 'focusing';
      timer.textContent = '25:00';
      timerHandle(focusTime);
      modeFlag = true;
    }
  };
  var text = document.createTextNode('time is up !');

  box.appendChild(text);
  box.appendChild(btn);

  box.classList.add('popup');
  btn.classList.add('c-btn');

  document.body.appendChild(box);
};

function timerHandle(modeTime) {
  if (buttonFlag) {
    interval = setInterval(() => {
      modeTime--;
      timerProgress(modeTime);

      if(modeTime === 0) {
        playChime();
        buttonFlag = true;
        clearInterval(interval);
        msgWindow();
      }
    }, 1000);
    buttonFlag = false;
    startBtn.classList.add('reset-btn');
  }
  else {
    modeLabel.textContent = 'focusing';
    clearInterval(interval);
    timerProgress(focusTime);
    buttonFlag = true;
    startBtn.classList.replace('reset-btn', 'start-btn');
  }
};

function timerProgress(value) {
  timer.textContent = `${timerFormat(value)}`;
};

function timerFormat(value) {
  const minutes = Math.trunc(value/60).toString().padStart(2, '0');
  const seconds = Math.trunc(value%60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
};