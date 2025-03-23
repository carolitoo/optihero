class Warrior extends Enemy {
    ratio = 795/504;
    height = 195;
    width = this.height * this.ratio;
    minSpeed = 0.35;
    energy = 20;
    
    adjustFrameX = 148;
    adjustFrameY = 68;
    adjustFrameWidth = 4.0;
    adjustFrameHeight = 1.8;
    adjustedWidth = this.width/ this.adjustFrameWidth;
    adjustedHeight = this.height/ this.adjustFrameHeight;

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
        `img/enemies/warrior/Walk/Walk_19.png`	
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
        `img/enemies/warrior/Attack/Attack_29.png`
    ];

    WARRIOR_IMAGE_IDLE = [
        `img/enemies/warrior/Idle/Idle_00.png`,
        `img/enemies/warrior/Idle/Idle_01.png`,
        `img/enemies/warrior/Idle/Idle_02.png`,
        `img/enemies/warrior/Idle/Idle_03.png`,
        `img/enemies/warrior/Idle/Idle_04.png`,
        `img/enemies/warrior/Idle/Idle_05.png`,
        `img/enemies/warrior/Idle/Idle_06.png`,
        `img/enemies/warrior/Idle/Idle_07.png`,
        `img/enemies/warrior/Idle/Idle_08.png`,
        `img/enemies/warrior/Idle/Idle_09.png`,
        `img/enemies/warrior/Idle/Idle_10.png`,
        `img/enemies/warrior/Idle/Idle_11.png`,
        `img/enemies/warrior/Idle/Idle_12.png`,
        `img/enemies/warrior/Idle/Idle_13.png`,
        `img/enemies/warrior/Idle/Idle_14.png`,
        `img/enemies/warrior/Idle/Idle_15.png`,
        `img/enemies/warrior/Idle/Idle_16.png`,
        `img/enemies/warrior/Idle/Idle_17.png`,
        `img/enemies/warrior/Idle/Idle_18.png`,	
        `img/enemies/warrior/Idle/Idle_19.png`	
    ];

    constructor() {
        super().loadImage(`img/enemies/warrior/Idle/Idle_00.png`);
        this.loadImages(this.WARRIOR_IMAGE_WALK);
        this.loadImages(this.WARRIOR_IMAGE_ATTACK);
        this.loadImages(this.WARRIOR_IMAGE_IDLE);

        this.y = 220;
        this.x = 250 + Math.random() * this.maxStartX;
        this.speed = this.minSpeed + Math.random() * 0.2;

        this.enemyId = globalCounterId++;

        this.animate();
    }

    animate() {
        setInterval(() => {
            this.moveLeft(this.speed);
            this.playAnimation(this.WARRIOR_IMAGE_WALK);
        }, 1000 / 40);
    }

}

 
