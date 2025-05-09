class Windmill extends MoveableObject {

    ratio = 591/789;

    WINDMILL_IMAGE = [
        'img/effects/windmill_01.png',
        'img/effects/windmill_02.png',
        'img/effects/windmill_03.png'
    ];



    constructor(x, y, height) {
        super().loadImage('img/effects/windmill_01.png');
        this.loadImages(this.WINDMILL_IMAGE);

        this.x = x;
        this.y = y;
        this.height = height;
        this.width = this.height * this.ratio;

        this.animateWindmill();
    }


    /**
     * This function plays the animation of the windmill (in case of a win).
     * It changes the image of the windmill every 120 milliseconds.
     */
    animateWindmill() {
        setInterval(() => {
            this.playAnimation(this.WINDMILL_IMAGE);
        }, 120);
    }


}