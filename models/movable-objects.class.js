class MoveableObject extends DrawableObject {
  otherDirection = false;
  speedY;
  energy = 100;
  lastHit = 0;



  applyGravity(groundLevel) {
    setInterval(() => {
      // Die Figur bewegt sich, wenn sie entweder über dem Boden ist oder ein Sprung (speedY > 0) aktiv ist.
      if (this.y < groundLevel || this.speedY > 0) {
        // Berechne die nächste Position: Bei einem Sprung wird y um den positiven speedY-Wert verringert.
        let nextY = this.y - this.speedY;
        // Falls die Berechnung den Boden überschreiten würde, positioniere die Figur exakt auf groundLevel.
        if (nextY > groundLevel) {
          this.y = groundLevel;
          this.speedY = 0;
        } else {
          this.y = nextY;
          // Gravitation: Verringert speedY. So wird beim Sprung die Aufwärtsgeschwindigkeit reduziert und nach Erreichen des Scheitelpunkts (speedY <= 0) beginnt die Fallbewegung.
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
    let timePassed = new Date().getTime() - this.lastHit; // difference since last hit in ms
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
    this.img.src = this.imageCache[path];
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