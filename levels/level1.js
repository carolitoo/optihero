let globalCounterId = 1;
let level1;

function initLevel() {
    level1 = new Level(
        [
            new Warrior(),
            new Warrior(),
            new Warrior(),
            new Shooter(),
            new Snail(),
            new Boss()
        ],
        [
            new Cloud()
        ],
        [
            new BackgroundObject('img/background/l1_sky.png', -720, 0, 480),
            new BackgroundObject('img/background/l2_mountains.png', -720, 0, 480),
            new BackgroundObject('img/background/l4_bg-ground01_edited_2.png', -720, 0, 480),
            new BackgroundObject('img/background/l5_bg-ground02.png', -720, 0, 480),
            // new BackgroundObject('img/background/l6_ground.png', -720, 0, 480),
            new BackgroundObject('img/background/l6_ground_test.png', -720, 0, 480),
    
            new BackgroundObject('img/background/l1_sky.png', 0, 0, 480),
            new BackgroundObject('img/background/l2_mountains.png', 0, 0, 480),
            new BackgroundObject('img/background/l4_bg-ground01_edited_2.png', 0, 0, 480),
            new BackgroundObject('img/background/l5_bg-ground02.png', 0, 0, 480),
            // new BackgroundObject('img/background/l6_ground.png', 0, 0, 480),
            new BackgroundObject('img/background/l6_ground_test.png', 0, 0, 480),
    
            new BackgroundObject('img/background/l1_sky.png', 720, 0, 480),
            new BackgroundObject('img/background/l2_mountains.png', 720, 0, 480),
            new BackgroundObject('img/background/l4_bg-ground01_edited_2.png', 720, 0, 480),
            new BackgroundObject('img/background/l5_bg-ground02.png', 720, 0, 480),
            // new BackgroundObject('img/background/l6_ground.png', 720, 0, 480),
            new BackgroundObject('img/background/l6_ground_test.png', 720, 0, 480),
    
            new BackgroundObject('img/background/l1_sky.png', 720*2, 0, 480),
            new BackgroundObject('img/background/l2_mountains.png', 720*2, 0, 480),
            new BackgroundObject('img/background/l4_bg-ground01_edited_2.png', 720*2, 0, 480),
            new BackgroundObject('img/background/l5_bg-ground02.png', 720*2, 0, 480),
            // new BackgroundObject('img/background/l6_ground.png', 720*2, 0, 480),
            new BackgroundObject('img/background/l6_ground_test.png', 720*2, 0, 480),
            
            new BackgroundObject('img/background/l1_sky.png', 720*3, 0, 480),
            new BackgroundObject('img/background/l2_mountains.png', 720*3, 0, 480),
            new BackgroundObject('img/background/l4_bg-ground01_edited_2.png', 720*3, 0, 480),
            new BackgroundObject('img/background/l5_bg-ground02.png', 720*3, 0, 480),
            // new BackgroundObject('img/background/l6_ground.png', 720*3, 0, 480),
            new BackgroundObject('img/background/l6_ground_test.png', 720*3, 0, 480)
        ],
        [
            new FixedObject('img/statusbar/coinCollector/coinCounterIcon.png', false, 'none', 620, 0, 105, 105),
            new FixedObject('img/statusbar/coinCollector/coinCounterSeparator.png',false, 'none', 582, 16, 80, 80),
            new FixedObject('img/statusbar/coinCollector/coinCounter_0.png', false, 'none', 528, 0, 115, 115),
            new FixedObject('img/game/navigation/maximize.png', true, 'window', 670, 428, 38, 38),
            new FixedObject('img/game/navigation/sound_on.png', true,'sound', 625, 428, 38, 38),
            new FixedObject('img/game/navigation/music_off.png', true, 'music', 580, 428, 38, 38)
        ],
        [
            new StatusBar('energy', 100, 20, 15),
            new StatusBar('wind', 0, 20, 55)
        ],
        [
            new PlayClock()
        ],
        [
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin()
        ],
        [
            new Swirl(),
            new Swirl(),
            new Swirl(),
            new Swirl(),
            new Swirl()
        ]
    );
}

