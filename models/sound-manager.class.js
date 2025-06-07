class SoundManager {

    BACKGROUND_SOUND = new Audio('./audio/01_game/background/humorous_loop.mp3');
    COIN_SOUND_COLLECT = new Audio('./audio/01_game/coin/coins-sound-effect-220030.mp3');
    SWIRL_SOUND_COLLECT = new Audio('./audio/01_game/heart/energy-drink-effect-230559.mp3');
    BOSS_SOUND_HIT = new Audio('./audio/03_enemies/hit_boss.mp3');
    WINDMILL_SOUND = new Audio('./audio/01_game/wind/wind.mp3');
    GAME_SOUND_WIN = new Audio('./audio/01_game/win/level_win.mp3');


    /**
     * This function checks if the music is turned on. In this case starts the background sound of the game.
     * It also sets the volume, makes it loop and resets the current time to 0.
     * 
     */
    playBackgroundSound() {
        if (!musicOff) {
            this.BACKGROUND_SOUND.volume = 0.3;
            this.BACKGROUND_SOUND.loop = true;
            this.BACKGROUND_SOUND.currentTime = 0;
            this.BACKGROUND_SOUND.play();
        }
    }


    /**
     * This function checks if the music is turned off. 
     * In this case it pauses the background sound, else it plays the background sound.
     * The function is called when the music button is clicked.
     */
    checkMusic() {
        if (musicOff) {
            this.BACKGROUND_SOUND.pause();
        } else {
            this.BACKGROUND_SOUND.play();
        }
    }


    /**
     * This function plays the win sound after a delay of 1 second (starting after the explosion effect).
     * It checks if the sound is muted before playing the sound.
     */
    playWinSound() {
        if (!isMuted) {
            setTimeout(() => {
                this.GAME_SOUND_WIN.play();
            }, 1000);
        }
    }

}