class Swirl extends MoveableObject {
    ratio = 177/172;
    height = 50;
    width = this.height * this.ratio;

    maxSwirlX = 2800;
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

        this.y = 50 + Math.random() * this.maxSwirlY;
        this.x = 280 + Math.random() * this.maxSwirlX;

        this.animate();
    }


    /**
     * This function plays the animation of the swirl.
     * It changes the image of the swirl every 200 milliseconds.
     */
    animate() {
        setInterval(() => {
            this.playAnimation(this.SWIRL_IMAGE);
        }, 200);

    }

}