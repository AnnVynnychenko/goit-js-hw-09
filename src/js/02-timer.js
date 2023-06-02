import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
    startBtnEl: document.querySelector('[data-start]'),
    daysEl: document.querySelector('[data-days]'),
    hoursEl: document.querySelector('[data-hours]'),
    minutesEl: document.querySelector('[data-minutes]'),
    secondsEl: document.querySelector('[data-seconds]'),
}

refs.startBtnEl.disabled = true;
refs.startBtnEl.addEventListener('click', onTimerStart);
let timerDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        timerDate = selectedDates[0].getTime(); 
        if (selectedDates[0] < options.defaultDate) {
          refs.startBtnEl.disabled = true;
          Notify.failure('Please choose a date in the future');
      } else {
          refs.startBtnEl.removeAttribute('disabled');
    }
  },
};

flatpickr('#datetime-picker', options);


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

function addLeadingZero(value) {
    return value.toString().padStart(2, '0');
};

function onTimerStart() {
    setInterval(() => {
        let now = Date.now();        
        let ms = timerDate - now;
        const { days, hours, minutes, seconds } = convertMs(ms);
        refs.daysEl.innerText = addLeadingZero(days);
        refs.hoursEl.innerText = addLeadingZero(hours);
        refs.minutesEl.innerText = addLeadingZero(minutes);
        refs.secondsEl.innerText = addLeadingZero(seconds);
    }, 1000);
             
};
