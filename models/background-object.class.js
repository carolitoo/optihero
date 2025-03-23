class BackgroundObject extends MoveableObject {
    width = 720;

    constructor(imagePath, x, y, height) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = y;
        this.height = height;
    }

}