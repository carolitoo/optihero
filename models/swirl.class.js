class Swirl extends MoveableObject {
    ratio = 177/172;
    height = 50;
    width = this.height * this.ratio;

    maxSwirlX = 1800;
    maxSwirlY = 200;

    adjustFrameX = 8;
    adjustFrameY = 12;
    adjustFrameWidth = 1.5;
    adjustFrameHeight = 1.8;
    adjustedWidth = this.width/ this.adjustFrameWidth;
    adjustedHeight = this.height/ this.adjustFrameHeight;


    SWIRL_IMAGE = [
        'img/collect/swirl/swirl1.png',
        'img/collect/swirl/swirl2.png',
        'img/collect/swirl/swirl3.png'
    ];


    constructor() {
        super().loadImage('img/collect/swirl/swirl1.png');
        this.loadImages(this.SWIRL_IMAGE);

        this.y = 100 + Math.random() * this.maxSwirlY;
        this.x = 250 + Math.random() * this.maxSwirlX;

        this.animate();
    }


    animate() {
        setInterval(() => {
            this.playAnimation(this.SWIRL_IMAGE);
        }, 200);

    }





}