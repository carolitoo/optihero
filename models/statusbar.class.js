class StatusBar extends DrawableObject {
    ratio = 1005/ 176;
    height = 35;
    width = this.height * this.ratio;
    counter;
    percentage;
    imageArray = [];

    STATUSBAR_IMAGE_ENERGY = [
        'img/statusbar/energy/energy_0.png',
        'img/statusbar/energy/energy_20.png',
        'img/statusbar/energy/energy_40.png',
        'img/statusbar/energy/energy_60.png',
        'img/statusbar/energy/energy_80.png',
        'img/statusbar/energy/energy_100.png'
    ];

    STATUSBAR_IMAGE_WIND = [
        'img/statusbar/wind/wind_0.png',
        'img/statusbar/wind/wind_20.png',
        'img/statusbar/wind/wind_40.png',
        'img/statusbar/wind/wind_60.png',
        'img/statusbar/wind/wind_80.png',
        'img/statusbar/wind/wind_100.png'
    ];

    constructor(type, initialValue, x, y) {
        super();
        let imageArray = this.checkStatusBarType(type);
        this.loadImages(imageArray);
        this.setPercentage(initialValue, type);
        this.x = x;
        this.y = y;   
    }


    setPercentage(percentage, type) { 
        this.percentage = percentage;
        let imageArray = this.checkStatusBarType(type);
        this.loadImages(imageArray);
        this.loadImage(imageArray[this.resolveImageIndex()]);
    }


    checkStatusBarType(type) {
        if (type == 'energy') {
            return this.STATUSBAR_IMAGE_ENERGY;
        } else if (type == 'wind') {
            return this.STATUSBAR_IMAGE_WIND;
        }
    }


    resolveImageIndex(){
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage >= 80) {
            return 4;
        } else if (this.percentage >= 60) {
            return 3;
        } else if (this.percentage >= 40) {
            return 2;
        } else if (this.percentage >= 20) {
            return 1;
        } else {
            return 0;
        }
    }

}