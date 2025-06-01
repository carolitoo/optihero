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

    this.y = y;
    this.x = x;
    this.thrownObjectId = globalCounterId++;

    this.animate();
    this.throwItem();
  }

  
  /**
   * This function plays the animation of the wind effect.
   */
  animate() {
    setInterval(() => {
      this.playAnimation(this.WIND_EFFECT_IMAGE);
    }, 200);
  }


  /**
   * This function throws the throwable object in case the character is not already throwing an object.
   * It sets the last throw time to the current time and starts moving the object in the direction where the character is facing
   * After 2000 milliseconds, it clears the interval that moves the object and removes the thrown object from the world.
   */
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


  /**
   * This function checks if the throwable object is currently being thrown.
   * It does this by checking the time passed since the last throw.
   * 
   * @returns true if the last throw was less than 1000 milliseconds ago, false otherwise.
   */
  isThrowing() {
    let timePassed = Date.now() - this.lastThrow;
    return timePassed < 1000;
  }


  /**
   * This function removes a thrown object from the array of throwable objects in the world.
   * It finds the index of the thrown object by its id and removes it from the array if it exists.
   * 
   * @param {number} thrownObjectId - The id of the thrown object to be removed. 
   */
  removeThrownObject(thrownObjectId) {
    let thrownObjectIndex = this.findIndexOfThrownObject(thrownObjectId);
    if (thrownObjectIndex !== -1) {
      world.thrownObjects.splice(thrownObjectIndex, 1);
    }
  }


  /**
   * This function finds the index of a thrown object in the array of throwable objects.
   * It uses the thrownObjectId to identify the object.
   * 
   * @param {number} thrownObjectId - The id of the thrown object to be found. 
   */
  findIndexOfThrownObject(thrownObjectId) {
    return world.thrownObjects.findIndex(
      (to) => to.thrownObjectId === thrownObjectId
    );
  }
}
