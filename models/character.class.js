class Character extends MoveableObject {
  x = 0;
  y = 195;
  groundLevelCharacter = 195;
  ratio = 788 / 504;
  height = 240;
  width = this.height * this.ratio;
  speed = 7;
  jumpY = 25;
  acceleration = 2;
  levelStartX = -860;

  endGame = false;
  canThrow = true;
  characterFrozen = false;
  bannerDisplayed = false;
  deathAnimationFrame = 0;

  adjustFrameX = 162;
  adjustFrameY = 102;
  adjustFrameWidth = 6.8;
  adjustFrameHeight = 2.5;
  adjustedWidth = this.width / this.adjustFrameWidth;
  adjustedHeight = this.height / this.adjustFrameHeight;

  CHARACTER_IMAGE_WALK = [
     `img/character/Character${selectedCharacter}/Walk/Character0${selectedCharacter}-Walk_00.png`,
     `img/character/Character${selectedCharacter}/Walk/Character0${selectedCharacter}-Walk_01.png`,
     `img/character/Character${selectedCharacter}/Walk/Character0${selectedCharacter}-Walk_02.png`,
     `img/character/Character${selectedCharacter}/Walk/Character0${selectedCharacter}-Walk_03.png`,
     `img/character/Character${selectedCharacter}/Walk/Character0${selectedCharacter}-Walk_04.png`,
     `img/character/Character${selectedCharacter}/Walk/Character0${selectedCharacter}-Walk_05.png`,
     `img/character/Character${selectedCharacter}/Walk/Character0${selectedCharacter}-Walk_06.png`,
     `img/character/Character${selectedCharacter}/Walk/Character0${selectedCharacter}-Walk_07.png`,
     `img/character/Character${selectedCharacter}/Walk/Character0${selectedCharacter}-Walk_08.png`,
     `img/character/Character${selectedCharacter}/Walk/Character0${selectedCharacter}-Walk_09.png`,
     `img/character/Character${selectedCharacter}/Walk/Character0${selectedCharacter}-Walk_10.png`,
     `img/character/Character${selectedCharacter}/Walk/Character0${selectedCharacter}-Walk_11.png`,
     `img/character/Character${selectedCharacter}/Walk/Character0${selectedCharacter}-Walk_12.png`,
     `img/character/Character${selectedCharacter}/Walk/Character0${selectedCharacter}-Walk_13.png`,
     `img/character/Character${selectedCharacter}/Walk/Character0${selectedCharacter}-Walk_14.png`,
     `img/character/Character${selectedCharacter}/Walk/Character0${selectedCharacter}-Walk_15.png`,
     `img/character/Character${selectedCharacter}/Walk/Character0${selectedCharacter}-Walk_16.png`,
     `img/character/Character${selectedCharacter}/Walk/Character0${selectedCharacter}-Walk_17.png`,
     `img/character/Character${selectedCharacter}/Walk/Character0${selectedCharacter}-Walk_18.png`,
     `img/character/Character${selectedCharacter}/Walk/Character0${selectedCharacter}-Walk_19.png`,
     `img/character/Character${selectedCharacter}/Walk/Character0${selectedCharacter}-Walk_20.png`,
     `img/character/Character${selectedCharacter}/Walk/Character0${selectedCharacter}-Walk_21.png`,
     `img/character/Character${selectedCharacter}/Walk/Character0${selectedCharacter}-Walk_22.png`,
     `img/character/Character${selectedCharacter}/Walk/Character0${selectedCharacter}-Walk_23.png`,
     `img/character/Character${selectedCharacter}/Walk/Character0${selectedCharacter}-Walk_24.png`,
     `img/character/Character${selectedCharacter}/Walk/Character0${selectedCharacter}-Walk_25.png`,
     `img/character/Character${selectedCharacter}/Walk/Character0${selectedCharacter}-Walk_26.png`,
     `img/character/Character${selectedCharacter}/Walk/Character0${selectedCharacter}-Walk_27.png`,
     `img/character/Character${selectedCharacter}/Walk/Character0${selectedCharacter}-Walk_28.png`,
     `img/character/Character${selectedCharacter}/Walk/Character0${selectedCharacter}-Walk_29.png`,
  ];

  CHARACTER_IMAGE_CONFUSED = [
     `img/character/Character${selectedCharacter}/Confused/Character0${selectedCharacter}-Confused_00.png`,
     `img/character/Character${selectedCharacter}/Confused/Character0${selectedCharacter}-Confused_01.png`,
     `img/character/Character${selectedCharacter}/Confused/Character0${selectedCharacter}-Confused_02.png`,
     `img/character/Character${selectedCharacter}/Confused/Character0${selectedCharacter}-Confused_03.png`,
     `img/character/Character${selectedCharacter}/Confused/Character0${selectedCharacter}-Confused_04.png`,
     `img/character/Character${selectedCharacter}/Confused/Character0${selectedCharacter}-Confused_05.png`,
     `img/character/Character${selectedCharacter}/Confused/Character0${selectedCharacter}-Confused_06.png`,
     `img/character/Character${selectedCharacter}/Confused/Character0${selectedCharacter}-Confused_07.png`,
     `img/character/Character${selectedCharacter}/Confused/Character0${selectedCharacter}-Confused_08.png`,
     `img/character/Character${selectedCharacter}/Confused/Character0${selectedCharacter}-Confused_09.png`,
     `img/character/Character${selectedCharacter}/Confused/Character0${selectedCharacter}-Confused_10.png`,
     `img/character/Character${selectedCharacter}/Confused/Character0${selectedCharacter}-Confused_11.png`,
     `img/character/Character${selectedCharacter}/Confused/Character0${selectedCharacter}-Confused_12.png`,
     `img/character/Character${selectedCharacter}/Confused/Character0${selectedCharacter}-Confused_13.png`,
     `img/character/Character${selectedCharacter}/Confused/Character0${selectedCharacter}-Confused_14.png`,
     `img/character/Character${selectedCharacter}/Confused/Character0${selectedCharacter}-Confused_15.png`,
     `img/character/Character${selectedCharacter}/Confused/Character0${selectedCharacter}-Confused_16.png`,
     `img/character/Character${selectedCharacter}/Confused/Character0${selectedCharacter}-Confused_17.png`,
     `img/character/Character${selectedCharacter}/Confused/Character0${selectedCharacter}-Confused_18.png`,
     `img/character/Character${selectedCharacter}/Confused/Character0${selectedCharacter}-Confused_19.png`,
     `img/character/Character${selectedCharacter}/Confused/Character0${selectedCharacter}-Confused_20.png`,
     `img/character/Character${selectedCharacter}/Confused/Character0${selectedCharacter}-Confused_21.png`,
     `img/character/Character${selectedCharacter}/Confused/Character0${selectedCharacter}-Confused_22.png`,
     `img/character/Character${selectedCharacter}/Confused/Character0${selectedCharacter}-Confused_23.png`,
  ];

  CHARACTER_IMAGE_DEAD = [
     `img/character/Character${selectedCharacter}/Dead/Character0${selectedCharacter}-Dead_00.png`,
     `img/character/Character${selectedCharacter}/Dead/Character0${selectedCharacter}-Dead_01.png`,
     `img/character/Character${selectedCharacter}/Dead/Character0${selectedCharacter}-Dead_02.png`,
     `img/character/Character${selectedCharacter}/Dead/Character0${selectedCharacter}-Dead_03.png`,
     `img/character/Character${selectedCharacter}/Dead/Character0${selectedCharacter}-Dead_04.png`,
     `img/character/Character${selectedCharacter}/Dead/Character0${selectedCharacter}-Dead_05.png`,
     `img/character/Character${selectedCharacter}/Dead/Character0${selectedCharacter}-Dead_06.png`,
     `img/character/Character${selectedCharacter}/Dead/Character0${selectedCharacter}-Dead_07.png`,
     `img/character/Character${selectedCharacter}/Dead/Character0${selectedCharacter}-Dead_08.png`,
     `img/character/Character${selectedCharacter}/Dead/Character0${selectedCharacter}-Dead_09.png`,
     `img/character/Character${selectedCharacter}/Dead/Character0${selectedCharacter}-Dead_10.png`,
     `img/character/Character${selectedCharacter}/Dead/Character0${selectedCharacter}-Dead_11.png`,
     `img/character/Character${selectedCharacter}/Dead/Character0${selectedCharacter}-Dead_12.png`,
     `img/character/Character${selectedCharacter}/Dead/Character0${selectedCharacter}-Dead_13.png`,
     `img/character/Character${selectedCharacter}/Dead/Character0${selectedCharacter}-Dead_14.png`,
     `img/character/Character${selectedCharacter}/Dead/Character0${selectedCharacter}-Dead_15.png`,
     `img/character/Character${selectedCharacter}/Dead/Character0${selectedCharacter}-Dead_16.png`,
     `img/character/Character${selectedCharacter}/Dead/Character0${selectedCharacter}-Dead_17.png`,
     `img/character/Character${selectedCharacter}/Dead/Character0${selectedCharacter}-Dead_18.png`,
     `img/character/Character${selectedCharacter}/Dead/Character0${selectedCharacter}-Dead_19.png`,
     `img/character/Character${selectedCharacter}/Dead/Character0${selectedCharacter}-Dead_20.png`,
     `img/character/Character${selectedCharacter}/Dead/Character0${selectedCharacter}-Dead_21.png`,
     `img/character/Character${selectedCharacter}/Dead/Character0${selectedCharacter}-Dead_22.png`,
     `img/character/Character${selectedCharacter}/Dead/Character0${selectedCharacter}-Dead_23.png`,
     `img/character/Character${selectedCharacter}/Dead/Character0${selectedCharacter}-Dead_24.png`,
     `img/character/Character${selectedCharacter}/Dead/Character0${selectedCharacter}-Dead_25.png`,
     `img/character/Character${selectedCharacter}/Dead/Character0${selectedCharacter}-Dead_26.png`,
     `img/character/Character${selectedCharacter}/Dead/Character0${selectedCharacter}-Dead_27.png`,
     `img/character/Character${selectedCharacter}/Dead/Character0${selectedCharacter}-Dead_28.png`,
     `img/character/Character${selectedCharacter}/Dead/Character0${selectedCharacter}-Dead_29.png`,
     `img/character/Character${selectedCharacter}/Dead/Character0${selectedCharacter}-Dead_30.png`,
     `img/character/Character${selectedCharacter}/Dead/Character0${selectedCharacter}-Dead_31.png`,
     `img/character/Character${selectedCharacter}/Dead/Character0${selectedCharacter}-Dead_32.png`,
     `img/character/Character${selectedCharacter}/Dead/Character0${selectedCharacter}-Dead_33.png`,
     `img/character/Character${selectedCharacter}/Dead/Character0${selectedCharacter}-Dead_34.png`,
     `img/character/Character${selectedCharacter}/Dead/Character0${selectedCharacter}-Dead_35.png`,
     `img/character/Character${selectedCharacter}/Dead/Character0${selectedCharacter}-Dead_36.png`,
     `img/character/Character${selectedCharacter}/Dead/Character0${selectedCharacter}-Dead_37.png`,
     `img/character/Character${selectedCharacter}/Dead/Character0${selectedCharacter}-Dead_38.png`,
     `img/character/Character${selectedCharacter}/Dead/Character0${selectedCharacter}-Dead_39.png`,
     `img/character/Character${selectedCharacter}/Dead/Character0${selectedCharacter}-Dead_40.png`,
     `img/character/Character${selectedCharacter}/Dead/Character0${selectedCharacter}-Dead_41.png`,
     `img/character/Character${selectedCharacter}/Dead/Character0${selectedCharacter}-Dead_42.png`,
     `img/character/Character${selectedCharacter}/Dead/Character0${selectedCharacter}-Dead_43.png`,
     `img/character/Character${selectedCharacter}/Dead/Character0${selectedCharacter}-Dead_44.png`,
  ];

  CHARACTER_IMAGE_FLY = [
     `img/character/Character${selectedCharacter}/Fly/Character0${selectedCharacter}-Fly_00.png`,
     `img/character/Character${selectedCharacter}/Fly/Character0${selectedCharacter}-Fly_01.png`,
     `img/character/Character${selectedCharacter}/Fly/Character0${selectedCharacter}-Fly_02.png`,
     `img/character/Character${selectedCharacter}/Fly/Character0${selectedCharacter}-Fly_03.png`,
     `img/character/Character${selectedCharacter}/Fly/Character0${selectedCharacter}-Fly_04.png`,
     `img/character/Character${selectedCharacter}/Fly/Character0${selectedCharacter}-Fly_05.png`,
     `img/character/Character${selectedCharacter}/Fly/Character0${selectedCharacter}-Fly_06.png`,
     `img/character/Character${selectedCharacter}/Fly/Character0${selectedCharacter}-Fly_07.png`,
     `img/character/Character${selectedCharacter}/Fly/Character0${selectedCharacter}-Fly_08.png`,
     `img/character/Character${selectedCharacter}/Fly/Character0${selectedCharacter}-Fly_09.png`,
     `img/character/Character${selectedCharacter}/Fly/Character0${selectedCharacter}-Fly_10.png`,
     `img/character/Character${selectedCharacter}/Fly/Character0${selectedCharacter}-Fly_11.png`,
     `img/character/Character${selectedCharacter}/Fly/Character0${selectedCharacter}-Fly_12.png`,
     `img/character/Character${selectedCharacter}/Fly/Character0${selectedCharacter}-Fly_13.png`,
     `img/character/Character${selectedCharacter}/Fly/Character0${selectedCharacter}-Fly_14.png`,
     `img/character/Character${selectedCharacter}/Fly/Character0${selectedCharacter}-Fly_15.png`,
     `img/character/Character${selectedCharacter}/Fly/Character0${selectedCharacter}-Fly_16.png`,
     `img/character/Character${selectedCharacter}/Fly/Character0${selectedCharacter}-Fly_17.png`,
     `img/character/Character${selectedCharacter}/Fly/Character0${selectedCharacter}-Fly_18.png`,
     `img/character/Character${selectedCharacter}/Fly/Character0${selectedCharacter}-Fly_19.png`,
  ];

  CHARACTER_IMAGE_IDLE = [
     `img/character/Character${selectedCharacter}/Idle/Character0${selectedCharacter}-Idle_00.png`,
     `img/character/Character${selectedCharacter}/Idle/Character0${selectedCharacter}-Idle_01.png`,
     `img/character/Character${selectedCharacter}/Idle/Character0${selectedCharacter}-Idle_02.png`,
     `img/character/Character${selectedCharacter}/Idle/Character0${selectedCharacter}-Idle_03.png`,
     `img/character/Character${selectedCharacter}/Idle/Character0${selectedCharacter}-Idle_04.png`,
     `img/character/Character${selectedCharacter}/Idle/Character0${selectedCharacter}-Idle_05.png`,
     `img/character/Character${selectedCharacter}/Idle/Character0${selectedCharacter}-Idle_06.png`,
     `img/character/Character${selectedCharacter}/Idle/Character0${selectedCharacter}-Idle_07.png`,
     `img/character/Character${selectedCharacter}/Idle/Character0${selectedCharacter}-Idle_08.png`,
     `img/character/Character${selectedCharacter}/Idle/Character0${selectedCharacter}-Idle_09.png`,
     `img/character/Character${selectedCharacter}/Idle/Character0${selectedCharacter}-Idle_10.png`,
     `img/character/Character${selectedCharacter}/Idle/Character0${selectedCharacter}-Idle_11.png`,
     `img/character/Character${selectedCharacter}/Idle/Character0${selectedCharacter}-Idle_12.png`,
     `img/character/Character${selectedCharacter}/Idle/Character0${selectedCharacter}-Idle_13.png`,
     `img/character/Character${selectedCharacter}/Idle/Character0${selectedCharacter}-Idle_14.png`,
     `img/character/Character${selectedCharacter}/Idle/Character0${selectedCharacter}-Idle_15.png`,
     `img/character/Character${selectedCharacter}/Idle/Character0${selectedCharacter}-Idle_16.png`,
     `img/character/Character${selectedCharacter}/Idle/Character0${selectedCharacter}-Idle_17.png`,
     `img/character/Character${selectedCharacter}/Idle/Character0${selectedCharacter}-Idle_18.png`,
     `img/character/Character${selectedCharacter}/Idle/Character0${selectedCharacter}-Idle_19.png`,
  ];

  CHARACTER_IMAGE_THROWING = [
     `img/character/Character${selectedCharacter}/Throwing/Character0${selectedCharacter}-Throwing_00.png`,
     `img/character/Character${selectedCharacter}/Throwing/Character0${selectedCharacter}-Throwing_01.png`,
     `img/character/Character${selectedCharacter}/Throwing/Character0${selectedCharacter}-Throwing_02.png`,
     `img/character/Character${selectedCharacter}/Throwing/Character0${selectedCharacter}-Throwing_03.png`,
     `img/character/Character${selectedCharacter}/Throwing/Character0${selectedCharacter}-Throwing_04.png`,
     `img/character/Character${selectedCharacter}/Throwing/Character0${selectedCharacter}-Throwing_05.png`,
     `img/character/Character${selectedCharacter}/Throwing/Character0${selectedCharacter}-Throwing_06.png`,
     `img/character/Character${selectedCharacter}/Throwing/Character0${selectedCharacter}-Throwing_07.png`,
     `img/character/Character${selectedCharacter}/Throwing/Character0${selectedCharacter}-Throwing_08.png`,
     `img/character/Character${selectedCharacter}/Throwing/Character0${selectedCharacter}-Throwing_09.png`,
     `img/character/Character${selectedCharacter}/Throwing/Character0${selectedCharacter}-Throwing_10.png`,
     `img/character/Character${selectedCharacter}/Throwing/Character0${selectedCharacter}-Throwing_11.png`,
     `img/character/Character${selectedCharacter}/Throwing/Character0${selectedCharacter}-Throwing_12.png`,
     `img/character/Character${selectedCharacter}/Throwing/Character0${selectedCharacter}-Throwing_13.png`,
     `img/character/Character${selectedCharacter}/Throwing/Character0${selectedCharacter}-Throwing_14.png`,
     `img/character/Character${selectedCharacter}/Throwing/Character0${selectedCharacter}-Throwing_15.png`,
     `img/character/Character${selectedCharacter}/Throwing/Character0${selectedCharacter}-Throwing_16.png`,
     `img/character/Character${selectedCharacter}/Throwing/Character0${selectedCharacter}-Throwing_17.png`,
     `img/character/Character${selectedCharacter}/Throwing/Character0${selectedCharacter}-Throwing_18.png`,
     `img/character/Character${selectedCharacter}/Throwing/Character0${selectedCharacter}-Throwing_19.png`,
     `img/character/Character${selectedCharacter}/Throwing/Character0${selectedCharacter}-Throwing_20.png`,
     `img/character/Character${selectedCharacter}/Throwing/Character0${selectedCharacter}-Throwing_21.png`,
     `img/character/Character${selectedCharacter}/Throwing/Character0${selectedCharacter}-Throwing_22.png`,
     `img/character/Character${selectedCharacter}/Throwing/Character0${selectedCharacter}-Throwing_23.png`,
     `img/character/Character${selectedCharacter}/Throwing/Character0${selectedCharacter}-Throwing_24.png`,
     `img/character/Character${selectedCharacter}/Throwing/Character0${selectedCharacter}-Throwing_25.png`,
     `img/character/Character${selectedCharacter}/Throwing/Character0${selectedCharacter}-Throwing_26.png`,
     `img/character/Character${selectedCharacter}/Throwing/Character0${selectedCharacter}-Throwing_27.png`,
     `img/character/Character${selectedCharacter}/Throwing/Character0${selectedCharacter}-Throwing_28.png`,
     `img/character/Character${selectedCharacter}/Throwing/Character0${selectedCharacter}-Throwing_29.png`,
     `img/character/Character${selectedCharacter}/Throwing/Character0${selectedCharacter}-Throwing_30.png`,
     `img/character/Character${selectedCharacter}/Throwing/Character0${selectedCharacter}-Throwing_31.png`,
     `img/character/Character${selectedCharacter}/Throwing/Character0${selectedCharacter}-Throwing_32.png`,
     `img/character/Character${selectedCharacter}/Throwing/Character0${selectedCharacter}-Throwing_33.png`,
     `img/character/Character${selectedCharacter}/Throwing/Character0${selectedCharacter}-Throwing_34.png`,
  ];

  world;

  CHARACTER_SOUND_WALK = new Audio("audio/02_character/walk.mp3");
  CHARACTER_SOUND_THROWING = new Audio("audio/02_character/throw.mp3");
  CHARACTER_SOUND_HURT = new Audio("audio/02_character/hurt.mp3");
  CHARACTER_SOUND_FLY = new Audio("audio/02_character/jump.mp3");

  GAME_SOUND_LOSE = new Audio("audio/01_game/lose/level_failed.mp3");

  constructor() {
    super().loadImage(`img/character/Character${selectedCharacter}/Idle/Character0${selectedCharacter}-Idle_00.png`);
    this.loadImages(this.CHARACTER_IMAGE_WALK);
    this.loadImages(this.CHARACTER_IMAGE_CONFUSED);
    this.loadImages(this.CHARACTER_IMAGE_DEAD);
    this.loadImages(this.CHARACTER_IMAGE_FLY);
    this.loadImages(this.CHARACTER_IMAGE_IDLE);
    this.loadImages(this.CHARACTER_IMAGE_THROWING);

    this.applyGravity(this.groundLevelCharacter);
    this.animate();
  }


  /**
   * This function manages the character.
   * It calls the functions to move and animate the character.
   * It also calls the function to adjusts the camera position based on the character's position. 
   */
  animate() {
    setInterval(() => {
      this.moveCharacter();
      this.adjustCamera();
    }, 1000 / 60);

    setInterval(() => {
      this.animateCharacter();
    }, 1000 / 60);
  }


  /**
   * This function moves the character based on the input of the player (keyboard or touch).
   * It also makes sure that the character is heading in the right direction and does not go out of bounds. 
   * The function ensures that the character only jumps if it is not already above the ground and plays a sound on taking off (only once).
   */
  moveCharacter() {
    if (this.world.keyboard.RIGHT && this.x < this.world.level.levelEndX) {
      this.moveRight(this.speed);
      this.otherDirection = false;
    }
    if (this.world.keyboard.LEFT && this.x > this.levelStartX) {
      this.moveLeft(this.speed);
      this.otherDirection = true;
    }
    if (this.world.keyboard.SPACE && !this.isAboveGround(this.groundLevelCharacter)) {
      this.jump(this.jumpY);
      if (!isMuted) {
        this.CHARACTER_SOUND_FLY.currentTime = 0;
        this.CHARACTER_SOUND_FLY.play();
      }
    }
  }


  /**
   * This function adjusts the camera position based on the character's position.
   * It ensures that the camera follows the character only within certain bounds.
   * It also checks if the camera is frozen (game end) and does not adjust the camera in that case.
   */
  adjustCamera() {
    if (this.x > -750 && this.x < 3565 && !this.world.cameraFrozen) {
      this.world.camera_x = -this.x - 30;
    }
  }


  /**
   * This function blocks the throwing of swirls for 1 second.
   */
  blockThrow() {
    this.canThrow = false;
    setTimeout(() => {
      this.canThrow = true;
    }, 1000);
  }


  /**
   * This function checks the input of the player and state of the character and calls the functions to handle the particular state.
   */
  animateCharacter() {
    this.CHARACTER_SOUND_WALK.pause();
  
    if (this.isDead() && !this.endGame) {
      this.handleDeath();
      return;
    }
    if (this.isHurt()) {
      this.handleHurt();
      return;
    }
    if (this.isAboveGround(this.groundLevelCharacter)) {
      this.handleFly();
      return;
    }
    if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
      this.handleWalk();
      return;
    }
    if (this.world.keyboard.D) {
      this.handleThrow();
      return;
    }
    this.handleIdle();
  }
  

  /**
   * This function handles the death of the character.
   * It sets the characterFrozen property to true to prevent further actions.
   * It calls the function to play the death animation and shows a lose banner after a short delay.
   */
  handleDeath() {
    this.characterFrozen = true;
    this.playAnimationDeadCharacter();
    setTimeout(() => {
      if (!this.bannerDisplayed) {
        showBanner('lose', language);
        this.bannerDisplayed = true;
      }
  }, 800);
  }
  

  /**
   * This function plays the hurt animation and sound (if not muted).
   */
  handleHurt() {
    this.playAnimation(this.CHARACTER_IMAGE_CONFUSED);
    if (!isMuted) {
      this.CHARACTER_SOUND_HURT.play();
    }
  }
  

  /**
   * This function plays the fly animation.
   */
  handleFly() {
    this.playAnimation(this.CHARACTER_IMAGE_FLY);
  }
  

  /**
   * This function plays the walk animation and sound (if not muted).
   */
  handleWalk() {
    this.playAnimation(this.CHARACTER_IMAGE_WALK);
    if (!isMuted) {
      this.CHARACTER_SOUND_WALK.play();
    }
  }
  

  /**
   * This function plays the throwing animation and sound (if not muted and swirls to throw are available).
   */
  handleThrow() {
    this.playAnimation(this.CHARACTER_IMAGE_THROWING);
    if (!isMuted && this.world.swirls >= this.world.valueOfSwirl) {
      this.CHARACTER_SOUND_THROWING.pause();
      this.CHARACTER_SOUND_THROWING.currentTime = 0;
      this.CHARACTER_SOUND_THROWING.play();
    }
  }
  

  /**
   * This function handles the idle state of the character.
   */
  handleIdle() {
    this.playAnimation(this.CHARACTER_IMAGE_IDLE);
  }


  /**
   * This function plays the hurt sound (if not muted) and the animation for the dead character.
   * It plays the dead animation frames one by one and checks if the animation is finished.
   * After finishing the animation, it stops the game, plays the lose sound and shows the end screen with a delay of 4 seconds.
   */
  playAnimationDeadCharacter() {
    if (!isMuted) {
      this.CHARACTER_SOUND_HURT.play();
    }
    if (this.deathAnimationFrame < this.CHARACTER_IMAGE_DEAD.length) {
      this.playAnimation([this.CHARACTER_IMAGE_DEAD[this.deathAnimationFrame]]);
      this.deathAnimationFrame++;
    }
    if (this.deathAnimationFrame >= this.CHARACTER_IMAGE_DEAD.length && !this.isAboveGround()) {
      this.endGame = true;
      stopGame();
      if (!isMuted) {
        this.GAME_SOUND_LOSE.play();
      }
      setTimeout(() => {
        showEndScreen('lose');
    }, 4000);
    }
  }
}