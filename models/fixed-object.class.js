class FixedObject extends DrawableObject {
  fixedObjectId;

  COIN_COUNTER_IMAGE = [
    "img/statusbar/coinCollector/coinCounter_0.png",
    "img/statusbar/coinCollector/coinCounter_1.png",
    "img/statusbar/coinCollector/coinCounter_2.png",
    "img/statusbar/coinCollector/coinCounter_3.png",
    "img/statusbar/coinCollector/coinCounter_4.png",
    "img/statusbar/coinCollector/coinCounter_5.png",
    "img/statusbar/coinCollector/coinCounter_6.png",
    "img/statusbar/coinCollector/coinCounter_7.png",
    "img/statusbar/coinCollector/coinCounter_8.png",
    "img/statusbar/coinCollector/coinCounter_9.png",
    "img/statusbar/coinCollector/coinCounter_10.png",
    "img/statusbar/coinCollector/coinCounter_11.png",
    "img/statusbar/coinCollector/coinCounter_12.png",
    "img/statusbar/coinCollector/coinCounter_13.png",
    "img/statusbar/coinCollector/coinCounter_14.png",
    "img/statusbar/coinCollector/coinCounter_15.png",
    "img/statusbar/coinCollector/coinCounter_16.png",
    "img/statusbar/coinCollector/coinCounter_17.png",
    "img/statusbar/coinCollector/coinCounter_18.png",
    "img/statusbar/coinCollector/coinCounter_19.png",
    "img/statusbar/coinCollector/coinCounter_20.png",
  ];


  constructor(imagePath, clickable, handler, x, y, width, height) {
    super().loadImage(imagePath);
    this.clickable = clickable;
    this.handler = handler;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.fixedObjectId = globalCounterId++;

    document.addEventListener("fullscreenchange", () => {
        if (this.clickable && this.handler === 'window') {
            this.handleWindowIcon();
        }
      });

  }


  increaseCoinCounter(amountOfCoins) {
    this.loadImage(
      `img/statusbar/coinCollector/coinCounter_${amountOfCoins}.png`
    );
  }

  
  setInitialValue(handler) {
    switch (handler) {
      case "window":
        this.handleWindowIcon();
        break;
      case "sound":
        this.handleSoundIcon();
        break;
      case "music":
        this.handleMusicIcon();
        break;
      default:
        break;
    }
  }


  isClicked(mouseX, mouseY) {
    return (
      mouseX >= this.x &&
      mouseX <= this.x + this.width &&
      mouseY >= this.y &&
      mouseY <= this.y + this.height
    );
  }


  handleClick(handler) {
    switch (handler) {
      case "window":
        toggleFullScreen();
        break;
      case "sound":
        toggleSound();
        this.handleSoundIcon();
        break;
      case "music":
        toggleMusic();
        this.handleMusicIcon();
        break;
      default:
        break;
    }
  }


  handleWindowIcon() {
    if (document.fullscreenElement) {
        console.log("Fullscreen enabled");
        this.loadImage("img/game/navigation/minimize.png");
    } else if (!document.fullscreenElement) {
        console.log("Fullscreen disabled");
        this.loadImage("img/game/navigation/maximize.png");
    }
  }


  handleSoundIcon() {
    if (isMuted) {
      this.loadImage("img/game/navigation/sound_off_x.png");
    } else {
      this.loadImage("img/game/navigation/sound_on.png");
    }
  }


  handleMusicIcon() {
    if (musicOff) {
      this.loadImage("img/game/navigation/music_off.png");
    } else {
      this.loadImage("img/game/navigation/music_on.png");
    }
  }
}
