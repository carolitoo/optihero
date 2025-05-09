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


  /**
   * This function starts the playclock and updates the secondsPassed every second.
   * The timeIntervalId is stored so that it can be cleared later.
   */
  startClock() {
    this.timeIntervalId = setInterval(() => {
      this.secondsPassed += 1;
    }, 1000);
  }


  /**
   * This function stops the playclock by clearing the interval set in startClock.
   */
  stopClock() {
    clearInterval(this.timeIntervalId);
  }


  /**
   * This function resets the playclock by setting secondsPassed to 0.
   */
  resetClock() {
    this.secondsPassed = 0;
  }


  /**
   * This function formats the time in seconds into a string of the format mm:ss.
   * It uses the twoDigits function to ensure that both minutes and seconds are always two digits long.
   * 
   * @returns {string} - The formatted time string in the format mm:ss
   */
  formatClock() {
    let minutes = Math.floor(this.secondsPassed / 60);
    let seconds = this.secondsPassed % 60;
    return `${twoDigits(minutes)}:${twoDigits(seconds)}`;
  }
  
}