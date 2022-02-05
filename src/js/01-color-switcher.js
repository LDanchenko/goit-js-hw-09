const startButton = document.querySelector('button[data-start]');
const stopButton = document.querySelector('button[data-stop]');
let intervalId = null;

startButton.addEventListener('click', () => {
  startButton.disabled = true;
  stopButton.disabled = false;
  setBodyBackgroundColor();
  intervalId = setInterval(() => {
    setBodyBackgroundColor();
  }, 1000);
});

stopButton.addEventListener('click', () => {
  clearInterval(intervalId);
  startButton.disabled = false;
  stopButton.disabled = true;
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function setBodyBackgroundColor() {
  document.body.style.backgroundColor = getRandomHexColor();
}
