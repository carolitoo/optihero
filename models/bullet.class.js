class Bullet extends Enemy {
  ratio = 992 / 925;
  height = 68;
  width = this.height * this.ratio;
  y = 302;

  speedX = 10;

  adjustFrameX = 0;
  adjustFrameY = 0;
  adjustFrameWidth = 1.0;
  adjustFrameHeight = 1.0;

  adjustedWidth = this.width / this.adjustFrameWidth;
  adjustedHeight = this.height / this.adjustFrameHeight;

  constructor(x) {
    super().loadImage("img/enemies/bullet/bullet.png");
    this.x = x - 10;
    this.enemyId = globalCounterId++;
    this.animate();
  }


  /**
   * This function shoots the bullet to the left.
   */
  animate() {
    setInterval(() => {
      this.moveLeft(this.speedX);
    }, 100);
  }
}
