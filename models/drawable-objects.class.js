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

    
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }
    
    
    loadImages(arr) {
      arr.forEach((path) => {
        let img = new Image();
        img.src = path;
        this.imageCache[path] = path;
      });
    }
    
    
    draw(ctx) {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }


    drawFrame(ctx) {
      if (this instanceof Character || this instanceof Enemy || this instanceof Coin || this instanceof Swirl || this instanceof ThrowableObject) {
        ctx.beginPath();
        ctx.lineWidth = '5';
        ctx.strokeStyle = 'red';
        // ctx.strokeStyle = 'transparent';
        ctx.strokeRect(this.x + this.adjustFrameX, this.y + this.adjustFrameY, this.adjustedWidth, this.adjustedHeight);
      }
    }


    drawClock(ctx) {
      if (this instanceof PlayClock) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        ctx.font = '40px gorditasReg';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';  
        ctx.fillText(this.formatClock(), this.x + 74, this.y + 38);
  
      }
    }


    // drawHitEffect(ctx) {
    //   if (this instanceof Boss && this.isHurt()) {
    //     ctx.globalAlpha = 0.5;  // Halbtransparent
    //     ctx.fillStyle = "white"; // Blitzeffekt in Weiß
    //     ctx.fillRect(this.x + this.adjustFrameX, this.y + this.adjustFrameY, this.adjustedWidth, this.adjustedHeight);
    //     ctx.globalAlpha = 1.0;   // Alpha-Wert zurücksetzen
    //   }
    // }
    
}