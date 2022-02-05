import flatpickr from 'flatpickr';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'flatpickr/dist/flatpickr.min.css';

const startButton = document.querySelector('button[data-start]');
const dateInput = document.querySelector('#datetime-picker');
const fields = {
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};
let timerId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    checkSelectedDate(selectedDates);
  },
};

flatpickr('#datetime-picker', options);

startButton.addEventListener('click', () => {
  startButton.disabled = true;
  const pickedDate = new Date(dateInput.value);
  timerId = setInterval(() => {
    const result = convertMs(pickedDate - new Date());
    updateTimer(result);
    stopTimer(result);
  }, 1000);
});

function checkSelectedDate(selectedDates) {
  const selectedDate = selectedDates[0];
  const now = new Date();
  if (selectedDate < now) {
    Notify.failure('Please choose a date in the future', {
      position: 'center-top',
    });
    startButton.disabled = true;
    return;
  }
  startButton.disabled = false;
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function updateTimer({ days, hours, minutes, seconds }) {
  fields.days.textContent = addLeadingZero(days);
  fields.hours.textContent = addLeadingZero(hours);
  fields.minutes.textContent = addLeadingZero(minutes);
  fields.seconds.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function stopTimer(result) {
  if (Object.values(result).every(value => value === 0)) {
    clearInterval(timerId);
    startButton.disabled = false;
    dateInput.disabled = false;
  }
}
