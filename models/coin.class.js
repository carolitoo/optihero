class Coin extends MoveableObject {
    ratio = 200/250;
    height = 80;
    width = this.height * this.ratio;

    maxCoinX = 1800;
    maxCoinY = 200;

    adjustFrameX = 20;
    adjustFrameY = 20;
    adjustFrameWidth = 1.5;
    adjustFrameHeight = 1.8;
    adjustedWidth = this.width/ this.adjustFrameWidth;
    adjustedHeight = this.height/ this.adjustFrameHeight;

    COIN_IMAGE = [
        'img/collect/coins/coin_ppa_1.png',
        'img/collect/coins/coin_ppa_2.png',
        'img/collect/coins/coin_ppa_3.png',
        'img/collect/coins/coin_ppa_4.png',
        'img/collect/coins/coin_ppa_5.png',
        'img/collect/coins/coin_ppa_6.png',
        'img/collect/coins/coin_ppa_7.png'   
    ];


    constructor() {
        super().loadImage('img/collect/coins/coin_ppa_1.png');
        this.loadImages(this.COIN_IMAGE);

        this.y = 50 + Math.random() * this.maxCoinY;
        this.x = 250 + Math.random() * this.maxCoinX;

        this.animate();
    }


    /**
     * This function plays the animation of the coin.
     * It changes the image of the coin every 200 milliseconds.
     */
    animate() {
        setInterval(() => {
            this.playAnimation(this.COIN_IMAGE);
        }, 200);

    }

    

}