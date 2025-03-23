class Character extends MoveableObject {
  x = 0;
  y = 195;
  groundLevelCharacter = 195;
  ratio = 788 / 504;
  height = 240;
  width = this.height * this.ratio;
  speed = 5;
  jumpY = 25;
  selectedCharacter = 12;

  endGame = false;
  bannerDisplayed = false;
  deathAnimationFrame = 0;

  adjustFrameX = 162;
  adjustFrameY = 102;
  adjustFrameWidth = 6.8;
  adjustFrameHeight = 2.5;
  adjustedWidth = this.width / this.adjustFrameWidth;
  adjustedHeight = this.height / this.adjustFrameHeight;

  CHARACTER_IMAGE_WALK = [
    `img/character/Character${this.selectedCharacter}/Walk/Character0${this.selectedCharacter}-Walk_00.png`,
    `img/character/Character${this.selectedCharacter}/Walk/Character0${this.selectedCharacter}-Walk_01.png`,
    `img/character/Character${this.selectedCharacter}/Walk/Character0${this.selectedCharacter}-Walk_02.png`,
    `img/character/Character${this.selectedCharacter}/Walk/Character0${this.selectedCharacter}-Walk_03.png`,
    `img/character/Character${this.selectedCharacter}/Walk/Character0${this.selectedCharacter}-Walk_04.png`,
    `img/character/Character${this.selectedCharacter}/Walk/Character0${this.selectedCharacter}-Walk_05.png`,
    `img/character/Character${this.selectedCharacter}/Walk/Character0${this.selectedCharacter}-Walk_06.png`,
    `img/character/Character${this.selectedCharacter}/Walk/Character0${this.selectedCharacter}-Walk_07.png`,
    `img/character/Character${this.selectedCharacter}/Walk/Character0${this.selectedCharacter}-Walk_08.png`,
    `img/character/Character${this.selectedCharacter}/Walk/Character0${this.selectedCharacter}-Walk_09.png`,
    `img/character/Character${this.selectedCharacter}/Walk/Character0${this.selectedCharacter}-Walk_10.png`,
    `img/character/Character${this.selectedCharacter}/Walk/Character0${this.selectedCharacter}-Walk_11.png`,
    `img/character/Character${this.selectedCharacter}/Walk/Character0${this.selectedCharacter}-Walk_12.png`,
    `img/character/Character${this.selectedCharacter}/Walk/Character0${this.selectedCharacter}-Walk_13.png`,
    `img/character/Character${this.selectedCharacter}/Walk/Character0${this.selectedCharacter}-Walk_14.png`,
    `img/character/Character${this.selectedCharacter}/Walk/Character0${this.selectedCharacter}-Walk_15.png`,
    `img/character/Character${this.selectedCharacter}/Walk/Character0${this.selectedCharacter}-Walk_16.png`,
    `img/character/Character${this.selectedCharacter}/Walk/Character0${this.selectedCharacter}-Walk_17.png`,
    `img/character/Character${this.selectedCharacter}/Walk/Character0${this.selectedCharacter}-Walk_18.png`,
    `img/character/Character${this.selectedCharacter}/Walk/Character0${this.selectedCharacter}-Walk_19.png`,
    `img/character/Character${this.selectedCharacter}/Walk/Character0${this.selectedCharacter}-Walk_20.png`,
    `img/character/Character${this.selectedCharacter}/Walk/Character0${this.selectedCharacter}-Walk_21.png`,
    `img/character/Character${this.selectedCharacter}/Walk/Character0${this.selectedCharacter}-Walk_22.png`,
    `img/character/Character${this.selectedCharacter}/Walk/Character0${this.selectedCharacter}-Walk_23.png`,
    `img/character/Character${this.selectedCharacter}/Walk/Character0${this.selectedCharacter}-Walk_24.png`,
    `img/character/Character${this.selectedCharacter}/Walk/Character0${this.selectedCharacter}-Walk_25.png`,
    `img/character/Character${this.selectedCharacter}/Walk/Character0${this.selectedCharacter}-Walk_26.png`,
    `img/character/Character${this.selectedCharacter}/Walk/Character0${this.selectedCharacter}-Walk_27.png`,
    `img/character/Character${this.selectedCharacter}/Walk/Character0${this.selectedCharacter}-Walk_28.png`,
    `img/character/Character${this.selectedCharacter}/Walk/Character0${this.selectedCharacter}-Walk_29.png`,
  ];

  CHARACTER_IMAGE_CONFUSED = [
    `img/character/Character${this.selectedCharacter}/Confused/Character0${this.selectedCharacter}-Confused_00.png`,
    `img/character/Character${this.selectedCharacter}/Confused/Character0${this.selectedCharacter}-Confused_01.png`,
    `img/character/Character${this.selectedCharacter}/Confused/Character0${this.selectedCharacter}-Confused_02.png`,
    `img/character/Character${this.selectedCharacter}/Confused/Character0${this.selectedCharacter}-Confused_03.png`,
    `img/character/Character${this.selectedCharacter}/Confused/Character0${this.selectedCharacter}-Confused_04.png`,
    `img/character/Character${this.selectedCharacter}/Confused/Character0${this.selectedCharacter}-Confused_05.png`,
    `img/character/Character${this.selectedCharacter}/Confused/Character0${this.selectedCharacter}-Confused_06.png`,
    `img/character/Character${this.selectedCharacter}/Confused/Character0${this.selectedCharacter}-Confused_07.png`,
    `img/character/Character${this.selectedCharacter}/Confused/Character0${this.selectedCharacter}-Confused_08.png`,
    `img/character/Character${this.selectedCharacter}/Confused/Character0${this.selectedCharacter}-Confused_09.png`,
    `img/character/Character${this.selectedCharacter}/Confused/Character0${this.selectedCharacter}-Confused_10.png`,
    `img/character/Character${this.selectedCharacter}/Confused/Character0${this.selectedCharacter}-Confused_11.png`,
    `img/character/Character${this.selectedCharacter}/Confused/Character0${this.selectedCharacter}-Confused_12.png`,
    `img/character/Character${this.selectedCharacter}/Confused/Character0${this.selectedCharacter}-Confused_13.png`,
    `img/character/Character${this.selectedCharacter}/Confused/Character0${this.selectedCharacter}-Confused_14.png`,
    `img/character/Character${this.selectedCharacter}/Confused/Character0${this.selectedCharacter}-Confused_15.png`,
    `img/character/Character${this.selectedCharacter}/Confused/Character0${this.selectedCharacter}-Confused_16.png`,
    `img/character/Character${this.selectedCharacter}/Confused/Character0${this.selectedCharacter}-Confused_17.png`,
    `img/character/Character${this.selectedCharacter}/Confused/Character0${this.selectedCharacter}-Confused_18.png`,
    `img/character/Character${this.selectedCharacter}/Confused/Character0${this.selectedCharacter}-Confused_19.png`,
    `img/character/Character${this.selectedCharacter}/Confused/Character0${this.selectedCharacter}-Confused_20.png`,
    `img/character/Character${this.selectedCharacter}/Confused/Character0${this.selectedCharacter}-Confused_21.png`,
    `img/character/Character${this.selectedCharacter}/Confused/Character0${this.selectedCharacter}-Confused_22.png`,
    `img/character/Character${this.selectedCharacter}/Confused/Character0${this.selectedCharacter}-Confused_23.png`,
  ];

  CHARACTER_IMAGE_DEAD = [
    `img/character/Character${this.selectedCharacter}/Dead/Character0${this.selectedCharacter}-Dead_00.png`,
    `img/character/Character${this.selectedCharacter}/Dead/Character0${this.selectedCharacter}-Dead_01.png`,
    `img/character/Character${this.selectedCharacter}/Dead/Character0${this.selectedCharacter}-Dead_02.png`,
    `img/character/Character${this.selectedCharacter}/Dead/Character0${this.selectedCharacter}-Dead_03.png`,
    `img/character/Character${this.selectedCharacter}/Dead/Character0${this.selectedCharacter}-Dead_04.png`,
    `img/character/Character${this.selectedCharacter}/Dead/Character0${this.selectedCharacter}-Dead_05.png`,
    `img/character/Character${this.selectedCharacter}/Dead/Character0${this.selectedCharacter}-Dead_06.png`,
    `img/character/Character${this.selectedCharacter}/Dead/Character0${this.selectedCharacter}-Dead_07.png`,
    `img/character/Character${this.selectedCharacter}/Dead/Character0${this.selectedCharacter}-Dead_08.png`,
    `img/character/Character${this.selectedCharacter}/Dead/Character0${this.selectedCharacter}-Dead_09.png`,
    `img/character/Character${this.selectedCharacter}/Dead/Character0${this.selectedCharacter}-Dead_10.png`,
    `img/character/Character${this.selectedCharacter}/Dead/Character0${this.selectedCharacter}-Dead_11.png`,
    `img/character/Character${this.selectedCharacter}/Dead/Character0${this.selectedCharacter}-Dead_12.png`,
    `img/character/Character${this.selectedCharacter}/Dead/Character0${this.selectedCharacter}-Dead_13.png`,
    `img/character/Character${this.selectedCharacter}/Dead/Character0${this.selectedCharacter}-Dead_14.png`,
    `img/character/Character${this.selectedCharacter}/Dead/Character0${this.selectedCharacter}-Dead_15.png`,
    `img/character/Character${this.selectedCharacter}/Dead/Character0${this.selectedCharacter}-Dead_16.png`,
    `img/character/Character${this.selectedCharacter}/Dead/Character0${this.selectedCharacter}-Dead_17.png`,
    `img/character/Character${this.selectedCharacter}/Dead/Character0${this.selectedCharacter}-Dead_18.png`,
    `img/character/Character${this.selectedCharacter}/Dead/Character0${this.selectedCharacter}-Dead_19.png`,
    `img/character/Character${this.selectedCharacter}/Dead/Character0${this.selectedCharacter}-Dead_20.png`,
    `img/character/Character${this.selectedCharacter}/Dead/Character0${this.selectedCharacter}-Dead_21.png`,
    `img/character/Character${this.selectedCharacter}/Dead/Character0${this.selectedCharacter}-Dead_22.png`,
    `img/character/Character${this.selectedCharacter}/Dead/Character0${this.selectedCharacter}-Dead_23.png`,
    `img/character/Character${this.selectedCharacter}/Dead/Character0${this.selectedCharacter}-Dead_24.png`,
    `img/character/Character${this.selectedCharacter}/Dead/Character0${this.selectedCharacter}-Dead_25.png`,
    `img/character/Character${this.selectedCharacter}/Dead/Character0${this.selectedCharacter}-Dead_26.png`,
    `img/character/Character${this.selectedCharacter}/Dead/Character0${this.selectedCharacter}-Dead_27.png`,
    `img/character/Character${this.selectedCharacter}/Dead/Character0${this.selectedCharacter}-Dead_28.png`,
    `img/character/Character${this.selectedCharacter}/Dead/Character0${this.selectedCharacter}-Dead_29.png`,
    `img/character/Character${this.selectedCharacter}/Dead/Character0${this.selectedCharacter}-Dead_30.png`,
    `img/character/Character${this.selectedCharacter}/Dead/Character0${this.selectedCharacter}-Dead_31.png`,
    `img/character/Character${this.selectedCharacter}/Dead/Character0${this.selectedCharacter}-Dead_32.png`,
    `img/character/Character${this.selectedCharacter}/Dead/Character0${this.selectedCharacter}-Dead_33.png`,
    `img/character/Character${this.selectedCharacter}/Dead/Character0${this.selectedCharacter}-Dead_34.png`,
    `img/character/Character${this.selectedCharacter}/Dead/Character0${this.selectedCharacter}-Dead_35.png`,
    `img/character/Character${this.selectedCharacter}/Dead/Character0${this.selectedCharacter}-Dead_36.png`,
    `img/character/Character${this.selectedCharacter}/Dead/Character0${this.selectedCharacter}-Dead_37.png`,
    `img/character/Character${this.selectedCharacter}/Dead/Character0${this.selectedCharacter}-Dead_38.png`,
    `img/character/Character${this.selectedCharacter}/Dead/Character0${this.selectedCharacter}-Dead_39.png`,
    `img/character/Character${this.selectedCharacter}/Dead/Character0${this.selectedCharacter}-Dead_40.png`,
    `img/character/Character${this.selectedCharacter}/Dead/Character0${this.selectedCharacter}-Dead_41.png`,
    `img/character/Character${this.selectedCharacter}/Dead/Character0${this.selectedCharacter}-Dead_42.png`,
    `img/character/Character${this.selectedCharacter}/Dead/Character0${this.selectedCharacter}-Dead_43.png`,
    `img/character/Character${this.selectedCharacter}/Dead/Character0${this.selectedCharacter}-Dead_44.png`,
  ];

  CHARACTER_IMAGE_FLY = [
    `img/character/Character${this.selectedCharacter}/Fly/Character0${this.selectedCharacter}-Fly_00.png`,
    `img/character/Character${this.selectedCharacter}/Fly/Character0${this.selectedCharacter}-Fly_01.png`,
    `img/character/Character${this.selectedCharacter}/Fly/Character0${this.selectedCharacter}-Fly_02.png`,
    `img/character/Character${this.selectedCharacter}/Fly/Character0${this.selectedCharacter}-Fly_03.png`,
    `img/character/Character${this.selectedCharacter}/Fly/Character0${this.selectedCharacter}-Fly_04.png`,
    `img/character/Character${this.selectedCharacter}/Fly/Character0${this.selectedCharacter}-Fly_05.png`,
    `img/character/Character${this.selectedCharacter}/Fly/Character0${this.selectedCharacter}-Fly_06.png`,
    `img/character/Character${this.selectedCharacter}/Fly/Character0${this.selectedCharacter}-Fly_07.png`,
    `img/character/Character${this.selectedCharacter}/Fly/Character0${this.selectedCharacter}-Fly_08.png`,
    `img/character/Character${this.selectedCharacter}/Fly/Character0${this.selectedCharacter}-Fly_09.png`,
    `img/character/Character${this.selectedCharacter}/Fly/Character0${this.selectedCharacter}-Fly_10.png`,
    `img/character/Character${this.selectedCharacter}/Fly/Character0${this.selectedCharacter}-Fly_11.png`,
    `img/character/Character${this.selectedCharacter}/Fly/Character0${this.selectedCharacter}-Fly_12.png`,
    `img/character/Character${this.selectedCharacter}/Fly/Character0${this.selectedCharacter}-Fly_13.png`,
    `img/character/Character${this.selectedCharacter}/Fly/Character0${this.selectedCharacter}-Fly_14.png`,
    `img/character/Character${this.selectedCharacter}/Fly/Character0${this.selectedCharacter}-Fly_15.png`,
    `img/character/Character${this.selectedCharacter}/Fly/Character0${this.selectedCharacter}-Fly_16.png`,
    `img/character/Character${this.selectedCharacter}/Fly/Character0${this.selectedCharacter}-Fly_17.png`,
    `img/character/Character${this.selectedCharacter}/Fly/Character0${this.selectedCharacter}-Fly_18.png`,
    `img/character/Character${this.selectedCharacter}/Fly/Character0${this.selectedCharacter}-Fly_19.png`,
  ];

  CHARACTER_IMAGE_IDLE = [
    `img/character/Character${this.selectedCharacter}/Idle/Character0${this.selectedCharacter}-Idle_00.png`,
    `img/character/Character${this.selectedCharacter}/Idle/Character0${this.selectedCharacter}-Idle_01.png`,
    `img/character/Character${this.selectedCharacter}/Idle/Character0${this.selectedCharacter}-Idle_02.png`,
    `img/character/Character${this.selectedCharacter}/Idle/Character0${this.selectedCharacter}-Idle_03.png`,
    `img/character/Character${this.selectedCharacter}/Idle/Character0${this.selectedCharacter}-Idle_04.png`,
    `img/character/Character${this.selectedCharacter}/Idle/Character0${this.selectedCharacter}-Idle_05.png`,
    `img/character/Character${this.selectedCharacter}/Idle/Character0${this.selectedCharacter}-Idle_06.png`,
    `img/character/Character${this.selectedCharacter}/Idle/Character0${this.selectedCharacter}-Idle_07.png`,
    `img/character/Character${this.selectedCharacter}/Idle/Character0${this.selectedCharacter}-Idle_08.png`,
    `img/character/Character${this.selectedCharacter}/Idle/Character0${this.selectedCharacter}-Idle_09.png`,
    `img/character/Character${this.selectedCharacter}/Idle/Character0${this.selectedCharacter}-Idle_10.png`,
    `img/character/Character${this.selectedCharacter}/Idle/Character0${this.selectedCharacter}-Idle_11.png`,
    `img/character/Character${this.selectedCharacter}/Idle/Character0${this.selectedCharacter}-Idle_12.png`,
    `img/character/Character${this.selectedCharacter}/Idle/Character0${this.selectedCharacter}-Idle_13.png`,
    `img/character/Character${this.selectedCharacter}/Idle/Character0${this.selectedCharacter}-Idle_14.png`,
    `img/character/Character${this.selectedCharacter}/Idle/Character0${this.selectedCharacter}-Idle_15.png`,
    `img/character/Character${this.selectedCharacter}/Idle/Character0${this.selectedCharacter}-Idle_16.png`,
    `img/character/Character${this.selectedCharacter}/Idle/Character0${this.selectedCharacter}-Idle_17.png`,
    `img/character/Character${this.selectedCharacter}/Idle/Character0${this.selectedCharacter}-Idle_18.png`,
    `img/character/Character${this.selectedCharacter}/Idle/Character0${this.selectedCharacter}-Idle_19.png`,
  ];

  CHARACTER_IMAGE_THROWING = [
    `img/character/Character${this.selectedCharacter}/Throwing/Character0${this.selectedCharacter}-Throwing_00.png`,
    `img/character/Character${this.selectedCharacter}/Throwing/Character0${this.selectedCharacter}-Throwing_01.png`,
    `img/character/Character${this.selectedCharacter}/Throwing/Character0${this.selectedCharacter}-Throwing_02.png`,
    `img/character/Character${this.selectedCharacter}/Throwing/Character0${this.selectedCharacter}-Throwing_03.png`,
    `img/character/Character${this.selectedCharacter}/Throwing/Character0${this.selectedCharacter}-Throwing_04.png`,
    `img/character/Character${this.selectedCharacter}/Throwing/Character0${this.selectedCharacter}-Throwing_05.png`,
    `img/character/Character${this.selectedCharacter}/Throwing/Character0${this.selectedCharacter}-Throwing_06.png`,
    `img/character/Character${this.selectedCharacter}/Throwing/Character0${this.selectedCharacter}-Throwing_07.png`,
    `img/character/Character${this.selectedCharacter}/Throwing/Character0${this.selectedCharacter}-Throwing_08.png`,
    `img/character/Character${this.selectedCharacter}/Throwing/Character0${this.selectedCharacter}-Throwing_09.png`,
    `img/character/Character${this.selectedCharacter}/Throwing/Character0${this.selectedCharacter}-Throwing_10.png`,
    `img/character/Character${this.selectedCharacter}/Throwing/Character0${this.selectedCharacter}-Throwing_11.png`,
    `img/character/Character${this.selectedCharacter}/Throwing/Character0${this.selectedCharacter}-Throwing_12.png`,
    `img/character/Character${this.selectedCharacter}/Throwing/Character0${this.selectedCharacter}-Throwing_13.png`,
    `img/character/Character${this.selectedCharacter}/Throwing/Character0${this.selectedCharacter}-Throwing_14.png`,
    `img/character/Character${this.selectedCharacter}/Throwing/Character0${this.selectedCharacter}-Throwing_15.png`,
    `img/character/Character${this.selectedCharacter}/Throwing/Character0${this.selectedCharacter}-Throwing_16.png`,
    `img/character/Character${this.selectedCharacter}/Throwing/Character0${this.selectedCharacter}-Throwing_17.png`,
    `img/character/Character${this.selectedCharacter}/Throwing/Character0${this.selectedCharacter}-Throwing_18.png`,
    `img/character/Character${this.selectedCharacter}/Throwing/Character0${this.selectedCharacter}-Throwing_19.png`,
    `img/character/Character${this.selectedCharacter}/Throwing/Character0${this.selectedCharacter}-Throwing_20.png`,
    `img/character/Character${this.selectedCharacter}/Throwing/Character0${this.selectedCharacter}-Throwing_21.png`,
    `img/character/Character${this.selectedCharacter}/Throwing/Character0${this.selectedCharacter}-Throwing_22.png`,
    `img/character/Character${this.selectedCharacter}/Throwing/Character0${this.selectedCharacter}-Throwing_23.png`,
    `img/character/Character${this.selectedCharacter}/Throwing/Character0${this.selectedCharacter}-Throwing_24.png`,
    `img/character/Character${this.selectedCharacter}/Throwing/Character0${this.selectedCharacter}-Throwing_25.png`,
    `img/character/Character${this.selectedCharacter}/Throwing/Character0${this.selectedCharacter}-Throwing_26.png`,
    `img/character/Character${this.selectedCharacter}/Throwing/Character0${this.selectedCharacter}-Throwing_27.png`,
    `img/character/Character${this.selectedCharacter}/Throwing/Character0${this.selectedCharacter}-Throwing_28.png`,
    `img/character/Character${this.selectedCharacter}/Throwing/Character0${this.selectedCharacter}-Throwing_29.png`,
    `img/character/Character${this.selectedCharacter}/Throwing/Character0${this.selectedCharacter}-Throwing_30.png`,
    `img/character/Character${this.selectedCharacter}/Throwing/Character0${this.selectedCharacter}-Throwing_31.png`,
    `img/character/Character${this.selectedCharacter}/Throwing/Character0${this.selectedCharacter}-Throwing_32.png`,
    `img/character/Character${this.selectedCharacter}/Throwing/Character0${this.selectedCharacter}-Throwing_33.png`,
    `img/character/Character${this.selectedCharacter}/Throwing/Character0${this.selectedCharacter}-Throwing_34.png`,
  ];

  // Variable stellt "Verbindung" zur Welt her
  world;

  CHARACTER_SOUND_WALK = new Audio("audio/02_character/walk/walk_fast_grass.mp3");
  CHARACTER_SOUND_THROWING = new Audio("audio/02_character/throw/long-whoosh-194554.mp3");
  CHARACTER_SOUND_HURT = new Audio("audio/02_character/confused/falled-sound-effect-278635.mp3");

  GAME_SOUND_LOSE = new Audio("audio/01_game/lose/01_level-failed-80951.mp3");

  constructor() {
    super().loadImage(
      `img/character/Character${this.selectedCharacter}/Idle/Character0${this.selectedCharacter}-Idle_00.png`
    );
    this.loadImages(this.CHARACTER_IMAGE_WALK);
    this.loadImages(this.CHARACTER_IMAGE_CONFUSED);
    this.loadImages(this.CHARACTER_IMAGE_DEAD);
    this.loadImages(this.CHARACTER_IMAGE_FLY);
    this.loadImages(this.CHARACTER_IMAGE_IDLE);
    this.loadImages(this.CHARACTER_IMAGE_THROWING);

    this.applyGravity(this.groundLevelCharacter);
    this.animate();
  }


  animate() {
    setInterval(() => {
      this.moveCharacter();
      this.adjustCamera();
    }, 1000 / 60);

    setInterval(() => {
      this.animateCharacter();
    }, 1000 / 60);
  }


  moveCharacter() {
    if (this.world.keyboard.RIGHT && this.x < this.world.level.levelEndX) {
      this.moveRight(this.speed);
      this.otherDirection = false;
    }
    if (this.world.keyboard.LEFT && this.x > -860) {
      this.moveLeft(this.speed);
      this.otherDirection = true;
    }
    if (this.world.keyboard.SPACE && !this.isAboveGround(this.groundLevelCharacter)) {
      this.jump(this.jumpY);
    }
  }


  adjustCamera() {
    if (this.x > -750 && this.x < 2125) {
      this.world.camera_x = -this.x - 30;
    }
  }



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
    if (this.world.keyboard.D && this.world.canThrow) {
      this.handleThrow();
      return;
    }
    this.handleIdle();
  }
  

  handleDeath() {
    this.playAnimationDeadCharacter();
    setTimeout(() => {
      if (!this.bannerDisplayed)
      world.showBanner('lose', language);
      this.bannerDisplayed = true;
  }, 800);
  }
  

  handleHurt() {
    this.playAnimation(this.CHARACTER_IMAGE_CONFUSED);
    if (!isMuted) {
      this.CHARACTER_SOUND_HURT.play();
    }
  }
  

  handleFly() {
    this.playAnimation(this.CHARACTER_IMAGE_FLY);
  }
  

  handleWalk() {
    this.playAnimation(this.CHARACTER_IMAGE_WALK);
    if (!isMuted) {
      this.CHARACTER_SOUND_WALK.play();
    }
  }
  

  handleThrow() {
    this.playAnimation(this.CHARACTER_IMAGE_THROWING);
    if (!isMuted && this.world.swirls >= this.world.valueOfSwirl) {
      this.CHARACTER_SOUND_THROWING.pause();
      this.CHARACTER_SOUND_THROWING.currentTime = 0;
      this.CHARACTER_SOUND_THROWING.play();
    }
  }
  

  handleIdle() {
    this.playAnimation(this.CHARACTER_IMAGE_IDLE);
  }


  playAnimationDeadCharacter() {
    if (!isMuted) {
      this.CHARACTER_SOUND_HURT.play();
    }
    if (this.deathAnimationFrame < this.CHARACTER_IMAGE_DEAD.length) {
      this.playAnimation([this.CHARACTER_IMAGE_DEAD[this.deathAnimationFrame]]);
      this.deathAnimationFrame++;
    }
    if (this.deathAnimationFrame >= this.CHARACTER_IMAGE_DEAD.length) {
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