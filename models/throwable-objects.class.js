class ThrowableObject extends MoveableObject {
  ratio = 177 / 172;
  height = 70;
  width = this.height * this.ratio;

  speedX = 12;
  speedY = 4;

  adjustFrameX = 8;
  adjustFrameY = 12;
  adjustFrameWidth = 1.5;
  adjustFrameHeight = 1.8;

  adjustedWidth = this.width / this.adjustFrameWidth;
  adjustedHeight = this.height / this.adjustFrameHeight;

  thrownObjectId;
  lastThrow = 0;

  WIND_EFFECT_IMAGE = [
    "img/collect/swirl/swirl_1.png",
    "img/collect/swirl/swirl_2.png",
    "img/collect/swirl/swirl_3.png",
  ];

  constructor(x, y) {
    super().loadImage("img/collect/swirl/swirl_1.png");
    this.loadImages(this.WIND_EFFECT_IMAGE);

    this.y = y; // abhängig von Position Character
    this.x = x; // abhängig von Position Character

    this.thrownObjectId = globalCounterId++;

    this.animate();
    this.throwItem();
  }


  animate() {
    setInterval(() => {
      this.playAnimation(this.WIND_EFFECT_IMAGE);
    }, 200);
  }


  throwItem() {
    if (!this.isThrowing()) {
      this.lastThrow = Date.now();
      let throwInterval;

      if (!world.character.otherDirection) {
        throwInterval = setInterval(() => {
          this.x += this.speedX;
        }, 100);
      } else {
        throwInterval = setInterval(() => {
          this.otherDirection = true;
          this.x -= this.speedX;
        }, 100);
      }

      setTimeout(() => {
        clearInterval(throwInterval);
        this.removeThrownObject(this.thrownObjectId);
      }, 2000);
    }
  }


  isThrowing() {
    let timePassed = Date.now() - this.lastThrow;
    return timePassed < 1000;
  }


  removeThrownObject(thrownObjectId) {
    let thrownObjectIndex = this.findIndexOfThrownObject(thrownObjectId);
    if (thrownObjectIndex !== -1) {
      world.thrownObjects.splice(thrownObjectIndex, 1);
    }
  }


  findIndexOfThrownObject(thrownObjectId) {
    return world.thrownObjects.findIndex(
      (to) => to.thrownObjectId === thrownObjectId
    );
  }
}
