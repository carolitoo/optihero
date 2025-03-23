class Cloud extends MoveableObject {
    y = -12;
    height = 400;
    width = 500;
    speed = 0.15;

    constructor() {
        super().loadImage('img/background/l3_clouds.png');

        this.x = Math.random() * 150;
        this.animate();
    }

    animate() {
        setInterval(() => {this.moveLeft(this.speed)}, 1000/60);
    }

}