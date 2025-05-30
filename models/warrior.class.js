class Warrior extends Enemy {
  ratio = 795 / 504;
  height = 195;
  width = this.height * this.ratio;
  minSpeed = 0.5;
  energy = 20;

  adjustFrameX = 148;
  adjustFrameY = 68;
  adjustFrameWidth = 4.0;
  adjustFrameHeight = 1.8;
  adjustedWidth = this.width / this.adjustFrameWidth;
  adjustedHeight = this.height / this.adjustFrameHeight;

  WARRIOR_IMAGE_WALK = [
    `img/enemies/warrior/Walk/Walk_00.png`,
    `img/enemies/warrior/Walk/Walk_01.png`,
    `img/enemies/warrior/Walk/Walk_02.png`,
    `img/enemies/warrior/Walk/Walk_03.png`,
    `img/enemies/warrior/Walk/Walk_04.png`,
    `img/enemies/warrior/Walk/Walk_05.png`,
    `img/enemies/warrior/Walk/Walk_06.png`,
    `img/enemies/warrior/Walk/Walk_07.png`,
    `img/enemies/warrior/Walk/Walk_08.png`,
    `img/enemies/warrior/Walk/Walk_09.png`,
    `img/enemies/warrior/Walk/Walk_10.png`,
    `img/enemies/warrior/Walk/Walk_11.png`,
    `img/enemies/warrior/Walk/Walk_12.png`,
    `img/enemies/warrior/Walk/Walk_13.png`,
    `img/enemies/warrior/Walk/Walk_14.png`,
    `img/enemies/warrior/Walk/Walk_15.png`,
    `img/enemies/warrior/Walk/Walk_16.png`,
    `img/enemies/warrior/Walk/Walk_17.png`,
    `img/enemies/warrior/Walk/Walk_18.png`,
    `img/enemies/warrior/Walk/Walk_19.png`,
  ];

  WARRIOR_IMAGE_ATTACK = [
    `img/enemies/warrior/Attack/Attack_00.png`,
    `img/enemies/warrior/Attack/Attack_01.png`,
    `img/enemies/warrior/Attack/Attack_02.png`,
    `img/enemies/warrior/Attack/Attack_03.png`,
    `img/enemies/warrior/Attack/Attack_04.png`,
    `img/enemies/warrior/Attack/Attack_05.png`,
    `img/enemies/warrior/Attack/Attack_06.png`,
    `img/enemies/warrior/Attack/Attack_07.png`,
    `img/enemies/warrior/Attack/Attack_08.png`,
    `img/enemies/warrior/Attack/Attack_09.png`,
    `img/enemies/warrior/Attack/Attack_10.png`,
    `img/enemies/warrior/Attack/Attack_11.png`,
    `img/enemies/warrior/Attack/Attack_12.png`,
    `img/enemies/warrior/Attack/Attack_13.png`,
    `img/enemies/warrior/Attack/Attack_14.png`,
    `img/enemies/warrior/Attack/Attack_15.png`,
    `img/enemies/warrior/Attack/Attack_16.png`,
    `img/enemies/warrior/Attack/Attack_17.png`,
    `img/enemies/warrior/Attack/Attack_18.png`,
    `img/enemies/warrior/Attack/Attack_19.png`,
    `img/enemies/warrior/Attack/Attack_20.png`,
    `img/enemies/warrior/Attack/Attack_21.png`,
    `img/enemies/warrior/Attack/Attack_22.png`,
    `img/enemies/warrior/Attack/Attack_23.png`,
    `img/enemies/warrior/Attack/Attack_24.png`,
    `img/enemies/warrior/Attack/Attack_25.png`,
    `img/enemies/warrior/Attack/Attack_26.png`,
    `img/enemies/warrior/Attack/Attack_27.png`,
    `img/enemies/warrior/Attack/Attack_28.png`,
    `img/enemies/warrior/Attack/Attack_29.png`,
  ];

  constructor() {
    super().loadImage(`img/enemies/warrior/Idle/Idle_00.png`);
    this.loadImages(this.WARRIOR_IMAGE_WALK);
    this.loadImages(this.WARRIOR_IMAGE_ATTACK);

    this.y = 220;
    this.x = 400 + Math.random() * this.maxStartX;
    this.speed = this.minSpeed + Math.random() * 0.2;

    this.enemyId = globalCounterId++;

    this.state = "walking";
    this.frameIndex = 0;
    this.walkCycles = 0;

    this.amoutOfWalkingCyclesToAttack = Math.random() * 4 + 1;
    this.animate();
  }


  /**
   * This function starts the animation loop for the warrior.
   * It checks the current state of the warrior and calls the appropriate handler function.
   * If the state is not recognized, it defaults to walking.
   */
  animate() {
    setInterval(() => {
      switch (this.state) {
        case "walking":
          this.handleWalkingWarrior();
          break;

        case "attacking":
          this.handleAttackingWarrior();
          break;

        default:
          this.state = "walking";
          this.frameIndex = 0;
          break;
      }
    }, 1000 / 40);
  }


  /**
   * This function handles the walking state of the warrior.
   * It changes the frame, plays the walking animation, moves the warrior to the left.
   * After a defined amount of walking cycles, it changes the state to attacking.
   */
  handleWalkingWarrior() {
    this.changeFrameX(148, 4.0);
    this.playAnimation([this.WARRIOR_IMAGE_WALK[this.frameIndex]]);
    this.moveLeft(this.speed);
    this.frameIndex++;

    if (this.frameIndex >= this.WARRIOR_IMAGE_WALK.length) {
      this.frameIndex = 0;
      this.walkCycles++;

      if (this.walkCycles >= this.amoutOfWalkingCyclesToAttack) {
        this.state = "attacking";
        this.frameIndex = 0;
        this.walkCycles = 0;
      }
    }
  }


  /**
   * This function handles the attacking state of the warrior.
   * It changes the frame, plays the attacking animation.
   * After finishing the attack animation, it changes the state back to walking.
   */
  handleAttackingWarrior() {
    this.changeFrameX(75, 2.2);
    this.playAnimation([this.WARRIOR_IMAGE_ATTACK[this.frameIndex]]);
    this.frameIndex++;

    if (this.frameIndex >= this.WARRIOR_IMAGE_ATTACK.length) {
      this.state = "walking";
      this.frameIndex = 0;
    }
  }
}
