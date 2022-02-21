import Timer from './timer';

const refs = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-mins]'),
  seconds: document.querySelector('[data-secs]'),
};

const timer = new Timer({ onTick: updateClockFace });
const countDownDate = new Date('April 04, 2022 00:00:00').getTime();

timer.date = countDownDate;
timer.start();

function updateClockFace({ days, hours, minutes, seconds }) {
  refs.days.textContent = days;
  refs.hours.textContent = hours;
  refs.minutes.textContent = minutes;
  refs.seconds.textContent = seconds;
}
