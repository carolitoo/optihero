class Bullet extends Enemy {
    ratio = 992 / 925;
    height = 68;
    width = this.height * this.ratio;
    y = 302; // Höhe Shooter
  
    // speedX = 12;
     speedX = 24;
  
    adjustFrameX = 0;
    adjustFrameY = 0;
    adjustFrameWidth = 1.0;
    adjustFrameHeight = 1.0;
  
    adjustedWidth = this.width / this.adjustFrameWidth;
    adjustedHeight = this.height / this.adjustFrameHeight;

  
    constructor(x) {
      super().loadImage("img/enemies/bullet/bullet.png");
      this.x = x - 10; // abhängig von Position Shooter
  
      this.enemyId = globalCounterId++;
  
      this.animate();
    }
  
  
    animate() {
      setInterval(() => {
        this.x -= this.speedX;
      }, 180);
    }


}