class Shooter extends Enemy {
    ratio = 510/372;
    height = 170;
    width = this.height * this.ratio;
    minSpeed = 0.8;
    energy = 20;

    adjustFrameX = 85;
    adjustFrameY = 70;
    adjustFrameWidth = 3.6;
    adjustFrameHeight = 2.4;
    adjustedWidth = this.width/ this.adjustFrameWidth;
    adjustedHeight = this.height/ this.adjustFrameHeight;

    maxStartX = 3000;
    minStartX = 800;

    loopHasStarted;
  
    SHOOTER_IMAGE_WALK = [
        'img/enemies/shooter/Walk/Walk_00.png',
        'img/enemies/shooter/Walk/Walk_01.png',
        'img/enemies/shooter/Walk/Walk_02.png',
        'img/enemies/shooter/Walk/Walk_03.png',
        'img/enemies/shooter/Walk/Walk_04.png',
        'img/enemies/shooter/Walk/Walk_05.png',
        'img/enemies/shooter/Walk/Walk_06.png',
        'img/enemies/shooter/Walk/Walk_07.png',
        'img/enemies/shooter/Walk/Walk_08.png',
        'img/enemies/shooter/Walk/Walk_09.png',
        'img/enemies/shooter/Walk/Walk_10.png',
        'img/enemies/shooter/Walk/Walk_11.png',
        'img/enemies/shooter/Walk/Walk_12.png',
        'img/enemies/shooter/Walk/Walk_13.png',
        'img/enemies/shooter/Walk/Walk_14.png',
        'img/enemies/shooter/Walk/Walk_15.png',
        'img/enemies/shooter/Walk/Walk_16.png',
        'img/enemies/shooter/Walk/Walk_17.png',
        'img/enemies/shooter/Walk/Walk_18.png',	
        'img/enemies/shooter/Walk/Walk_19.png'	
    ];

    SHOOTER_IMAGE_ATTACK = [
        'img/enemies/shooter/Attack/Attack_00.png',
        'img/enemies/shooter/Attack/Attack_01.png',
        'img/enemies/shooter/Attack/Attack_02.png',
        'img/enemies/shooter/Attack/Attack_03.png',
        'img/enemies/shooter/Attack/Attack_04.png',
        'img/enemies/shooter/Attack/Attack_05.png',
        'img/enemies/shooter/Attack/Attack_06.png',
        'img/enemies/shooter/Attack/Attack_07.png',
        'img/enemies/shooter/Attack/Attack_08.png',
        'img/enemies/shooter/Attack/Attack_09.png',
        'img/enemies/shooter/Attack/Attack_10.png',
        'img/enemies/shooter/Attack/Attack_11.png',
        'img/enemies/shooter/Attack/Attack_12.png',
        'img/enemies/shooter/Attack/Attack_13.png',
        'img/enemies/shooter/Attack/Attack_14.png',
        'img/enemies/shooter/Attack/Attack_15.png',
        'img/enemies/shooter/Attack/Attack_16.png',
        'img/enemies/shooter/Attack/Attack_17.png',
        'img/enemies/shooter/Attack/Attack_18.png',	
        'img/enemies/shooter/Attack/Attack_19.png'	
    ];

    constructor() {
        super().loadImage(`img/enemies/shooter/Idle/Idle_00.png`);
        this.loadImages(this.SHOOTER_IMAGE_WALK);
        this.loadImages(this.SHOOTER_IMAGE_ATTACK);

        this.y = 246;
        this.x = this.minStartX + Math.random() * this.maxStartX;
        this.speed = this.minSpeed + Math.random() * 0.2;
        this.state = 'walk';
        this.enemyId = globalCounterId++;
        this.loopHasStarted = false;

        this.animate();
        this.startLoop();
    }


    /**
     * This function checks the state of the shooter and plays the corresponding animation.
     * If the state is 'walk', it moves the shooter to the left.
     */
    animate() {
        setInterval(() => {
            if (this.state === 'walk') {
                this.moveLeft(this.speed);
                this.playAnimation(this.SHOOTER_IMAGE_WALK);
            } else if (this.state = 'attack') {
                this.playAnimation(this.SHOOTER_IMAGE_ATTACK);
            } else {
                this.playAnimation(this.SHOOTER_IMAGE_IDLE);
            }
        }, 1000 / 25);
    }


    /**
     * This function checks if the loop has started.
     * If it has not started, it starts the loop.
     * It is used to ensure that the loop is only started once.
     */
    checkIfLoopHasStarted() {
        if (!this.loopHasStarted) {
            this.startLoop();
            this.loopHasStarted = true;
    }
}

    /**
     * This function starts the shooting loop.
     * It sets a timeout to shoot a bullet every 1600 milliseconds.
     * It checks if the shooter is not dead and has had first contact with the character before starting the loop.
     */
    startLoop() {
        let shootIntervalId;
        if (!this.isDead() && this.hadFirstContact) {
            shootIntervalId = setTimeout(() => {
                this.shootBullet();
            }, 1600); 
        }
    }


    /**
     * This function is called to shoot a bullet.
     * It sets the state to 'attack' and creates a new bullet object which is added it to the enemy array.
     * After shooting the bullet it sets the state of the shooter back to 'walk' and starts the loop again. 
     */
    shootBullet() {
        if (this.isDead()) return;

        this.state = "attack";
        let bullet = new Bullet(this.x);
        world.level.enemies.push(bullet);

        setTimeout(() => {
            this.state = "walk";
            this.startLoop();
        }, 400);}

}
