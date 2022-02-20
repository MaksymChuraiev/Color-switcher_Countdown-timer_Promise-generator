import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  dataInput: document.querySelector('#datetime-picker'),
  btnStart: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

refs.btnStart.setAttribute('disabled', true);

let dateChoise = null;
let timerId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      Notify.failure('Please choose a date in the future');

      refs.btnStart.setAttribute('disabled', true);

      return;
    }
    refs.btnStart.removeAttribute('disabled');
    refs.btnStart.addEventListener('click', onStartTimer);

    dateChoise = selectedDates[0];
  },
};

flatpickr('#datetime-picker', options);

function onStartTimer() {
  timerId = setInterval(() => {
    let timeDifferance = dateChoise - Date.now();

    if (timeDifferance < 1000) {
      clearInterval(timerId);

      convertMs(0);
    }

    const { days, hours, minutes, seconds } = convertMs(timeDifferance);

    const addLeadingZero = value => String(value).padStart(2, '0');

    refs.days.textContent = addLeadingZero(days);
    refs.hours.textContent = addLeadingZero(hours);
    refs.minutes.textContent = addLeadingZero(minutes);
    refs.seconds.textContent = addLeadingZero(seconds);

    refs.days.classList.add('light');
    refs.hours.classList.add('light');
    refs.minutes.classList.add('light');
    refs.seconds.classList.add('light');

    if (
      refs.days.textContent === '00' &&
      refs.hours.textContent === '00' &&
      refs.minutes.textContent === '00' &&
      refs.seconds.textContent === '00'
    ) {
      refs.days.classList.remove('light');
      refs.hours.classList.remove('light');
      refs.minutes.classList.remove('light');
      refs.seconds.classList.remove('light');
    }
  }, 1000);
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

// if (
//   refs.days.textContent === 00 &&
//   refs.hours.textContent === 00 &&
//   refs.minutes.textContent === 00 &&
//   refs.seconds.textContent === 00
// ) {
//   refs.days.classList.remove('light');
//   refs.hours.classList.remove('light');
//   refs.minutes.classList.remove('light');
//   refs.seconds.classList.remove('light');
// }
