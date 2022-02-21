export default class Timer {
  constructor({ onTick }) {
    this.onTick = onTick;
    this.countDownDate = 0;
  }

  start() {
    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = this.countDownDate - currentTime;
      const time = this.convertMs(deltaTime);

      this.onTick(time);
    }, 1000);
  }

  convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = this.pad(Math.floor(ms / day));
    const hours = this.pad(Math.floor((ms % day) / hour));
    const minutes = this.pad(Math.floor(((ms % day) % hour) / minute));
    const seconds = this.pad(Math.floor((((ms % day) % hour) % minute) / second));

    return { days, hours, minutes, seconds };
  }

  pad(value) {
    return String(value).padStart(2, '0');
  }

  get date() {
    return this.countDownDate;
  }

  set date(date) {
    this.countDownDate = date;
  }
}
