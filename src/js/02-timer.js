import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

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
    // console.log(selectedDates[0]);
    // console.log(new Date());
    // console.log(convertMs(selectedDates[0] - new Date()));

    if (selectedDates[0] < new Date()) {
      alert('Please choose a date in the future');
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
    // let timeZero = dateChoise - Date.now();
    // console.log(timeZero);
    // if (Math.ceil(timeZero) <= 0) {
    //   clearInterval(timerId);

    //   convertMs(0);
    // }

    const { days, hours, minutes, seconds } = convertMs(dateChoise - Date.now());

    const addLeadingZero = value => String(value).padStart(2, '0');

    refs.days.textContent = addLeadingZero(days);
    refs.hours.textContent = addLeadingZero(hours);
    refs.minutes.textContent = addLeadingZero(minutes);
    refs.seconds.textContent = addLeadingZero(seconds);
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
