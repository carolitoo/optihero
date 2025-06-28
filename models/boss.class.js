class Boss extends Enemy {
  ratio = 380 / 350;
  height = 280;
  y = 117;
  groundLevelBoss = 117;
  x = 4000;

  speed = 2.5;
  speedXJump = 10;
  acceleration = 1.6;
  jumpY = 24;
  width = this.height * this.ratio;
  energy = 80;

  introPlayed = false;

  adjustFrameX = 115;
  adjustFrameY = 60;
  adjustFrameWidth = 3.2;
  adjustFrameHeight = 1.4;

  adjustedWidth = this.width / this.adjustFrameWidth;
  adjustedHeight = this.height / this.adjustFrameHeight;

  BOSS_IMAGE_WALK = [
     `img/enemies/boss/Walk/Monster4-Walk_00.png`,
     `img/enemies/boss/Walk/Monster4-Walk_01.png`,
     `img/enemies/boss/Walk/Monster4-Walk_02.png`,
     `img/enemies/boss/Walk/Monster4-Walk_03.png`,
     `img/enemies/boss/Walk/Monster4-Walk_04.png`,
     `img/enemies/boss/Walk/Monster4-Walk_05.png`,
     `img/enemies/boss/Walk/Monster4-Walk_06.png`,
     `img/enemies/boss/Walk/Monster4-Walk_07.png`,
     `img/enemies/boss/Walk/Monster4-Walk_08.png`,
     `img/enemies/boss/Walk/Monster4-Walk_09.png`,
     `img/enemies/boss/Walk/Monster4-Walk_10.png`,
     `img/enemies/boss/Walk/Monster4-Walk_11.png`,
     `img/enemies/boss/Walk/Monster4-Walk_12.png`,
     `img/enemies/boss/Walk/Monster4-Walk_13.png`,
     `img/enemies/boss/Walk/Monster4-Walk_14.png`,
     `img/enemies/boss/Walk/Monster4-Walk_15.png`,
     `img/enemies/boss/Walk/Monster4-Walk_16.png`,
     `img/enemies/boss/Walk/Monster4-Walk_17.png`,
     `img/enemies/boss/Walk/Monster4-Walk_18.png`,
     `img/enemies/boss/Walk/Monster4-Walk_19.png`,
  ];

  BOSS_IMAGE_ATTACK = [
     `img/enemies/boss/Attack/Monster4-Attack_00.png`,
     `img/enemies/boss/Attack/Monster4-Attack_01.png`,
     `img/enemies/boss/Attack/Monster4-Attack_02.png`,
     `img/enemies/boss/Attack/Monster4-Attack_03.png`,
     `img/enemies/boss/Attack/Monster4-Attack_04.png`,
     `img/enemies/boss/Attack/Monster4-Attack_05.png`,
     `img/enemies/boss/Attack/Monster4-Attack_06.png`,
     `img/enemies/boss/Attack/Monster4-Attack_07.png`,
     `img/enemies/boss/Attack/Monster4-Attack_08.png`,
     `img/enemies/boss/Attack/Monster4-Attack_09.png`,
     `img/enemies/boss/Attack/Monster4-Attack_10.png`,
     `img/enemies/boss/Attack/Monster4-Attack_11.png`,
     `img/enemies/boss/Attack/Monster4-Attack_12.png`,
     `img/enemies/boss/Attack/Monster4-Attack_13.png`,
     `img/enemies/boss/Attack/Monster4-Attack_14.png`,
     `img/enemies/boss/Attack/Monster4-Attack_15.png`,
     `img/enemies/boss/Attack/Monster4-Attack_16.png`,
     `img/enemies/boss/Attack/Monster4-Attack_17.png`,
     `img/enemies/boss/Attack/Monster4-Attack_18.png`,
     `img/enemies/boss/Attack/Monster4-Attack_19.png`,
     `img/enemies/boss/Attack/Monster4-Attack_20.png`,
     `img/enemies/boss/Attack/Monster4-Attack_21.png`,
     `img/enemies/boss/Attack/Monster4-Attack_22.png`,
     `img/enemies/boss/Attack/Monster4-Attack_23.png`,
     `img/enemies/boss/Attack/Monster4-Attack_24.png`,
  ];

  BOSS_IMAGE_IDLE = [
     `img/enemies/boss/Idle/Monster4-Idle_00.png`,
     `img/enemies/boss/Idle/Monster4-Idle_01.png`,
     `img/enemies/boss/Idle/Monster4-Idle_02.png`,
     `img/enemies/boss/Idle/Monster4-Idle_03.png`,
     `img/enemies/boss/Idle/Monster4-Idle_04.png`,
     `img/enemies/boss/Idle/Monster4-Idle_05.png`,
     `img/enemies/boss/Idle/Monster4-Idle_06.png`,
     `img/enemies/boss/Idle/Monster4-Idle_07.png`,
     `img/enemies/boss/Idle/Monster4-Idle_08.png`,
     `img/enemies/boss/Idle/Monster4-Idle_09.png`,
     `img/enemies/boss/Idle/Monster4-Idle_10.png`,
     `img/enemies/boss/Idle/Monster4-Idle_11.png`,
     `img/enemies/boss/Idle/Monster4-Idle_12.png`,
     `img/enemies/boss/Idle/Monster4-Idle_13.png`,
     `img/enemies/boss/Idle/Monster4-Idle_14.png`,
     `img/enemies/boss/Idle/Monster4-Idle_15.png`,
     `img/enemies/boss/Idle/Monster4-Idle_16.png`,
     `img/enemies/boss/Idle/Monster4-Idle_17.png`,
     `img/enemies/boss/Idle/Monster4-Idle_18.png`,
     `img/enemies/boss/Idle/Monster4-Idle_19.png`,
  ];

  BOSS_IMAGE_HURT = [
     `img/enemies/boss/Hurt/Monster4-Hurt_00.png`,
     `img/enemies/boss/Hurt/Monster4-Hurt_01.png`,
     `img/enemies/boss/Hurt/Monster4-Hurt_02.png`,
     `img/enemies/boss/Hurt/Monster4-Hurt_03.png`,
     `img/enemies/boss/Hurt/Monster4-Hurt_04.png`,
     `img/enemies/boss/Hurt/Monster4-Hurt_05.png`,
     `img/enemies/boss/Hurt/Monster4-Hurt_06.png`,
     `img/enemies/boss/Hurt/Monster4-Hurt_07.png`,
     `img/enemies/boss/Hurt/Monster4-Hurt_08.png`,
     `img/enemies/boss/Hurt/Monster4-Hurt_09.png`,
     `img/enemies/boss/Hurt/Monster4-Hurt_10.png`,
     `img/enemies/boss/Hurt/Monster4-Hurt_11.png`,
     `img/enemies/boss/Hurt/Monster4-Hurt_12.png`,
     `img/enemies/boss/Hurt/Monster4-Hurt_13.png`,
     `img/enemies/boss/Hurt/Monster4-Hurt_14.png`,
     `img/enemies/boss/Hurt/Monster4-Hurt_15.png`,
     `img/enemies/boss/Hurt/Monster4-Hurt_16.png`,
     `img/enemies/boss/Hurt/Monster4-Hurt_17.png`,
     `img/enemies/boss/Hurt/Monster4-Hurt_18.png`,
     `img/enemies/boss/Hurt/Monster4-Hurt_19.png`,
  ];

  BOSS_SOUND_START = new Audio("./audio/03_enemies/start_boss.mp3");
  BOSS_SOUND_WALK = new Audio("./audio/03_enemies/walk_boss.mp3");
  BOSS_SOUND_ATTACK = new Audio("./audio/03_enemies/attack_boss.mp3");

  constructor() {
    super().loadImage(`img/enemies/boss/Idle/Monster4-Idle_00.png`);
    this.loadImages(this.BOSS_IMAGE_WALK);
    this.loadImages(this.BOSS_IMAGE_ATTACK);
    this.loadImages(this.BOSS_IMAGE_IDLE);
    this.loadImages(this.BOSS_IMAGE_HURT);

    this.enemyId = globalCounterId++;

    this.applyGravity(this.groundLevelBoss);
    this.animate();

    this.state = "walking";
    this.frameIndex = 0;
    this.walkCycles = 0;
  }


  /**
   * This function is called after the first contact with the boss.
   * It plays the boss start sound and sets the state to idle.
   * After 2 seconds, it changes the state to walking.
   */
  bossFirstContactAnimation() {
    if (!this.introPlayed) {
      this.state = "idle";

      if (!isMuted) {
         this.BOSS_SOUND_START.play();
      }

      setTimeout(() => {
        this.state = "walking";
      }, 3000);
      this.introPlayed = true;
    }
  }


  /**
   * This function is called when the boss is hit.
   * It sets the state to 'hurt' and resets the frame index.
   */
  onHit() {
    this.state = "hurt";
    this.frameIndex = 0;
  }


  /**
   * This function handles the animation and sound for the boss.
   * It checks the current state of the boss and calls the appropriate handler function.
   * If the boss has not had its first contact with the character, it is not animated.
   */
  animate() {
    setInterval(() => {
      if (!this.hadFirstContact) return;

      switch (this.state) {
        case "idle":
          this.playAnimation(this.BOSS_IMAGE_IDLE);
          break;

        case "walking":
          if (!isMuted) {
             this.BOSS_SOUND_WALK.play();
          }
          this.handleWalkingBoss();
          break;

        case "attacking":
          if (this.BOSS_SOUND_WALK.currentTime > 0) {
            this.BOSS_SOUND_WALK.pause();
          }
          this.handleAttackingBoss();
          break;
          
        case "hurt":
          if (this.BOSS_SOUND_WALK > 0) {
            this.BOSS_SOUND_WALK.pause();
          }
          if (this.BOSS_SOUND_ATTACK.currentTime > 0) {
            this.BOSS_SOUND_ATTACK.pause();
          }
          this.handleHurtBoss();
          break;

        case "dead":
          this.handleDeadBoss();
          break;

        default:
          this.state = "walking";
          this.frameIndex = 0;
          break;
      }
    }, 80);
  }


  /**
   * This function handles the walking state of the boss.
   * It changes the frame for collision detection, plays the walking animation and moves the boss to the left.
   * It increments the frame index and checks if it has reached the end of the walking animation.
   * In this case, it calls the function to reset the frame index and increment the walk cycles.
   * If the boss has reached a defined x coordinate, it handles the end position.
   */
  handleWalkingBoss() {
    this.changeFrameX(115, 3.2);
    this.playAnimation([this.BOSS_IMAGE_WALK[this.frameIndex]]);
    this.moveLeft(this.speed);
    this.frameIndex++;

    if (this.frameIndex >= this.BOSS_IMAGE_WALK.length) {
        this.handleWalkingCyclesBoss();  
    }

     if (this.x < -200) {
        this.handleEndPositionBoss();
      }
  }


  /**
   * This function handles the walking cycles of the boss.
   * It resets the frame index, increments the walk cycles and checks if the walk cycles have reached a defined amount.
   * If so, it changes the state to attacking, resets the frame index and walk cycles.
   */
  handleWalkingCyclesBoss() {
    this.frameIndex = 0;
    this.walkCycles++;

    if (this.walkCycles >= 2) {
        this.state = "attacking";
        this.frameIndex = 0;
        this.walkCycles = 0;
      }
  }


  /**
   * This function handles the attacking state of the boss.
   * It changes the frame for collision detection, plays the attacking animation and moves the boss to the left.
   * If the frame index is 0 and the boss is not above ground, it makes the boss jump and plays the attack sound.
   * It increments the frame index and checks if it has reached the end of the attacking animation.
   * If so, it changes the state to walking and resets the frame index.
   */
  handleAttackingBoss() {
    this.changeFrameX(60, 1.6);
    this.playAnimation([this.BOSS_IMAGE_ATTACK[this.frameIndex]]);

    if (this.frameIndex === 0 && !this.isAboveGround(this.groundLevelBoss)) {
      this.jump(this.jumpY);
      if (!isMuted) {
        this.BOSS_SOUND_ATTACK.currentTime = 0;
        this.BOSS_SOUND_ATTACK.play();
      }
  
    }
    this.moveLeft(this.speedXJump);
    this.frameIndex++;

    if (this.frameIndex >= this.BOSS_IMAGE_ATTACK.length) {
      this.state = "walking";
      this.frameIndex = 0;
    }
  }


  /**
   * This function handles the hurt state of the boss.
   * It resets the frame for collision detection, plays the hurt animation and increments the frame index.
   * If the frame index is greater than or equal to the length of the hurt animation, it checks if the boss is still hurt.
   * If not, it changes the state to walking and resets the frame index.
   */
  handleHurtBoss() {
    this.changeFrameX(115, 3.2);
    this.playAnimation([this.BOSS_IMAGE_HURT[this.frameIndex]]);
    this.frameIndex++;

    if (!this.isHurt()) {
      this.state = "walking";
      this.frameIndex = 0;
    }
  }


  /**
   * This function handles the end position of the boss.
   * It resets the frame index, changes the state to idle and plays the boss start sound (if not muted).
   */
  handleEndPositionBoss() {
      this.frameIndex = 0;
      this.state = "idle";
      if (!isMuted) {
        this.BOSS_SOUND_START.play();
      }
  }


  /**
   * This function is used to stop the sounds when the boss is killed.
   */
  handleDeadBoss() {
    this.BOSS_SOUND_ATTACK.pause();
    this.BOSS_SOUND_WALK.pause();
    this.BOSS_SOUND_START.pause();

  } 


    /**
     * This function handles the sound when the boss is hit.
     * It plays the sound (after reseting the current time to 0 to ensure the sound is played from the beginning).
     */
    handlingHitBoss() {
        if (!isMuted) {
            world.sound.BOSS_SOUND_HIT.currentTime = 0;
            world.sound.BOSS_SOUND_HIT.play();
        }
        this.onHit();
    }


  /**
   * This function is called when the boss is killed.
   * It creates an explosion effect and plays a sound (if not muted).
   * The explosion effect is removed after 400 milliseconds.
   *
   * @param {object} enemy - The enemy object that is being killed.
   */
  animateDissapearanceOfBoss(enemy) {
    this.state = "dead";
    let explosion = new FixedObject("img/effects/explosion_boss.png", false, "none", enemy.x + enemy.adjustFrameX / 2, enemy.y + enemy.adjustFrameY / 4, 300, 300);
    world.effectObjects.push(explosion);
    if (!isMuted) {
      this.BOSS_SOUND_KILL.play();
    }
    setTimeout(() => {
      let explosionIndex = world.effectObjects.indexOf(explosion);
      if (explosionIndex > -1) {
        world.effectObjects.splice(explosionIndex, 1);
      }
    }, 400);
  }


    /**
     * This function replaces the boss with windmills.
     * It creates three new Windmill objects and adds them to the effectObjects array.
     * It also plays the windmill sound and sets it to loop.
     */
      replaceBossByWindmills() {
        if (!isMuted) {
            world.sound.WINDMILL_SOUND.play();
            world.sound.WINDMILL_SOUND.loop = true;
        }

        world.effectObjects.push(new Windmill(this.x + this.adjustFrameX / 3, 40, 360));
        world.effectObjects.push(new Windmill(this.x + this.adjustFrameX + 150, 70, 320));
        world.effectObjects.push(new Windmill(this.x + this.adjustFrameX + 80, 185, 200));
    }
}
