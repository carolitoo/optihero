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

  }

  /**
   * This function loads the image of the coin counter.
   * It is used to display the number of coins collected by the player.
   * It takes the number of coins as a parameter and loads the corresponding image.
   * 
   * @param {number} amountOfCoins - The number of coins collected by the player. 
   */
  increaseCoinCounter(amountOfCoins) {
    this.img.src = `${this.COIN_COUNTER_IMAGE[amountOfCoins]}`;
  }

  
  /**
   * This function calls the function to set the initial value of the icon if it is defined as a handler.
   * 
   * @param {string} handler - Type of handler defined for a icon.
   */
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


  /**
   * This function checks if an icon is clicked (based on the mouse coordinates).
   * 
   * @param {number} mouseX - The x coordinate of the mouse. 
   * @param {number} mouseY - The y coordinate of the mouse.
   * @returns {boolean} - Returns true if the icon is clicked, otherwise false.
   */
  isClicked(mouseX, mouseY) {
    return (
      mouseX >= this.x &&
      mouseX <= this.x + this.width &&
      mouseY >= this.y &&
      mouseY <= this.y + this.height
    );
  }


  /**
   * This function handles the click event on an icon.
   * It calls the function to toggle the state of clicked icon (fullscreen mode, sound or music).
   * The function also ensures that the icon is displayed correctly after the click event by calling the respective function.
   * 
   * @param {string} handler - Type of handler defined for a icon. 
   */
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


  /**
   * This function handles the icon for the fullscreen mode.
   */
  handleWindowIcon() {
    if (document.fullscreenElement) {
        this.img.src = "img/game/navigation/minimize.png";
    } else if (!document.fullscreenElement) {
        this.img.src = "img/game/navigation/maximize.png";
    }
  }


  /**
   * This function handles the icon for the sound.
   */
  handleSoundIcon() {
    if (isMuted) {
      this.img.src = "img/game/navigation/sound_off_x.png";
    } else {
      this.img.src = "img/game/navigation/sound_on.png";
    }
  }


  /**
   * This function handles the icon for the music.
   */
  handleMusicIcon() {
    if (musicOff) {
      this.img.src = "img/game/navigation/music_off.png";
    } else {
      this.img.src = "img/game/navigation/music_on.png";
    }
  }
}
