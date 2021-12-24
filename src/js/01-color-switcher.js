const refs = {
  body: document.querySelector('body'),
  btnStart: document.querySelector('[data-start]'),
  btnStop: document.querySelector('[data-stop]'),
};
let timerColor = null;

refs.btnStop.setAttribute('disabled', true);
refs.btnStart.style.cursor = 'pointer';

refs.btnStart.addEventListener('click', onStartBackgroundColor);
refs.btnStop.addEventListener('click', onStopBackgroundColor);

function onStartBackgroundColor() {
  timerColor = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor();
  }, 1000);

  refs.btnStart.setAttribute('disabled', true);
  refs.btnStop.removeAttribute('disabled');
  refs.btnStop.style.cursor = 'pointer';
  refs.btnStart.style.cursor = 'default';
}

function onStopBackgroundColor() {
  clearInterval(timerColor);

  refs.btnStart.removeAttribute('disabled');
  refs.btnStop.setAttribute('disabled', true);
  refs.btnStart.style.cursor = 'pointer';
  refs.btnStop.style.cursor = 'default';
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
