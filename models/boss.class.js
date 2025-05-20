class Boss extends Enemy {
    ratio = 380 / 350;
    height = 280;
    y = 117;
    groundLevelBoss = 117;
    x = 2000;

    speed = 1.8;
    speedXJump = 10;
    acceleration = 1.8;
    jumpY = 20;
    width = this.height * this.ratio;
    energy = 60;

    adjustFrameX = 115;
    adjustFrameY = 60;
    adjustFrameWidth = 3.2;
    adjustFrameHeight = 1.4;


    adjustedWidth = this.width/ this.adjustFrameWidth;
    adjustedHeight = this.height/ this.adjustFrameHeight;


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
        `img/enemies/boss/Walk/Monster4-Walk_19.png`
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
        `img/enemies/boss/Attack/Monster4-Attack_24.png`
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
        `img/enemies/boss/Idle/Monster4-Idle_19.png`
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
        `img/enemies/boss/Hurt/Monster4-Hurt_19.png`
    ];




    constructor() {
        super().loadImage(`img/enemies/boss/Idle/Monster4-Idle_00.png`);
        this.loadImages(this.BOSS_IMAGE_WALK);
        this.loadImages(this.BOSS_IMAGE_ATTACK);
        this.loadImages(this.BOSS_IMAGE_IDLE);
        this.loadImages(this.BOSS_IMAGE_HURT);

        this.enemyId = globalCounterId++;

        this.applyGravity(this.groundLevelBoss);
        this.animate();
    }


    /**
     * This function is called to animate the boss.
     * It plays the walking animation, moves the boss to the left,
     * and plays the attack animation after a certain number of frames.
     * It also checks if the boss is hurt and plays the hurt animation.
     * It uses setInterval to update the animation every 100 milliseconds.
     */
    animate() {
        let i = 0;
        setInterval(() => {
            if (this.isHurt()) {
                this.playAnimation(this.BOSS_IMAGE_HURT);
            } else if (this.isAboveGround(this.groundLevelBoss)) {
                this.playAnimation(this.BOSS_IMAGE_ATTACK);
                this.moveLeft(this.speedXJump);
                i++;
            } else if (i < 24) {
                this.playAnimation(this.BOSS_IMAGE_ATTACK);
                i++;
            }
            else if (i < 19 * 5) {
                this.playAnimation(this.BOSS_IMAGE_WALK);
                this.moveLeft(this.speed);
                i++;
            } else if (!this.isAboveGround(this.groundLevelBoss)) {
                i = 0;
                this.jump(this.jumpY);
               
            }

            if (!this.hadFirstContact) {
                i = 0;
            }
        }, 100);
    }


    /**
     * This function is called when the boss is killed.
     * It creates an explosion effect and plays a sound (if not muted).
     * The explosion effect is removed after 400 milliseconds.
     * 
     * @param {object} enemy - The enemy object that is being killed.
     */
    animateDissapearanceOfBoss(enemy)  {
        let explosion = new FixedObject('img/effects/explosion_boss.png', false, 'none', enemy.x + enemy.adjustFrameX / 2, enemy.y + enemy.adjustFrameY / 4, 300, 300);
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
}