import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const startBtn = document.querySelector('[data-start]');
const daysTime = document.querySelector('[data-days]');
const hoursTime = document.querySelector('[data-hours]');
const minutesTime = document.querySelector('[data-minutes]');
const secondsTime = document.querySelector('[data-seconds]');
const input = document.querySelector('#datetime-picker');

let timeDifference;
let intervalId;
let timerStarted = false;


const options = {
  defaultDate: null,
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    const userDate = new Date(selectedDates[0]).getTime();
    const startDate = Date.now();

    if (userDate >= startDate) {
      startBtn.disabled = false;
      timeDifference = userDate - startDate;
      updateClockface(convertMs(timeDifference));

      if (timerStarted) {
        resetTimer();
      }
    } else {
      iziToast.error({
        fontSize: 'large',
        close: false,
        position: 'topRight',
        messageColor: 'white',
        timeout: 2000,
        backgroundColor: 'red',
        message: 'Please choose a date in the future'
      });
    }
  }
};

flatpickr('#datetime-picker', options);

startBtn.addEventListener('click', () => {
  if (!timerStarted) {
    const currentDate = Date.now(); // Current time in milliseconds since January 1, 1970
    const selectedDate = new Date(input.value).getTime(); // Selected date by the user in milliseconds since January 1, 1970
    timeDifference = selectedDate - currentDate; // Difference between the selected date and the current time
    if (timeDifference > 0) { // Check to ensure the timer does not count negative time

      startBtn.disabled = true;
      input.disabled = true;
      startTimer();
    } else {
      iziToast.error({
        fontSize: 'large',
        close: false,
        position: 'topRight',
        messageColor: 'white',
        timeout: 2000,
        backgroundColor: 'red',
        message: 'Please choose a date in the future'
      });
    }
  } else {
    location.reload(); // Перезавантаження сторінки, коли таймер активний
  }
});


function resetTimer() {
  clearInterval(intervalId);
  updateClockface({ days: '00', hours: '00', minutes: '00', seconds: '00' });
  timerStarted = false;
}

function startTimer() {
  if (!timerStarted) {
    clearInterval(intervalId);
    intervalId = setInterval(timer, 1000);
    timerStarted = true;
  }
}

function timer() {
  if (timeDifference > 1000) {

    timeDifference -= 1000;
    updateClockface(convertMs(timeDifference));
  } else {
    clearInterval(intervalId);
    input.disabled = false;
    timerStarted = false;
  }
}

function updateClockface({ days, hours, minutes, seconds }) {
  daysTime.textContent = `${days}`;
  hoursTime.textContent = `${hours}`;
  minutesTime.textContent = `${minutes}`;
  secondsTime.textContent = `${seconds}`;
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(time) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(time / day));
  const hours = addLeadingZero(Math.floor((time % day) / hour));
  const minutes = addLeadingZero(Math.floor(((time % day) % hour) / minute));
  const seconds = addLeadingZero(Math.floor((((time % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

