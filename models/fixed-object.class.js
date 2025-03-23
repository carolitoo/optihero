class FixedObject extends DrawableObject {

    fixedObjectId;
 
    COIN_COUNTER_IMAGE = [
        'img/statusbar/coinCollector/coinCounter_0.png',
        'img/statusbar/coinCollector/coinCounter_1.png',
        'img/statusbar/coinCollector/coinCounter_2.png',
        'img/statusbar/coinCollector/coinCounter_3.png',
        'img/statusbar/coinCollector/coinCounter_4.png',
        'img/statusbar/coinCollector/coinCounter_5.png',
        'img/statusbar/coinCollector/coinCounter_6.png',
        'img/statusbar/coinCollector/coinCounter_7.png',
        'img/statusbar/coinCollector/coinCounter_8.png',
        'img/statusbar/coinCollector/coinCounter_9.png',
        'img/statusbar/coinCollector/coinCounter_10.png',
        'img/statusbar/coinCollector/coinCounter_11.png',
        'img/statusbar/coinCollector/coinCounter_12.png',
        'img/statusbar/coinCollector/coinCounter_13.png',
        'img/statusbar/coinCollector/coinCounter_14.png',
        'img/statusbar/coinCollector/coinCounter_15.png',
        'img/statusbar/coinCollector/coinCounter_16.png',
        'img/statusbar/coinCollector/coinCounter_17.png',
        'img/statusbar/coinCollector/coinCounter_18.png',
        'img/statusbar/coinCollector/coinCounter_19.png',
        'img/statusbar/coinCollector/coinCounter_20.png'
    ];



    constructor(imagePath, x, y, width, height) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.fixedObjectId = globalCounterId++;
    }


    increaseCoinCounter(amountOfCoins) {
        this.loadImage(`img/statusbar/coinCollector/coinCounter_${amountOfCoins}.png`);
    }


}

