class MoveableObject extends DrawableObject {
  otherDirection = false;
  speedY;
  energy = 100;
  lastHit = 0;



  /**
   * This function is used to apply gravity to an object.
   * It checks if the object is above a certain ground level or a jump is active(speedy > 0).
   * It makes sure that the object does not fall below the ground level by calculating the next position before updating the position.
   * In case the next position would be below the ground level, it sets the position to the ground level and resets the speedY.
   * It also applies a gravitational acceleration to the object, which decreases the speedY over time (jumping upwards the object becomes slower,falling downwards becomes faster.)
   * 
   * @param {number} groundLevel - The ground level to check against (y-coordinate). 
   */
  applyGravity(groundLevel) {
    setInterval(() => {
      if (this.y < groundLevel || this.speedY > 0) {
        let nextY = this.y - this.speedY;

        if (nextY > groundLevel) {
          this.y = groundLevel;
          this.speedY = 0;
        } else {
          this.y = nextY;
          this.speedY -= this.acceleration;
        }
      }
    }, 1000 / 25);
  }


  /**
   * This function checks if the object is above a certain ground level.
   * 
   * @param {number} groundLevel - The ground level to check against (y-coordinate). 
   * @returns {boolean} - true, if the object is above the ground level
   */
  isAboveGround(groundLevel) {
    return this.y < groundLevel;
  }


  /**
   * This function is used to decrease the energy of an object after a hit.
   * It checks if the object is not hurt before reducing the energy.
   * If the energy is less than or equal to 0, it sets the energy to 0 - indicating that the object is dead.
   * 
   * @param {number} decreasedEnergy - The amount of energy to be decreased. 
   */
  hit(decreasedEnergy) {
    if (!this.isHurt()) {
      this.energy -= decreasedEnergy;
      this.lastHit = new Date().getTime();
    }
    if (this.energy <= 0) {
      this. energy = 0;
    }
  }


  /**
   * This function checks if an object is hurt.
   * It compares the current time with the last hit time to determine if the object is still in the hurt state.
   * 
   * @returns {boolean} - true, if the object is hurt
   */
  isHurt() {
    let timePassed = new Date().getTime() - this.lastHit; 
    return timePassed < 1000;
  }


  /**
   * This function checks if an object is dead.
   * 
   * @returns {boolean} - true, if the object is dead
   */
  isDead() {
    return this.energy == 0; 
  }


  /**
   * This function checks if two objects are colliding.
   * It uses the coordinates and dimensions of both objects to determine if they overlap.
   * 
   * @param {object} object - The object to check for collision with 
   * @returns {boolean} - true, if the objects are colliding
   */
  isColliding(object) {
    return this.x + this.adjustedWidth + this.adjustFrameX > object.x + object.adjustFrameX &&
    this.x + this.adjustFrameX < object.x + object.adjustedWidth + object.adjustFrameX &&
    this.y + this.adjustedHeight + this.adjustFrameY > object.y + object.adjustFrameY &&
    this.y + this.adjustFrameY < object.y + object.adjustedHeight + object.adjustFrameY;
  }


    /**
     * This function checks if an object is hit from above by another object (certain enemies can be killed by jumping on them).
     * 
     * @param {object} object - The object to check for collision with 
     * @return {boolean} - true, if the object is hit from above
     */
    hitsFromAbove(object) {
      return this.x + this.adjustedWidth + this.adjustFrameX > object.x + object.adjustFrameX &&
      this.x + this.adjustFrameX < object.x + object.adjustedWidth + object.adjustFrameX &&
      this.y + this.adjustedHeight + this.adjustFrameY > object.y + object.adjustFrameY &&
      this.y + this.adjustedHeight + this.adjustFrameY < object.y + object.adjustedHeight*0.65 + object.adjustFrameY;
    }


  /**
   * This function plays an animation by changing the image source of the object.
   * 
   * @param {array} images - An array of image paths used to create an animation effect. 
   */
  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }


  /**
   * This function moves an object to the right.
   * 
   * @param {number} speed - The speed at which the object moves to the right. 
   */
  moveRight(speed) {
    this.x += speed;
  }


  /**
   * This function moves an object to the left.
   * 
   * @param {number} speed - The speed at which the object moves to the left. 
   */
  moveLeft(speed) {
    this.x -= speed;
  }


  /**
   * This function makes an object jump.
   * 
   * @param {number} speedY - The speed at which the object jumps (is gradually deccelerated by the "gravity").
   */
  jump(speedY) {
    this.speedY = speedY;
  }
}