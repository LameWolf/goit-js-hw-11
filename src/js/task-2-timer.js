import Swal from 'sweetalert2';
import '../sass/timer.scss';

const inputEl = document.querySelector('#date-selector');
const btnStart = document.querySelector('[data-start-countdown]');
let intervalId = null;

btnStart.addEventListener('click', handleTimerStart);

class Timer {
  constructor({ selector, targetDate }) {
    this.targetDate = targetDate;
    this.selector = selector;

    this.refs = {
      days: document.querySelector(`${this.selector} [data-days]`),
      hours: document.querySelector(`${this.selector} [data-hours]`),
      minutes: document.querySelector(`${this.selector} [data-minutes]`),
      seconds: document.querySelector(`${this.selector} [data-seconds]`),
    };
  }

  start() {
    intervalId = setInterval(() => {
      const deltaMs = this.getMs();
      const { days, hours, minutes, seconds } = convertMs(deltaMs);
      if (deltaMs <= 0) {
        this.stop();
        return;
      }
      this.renderTimerUi({ days, hours, minutes, seconds });
    }, 1000);
  }

  stop() {
    clearInterval(this.intervalId);
  }

  getMs() {
    const targetDate = Date.parse(this.targetDate);
    const currentDate = Date.now();
    return targetDate - currentDate;
  }

  renderTimerUi({ days, hours, minutes, seconds }) {
    this.refs.days.textContent = days;
    this.refs.hours.textContent = pad(hours);
    this.refs.minutes.textContent = pad(minutes);
    this.refs.seconds.textContent = pad(seconds);
  }
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

function pad(value) {
  return String(value).padStart(2, 0);
}

function getTargetDate() {
  return inputEl.value.split('-').join(',');
}

function handleTimerStart() {
  const targetDate = getTargetDate();
  const timer = new Timer({ selector: '#timer', targetDate });
  if (timer.getMs() <= 0) {
    Swal.fire({
      title: 'Error!',
      text: 'Please choose a date in the future!',
      icon: 'error',
      confirmButtonText: 'Continue',
    });
    return;
  }
  timer.start();
}
