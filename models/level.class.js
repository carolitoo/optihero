class Level {
    enemies;
    clouds;
    backgroundObjects;
    fixedObjects;
    statusBars;
    playClock;
    coins;
    swirls;
    levelEndX = 720 * 5 + 485;

    constructor(enemies, clouds, backgroundObjects,  fixedObjects, statusBars, playClock, coins, swirls) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.fixedObjects = fixedObjects;
        this.statusBars = statusBars;
        this.playClock = playClock;
        this.coins = coins;
        this.swirls = swirls;
    }
}