class Shooter extends Enemy {
    ratio = 510/372;
    height = 170;
    width = this.height * this.ratio;
    minSpeed = 0.6;
    energy = 20;

    adjustFrameX = 85;
    adjustFrameY = 70;
    adjustFrameWidth = 3.6;
    adjustFrameHeight = 2.4;
    adjustedWidth = this.width/ this.adjustFrameWidth;
    adjustedHeight = this.height/ this.adjustFrameHeight;

    // maxStartX = 1800;

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


    SHOOTER_IMAGE_IDLE = [
        'img/enemies/shooter/Idle/Idle_00.png',
        'img/enemies/shooter/Idle/Idle_01.png',
        'img/enemies/shooter/Idle/Idle_02.png',
        'img/enemies/shooter/Idle/Idle_03.png',
        'img/enemies/shooter/Idle/Idle_04.png',
        'img/enemies/shooter/Idle/Idle_05.png',
        'img/enemies/shooter/Idle/Idle_06.png',
        'img/enemies/shooter/Idle/Idle_07.png',
        'img/enemies/shooter/Idle/Idle_08.png',
        'img/enemies/shooter/Idle/Idle_09.png',
        'img/enemies/shooter/Idle/Idle_10.png',
        'img/enemies/shooter/Idle/Idle_11.png',
        'img/enemies/shooter/Idle/Idle_12.png',
        'img/enemies/shooter/Idle/Idle_13.png',
        'img/enemies/shooter/Idle/Idle_14.png',
        'img/enemies/shooter/Idle/Idle_15.png',
        'img/enemies/shooter/Idle/Idle_16.png',
        'img/enemies/shooter/Idle/Idle_17.png',
        'img/enemies/shooter/Idle/Idle_18.png',	
        'img/enemies/shooter/Idle/Idle_19.png'	
    ];



    constructor() {
        super().loadImage(`img/enemies/shooter/Idle/Idle_00.png`);
        this.loadImages(this.SHOOTER_IMAGE_WALK);
        this.loadImages(this.SHOOTER_IMAGE_ATTACK);
        this.loadImages(this.SHOOTER_IMAGE_IDLE);

        this.y = 246;
        this.x = 250 + Math.random() * this.maxStartX;
        this.speed = this.minSpeed + Math.random() * 0.2;
        this.state = 'walk';
        this.enemyId = globalCounterId++;
        this.loopHasStarted = false;

        this.animate();
        this.startLoop();
    }


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


    checkIfLoopHasStarted() {
        if (!this.loopHasStarted) {
            this.startLoop();
            this.loopHasStarted = true;
    }
}


    startLoop() {
        let shootIntervalId;
        if (!this.isDead() && this.hadFirstContact) {
             shootIntervalId = setTimeout(() => {
                this.shootBullet();
            }, 4000); 
        }
       
    }


    shootBullet() {
        if (this.isDead()) return;

        this.state = "attack";
        let bullet = new Bullet(this.x);
        world.level.enemies.push(bullet);

        // Nur einmal schießen, dann wieder laufen
        setTimeout(() => {
            this.state = "walk";
            this.startLoop();
        }, 400);}

}
