class Cloud extends MoveableObject {
  height = 400;
  width = 500;
  speed = 0.15;

  constructor(x, y) {
    super().loadImage("img/background/l3_clouds.png");
    this.x = x;
    this.y = y;
    this.animate();
  }

  
  /**
   * This function moves the clouds to the left.
   */
  animate() {
    setInterval(() => {
      this.moveLeft(this.speed);
    }, 1000 / 60);
  }
}
