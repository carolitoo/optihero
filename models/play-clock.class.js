class PlayClock extends DrawableObject {
  secondsPassed = 0;
  timeIntervalId;
  x = 310;
  y = 20;
  width = 150;
  height = 50;

  constructor() {
    super().loadImage('img/game/playclock/bg_clock_transparent.png');
  }

  startClock() {
    this.timeIntervalId = setInterval(() => {
      this.secondsPassed += 1;
    }, 1000);
  }


  stopClock() {
    clearInterval(this.timeIntervalId);
  }


  resetClock() {
    this.secondsPassed = 0;
  }


  formatClock() {
    let minutes = Math.floor(this.secondsPassed / 60);
    let seconds = this.secondsPassed % 60;
    return `${this.twoDigits(minutes)}:${this.twoDigits(seconds)}`;
  }


  twoDigits(digit) {
    return digit.toString().padStart(2, "0");
  }

}