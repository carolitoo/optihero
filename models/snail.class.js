class Snail extends Enemy {
  ratio = 548 / 400;
  height = 180;
  width = this.height * this.ratio;
  minSpeed = 0.25;
  energy = 20;

  adjustFrameX = 90;
  adjustFrameY = 70;
  adjustFrameWidth = 4.0;
  adjustFrameHeight = 2.0;
  adjustedWidth = this.width / this.adjustFrameWidth;
  adjustedHeight = this.height / this.adjustFrameHeight;

  SNAIL_IMAGE_WALK = [
    `img/enemies/snail/Walk/Walk_00.png`,
    `img/enemies/snail/Walk/Walk_01.png`,
    `img/enemies/snail/Walk/Walk_02.png`,
    `img/enemies/snail/Walk/Walk_03.png`,
    `img/enemies/snail/Walk/Walk_04.png`,
    `img/enemies/snail/Walk/Walk_05.png`,
    `img/enemies/snail/Walk/Walk_06.png`,
    `img/enemies/snail/Walk/Walk_07.png`,
    `img/enemies/snail/Walk/Walk_08.png`,
    `img/enemies/snail/Walk/Walk_09.png`,
    `img/enemies/snail/Walk/Walk_10.png`,
    `img/enemies/snail/Walk/Walk_11.png`,
    `img/enemies/snail/Walk/Walk_12.png`,
    `img/enemies/snail/Walk/Walk_13.png`,
    `img/enemies/snail/Walk/Walk_14.png`,
    `img/enemies/snail/Walk/Walk_15.png`,
    `img/enemies/snail/Walk/Walk_16.png`,
    `img/enemies/snail/Walk/Walk_17.png`,
    `img/enemies/snail/Walk/Walk_18.png`,
    `img/enemies/snail/Walk/Walk_19.png`,
  ];

  constructor() {
    super().loadImage(`img/enemies/snail/Idle/Idle_00.png`);
    this.loadImages(this.SNAIL_IMAGE_WALK);

    this.y = 235;
    this.x = 400 + Math.random() * this.maxStartX;
    this.speed = this.minSpeed + Math.random() * 0.4;

    this.enemyId = globalCounterId++;
    this.animate();
  }


  /**
   * This function plays the animation of the snail and moves it to the left.
   */
  animate() {
    setInterval(() => {
      this.moveLeft(this.speed);
      this.playAnimation(this.SNAIL_IMAGE_WALK);
    }, 1000 / 25);
  }
}
