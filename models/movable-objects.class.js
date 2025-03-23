class MoveableObject extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 2;

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


  isAboveGround(groundLevel) {
    return this.y < groundLevel;
  }


  hit(decreasedEnergy) {
    if (!this.isHurt()) {
      this.energy -= decreasedEnergy;
      this.lastHit = new Date().getTime();
    }
    if (this.energy <= 0) {
      this. energy = 0;
    }
  }


  isHurt() {
    let timePassed = new Date().getTime() - this.lastHit; // difference since last hit in ms
    return timePassed < 1000;
  }


  isDead() {
    return this.energy == 0; 
  }


  isColliding(object) {
    return this.x + this.adjustedWidth + this.adjustFrameX > object.x + object.adjustFrameX &&
    this.x + this.adjustFrameX < object.x + object.adjustedWidth + object.adjustFrameX &&
    this.y + this.adjustedHeight + this.adjustFrameY > object.y + object.adjustFrameY &&
    this.y + this.adjustFrameY < object.y + object.adjustedHeight + object.adjustFrameY;
  }


    // Funktion prüft, ob Objekt von oben getroffen wird - bei bestimmmten Gegnern soll dies zum Verschwinden des Gegners führen
    isShrinking(object) {
      return this.x + this.adjustedWidth + this.adjustFrameX > object.x + object.adjustFrameX &&
      this.x + this.adjustFrameX < object.x + object.adjustedWidth + object.adjustFrameX &&
      this.y + this.adjustedHeight + this.adjustFrameY > object.y + object.adjustFrameY &&
      this.y + this.adjustedHeight + this.adjustFrameY < object.y + object.adjustedHeight*0.65 + object.adjustFrameY;
    }


  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img.src = this.imageCache[path];
    this.currentImage++;
  }


  moveRight(speed) {
    this.x += speed;
  }


  moveLeft(speed) {
    this.x -= speed;
  }


  jump(speedY) {
    this.speedY = speedY;
  }
}