class DrawableObject {
    x = 0;
    y = 0;
    img;
    ratio;
    height = 100;
    width = 250;
    imageCache = {};
    currentImage = 0;

    adjustFrameX;
    adjustFrameY;
    adjustFrameWidth;
    adjustFrameHeight;
    adjustedWidth;
    adjustedHeight;


    /**
     * This function creates a new image object and sets the source of the image.
     * 
     * @param {string} path - The source path of the created image. 
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }
    
    
    /**
     * This function creates new image objects based on an array with image paths and loads them into an image cache.
     * 
     * @param {array} arr - An array of image paths used to create an animation effect.
     */
    loadImages(arr) {
      arr.forEach((path) => {
        let img = new Image();
        img.src = path;
        this.imageCache[path] = img;
      });
    }
    
    
    /**
     * This function draws an image on the canvas.
     * It is used to display the object on the canvas.
     * 
     * @param {object} ctx - The context of the canvas.
     */
    draw(ctx) {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }


    /**
     * This function draws a frame around the object. 
     * It is used for the detection of collisions.
     * 
     * @param {object} ctx - The context of the canvas.
     */
    drawFrame(ctx) {
      if (this instanceof Character || this instanceof Enemy || this instanceof Coin || this instanceof Swirl || this instanceof ThrowableObject) {
        ctx.beginPath();
        ctx.lineWidth = '5';
        ctx.strokeStyle = 'red';
        ctx.strokeStyle = 'transparent';
        ctx.strokeRect(this.x + this.adjustFrameX, this.y + this.adjustFrameY, this.adjustedWidth, this.adjustedHeight);
      }
    }

    /**
     * This function changes the x position and the width of the frame for collision detection.
     * It is used to adjust the frame during attacks of certain enemies.
     * 
     * @param {number} adjustFrameXv - The x position to adjust the frame. 
     * @param {number} adjustFrameWidth - The width of the adjusted frame.
     */
    changeFrameX(adjustFrameX, adjustFrameWidth) {
    this.adjustFrameX = adjustFrameX;
    this.adjustedWidth = this.width / adjustFrameWidth;
  }


    /**
     * This function ensures that the play clock is displayed in the right placa and format.
     * 
     * @param {object} ctx - The context of the canvas. 
     */
    drawClock(ctx) {
      if (this instanceof PlayClock) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        ctx.font = '40px gorditasReg';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';  
        ctx.fillText(this.formatClock(), this.x + 74, this.y + 38);
  
      }
    }
    
}