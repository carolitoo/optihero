let canvas;
let world;
let keyboard = new Keyboard();

let language = 'DE';
let isMuted = !true;
let musicOff = !true;
let gameStarted = false;

let COUNTDOWN_SOUND = new Audio('./audio/01_game/countdown/game-countdown.mp3');


/**
 * This function is called when the page is loaded. 
 * It sets a timeout to hide the loading screen and shows the intro screen after 4 seconds.
 */
document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
      document.getElementById('loading-screen').style.display = 'none';
      document.getElementById('wrapper-fullscreen').style.display = 'flex';
    }, 4000);
  });


/**
 * This function is called when the homepage is loaded.
 * It checks the orientation of the device and displays a info in case of potrait mode.
 * It calls the function to render the character based on the current selection of character.
 */
async function renderStartScreen() {
    checkOrientation();
    setSoundSettings();
    await renderCharacterSelection();
}


/**
 * This function gets the sound settings from localStorage and sets the global variables 'isMuted' and 'musicOff'.
 * It calls the functions to set the sound and music icons based on the current settings.
 */
function setSoundSettings() {
    isMuted = localStorage.getItem('soundIsMuted') === 'true';
    musicOff = localStorage.getItem('musicIsOff') === 'true';
    setSoundIcons();
    setMusicIcons();
}


/**
 * This function initializes the game by setting up the level and creating a new world instance.
 * It also binds mobile buttons for touch controls and sets a timeout to hide the loading screen and show the main game screen.
 * The function adds an event listener and calls the checkOrientation function when the window is resized.
 */
function init() {
    initLevel();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    checkDisplayMobileControlPanel();

    setTimeout(() => {
        document.getElementById('loading-screen').style.display = 'none';
        document.getElementById('wrapper-fullscreen').style.display = 'flex';
        document.getElementById('mobile-control-panel').classList.remove('d-none');
        window.addEventListener('resize', checkOrientation); 
      }, 4000);

    }


/**
 * This function initiates the game by replacing the start or end screen with the canvas/ game screen.
 * It also starts a countdown and initializes the game.
 */
async function startGame() {
    countdownStart();
    document.getElementById('start-screen').classList.add('d-none');
    document.getElementById('end-screen').classList.add('d-none');
    document.getElementById('canvas').classList.remove('d-none');
    gameStarted = true;
    init();
}


/**
 * This function starts a countdown before the game begins.
 * It displays a loading screen with a countdown from 3 to 1 and plays a sound if the sound is not muted.
 */
function countdownStart() {
    document.getElementById('loading-screen').style.display = 'flex';
    document.getElementById('wrapper-fullscreen').style.display = 'none';
    document.getElementById('loading-spinner').classList.add('d-none');

    if (!isMuted) {
       COUNTDOWN_SOUND.play();
    }
    document.getElementById('loading-text').innerHTML = '3';
    setTimeout(() => {document.getElementById('loading-text').innerHTML = '2';}, 1000);
    setTimeout(() => {document.getElementById('loading-text').innerHTML = '1';}, 2000);
    if (language === 'DE') {
        setTimeout(() => {document.getElementById('loading-text').innerHTML = 'Viel Erfolg!';}, 3000);
    }
    if (language === 'EN') {
        setTimeout(() => {document.getElementById('loading-text').innerHTML = 'Good luck!';}, 3000);
    }
}


/**
 * This function stops the play clock and the background sound.
 * It also sets the camera to be frozen and removes all items from the level.
 * It updates the time score with the time passed by the play clock.
 */
function stopLevel() {
    world.level.playClock[0].stopClock();
    world.sound.BACKGROUND_SOUND.pause();
    world.cameraFrozen = true;
    world.timeScore = world.level.playClock[0].secondsPassed;
    world.removeLevelItems();
}


/**
 * This function handles the win condition of the game.
 * It stops the level, plays the win sound and after a short delay (for the explosion) replaces the boss with windmills and shows the win banner.
 * It also shows the end screen after a delay of 5 seconds.
 * 
 * @param {object} enemy - The enemy that is replaced by windmills (normally the boss).
 */
function win(enemy) {
    stopLevel();
    world.sound.playWinSound();
   
    setTimeout(() => {
        showBanner('win',language);
        enemy.replaceBossByWindmills();
    }, 400);

    setTimeout(() => {
        showEndScreen('win', world.timeScore, world.coins);
    }, 5000);
}


/**
 * This function shows the end banner after the game is finished.
 * It creates a new FixedObject with the image of the end banner and adds it to the endBanner array.
 * It takes the status (win or lose) and the language as parameters to determine which image to show.
 * 
 * @param {string} status - The status of the game (win or lose).
 * @param {string} language - The language of the game (DE or EN).
 */
function showBanner(status, language) {
    world.endBanner.push(new FixedObject(`img/game/end/${status}_${language}.png`, false, 'none', 200, 150, 400, 100));
}

/**
 * This function is called when the game is restarted.
 * It stops the current game, resets the level and starts a new game.
 */
function restartGame() {
    world.sound.WINDMILL_SOUND.pause();
    startGame();
}


/**
 * This function stops the game and returns to the start screen.
 * It is called when the player loses or wins the game.
 * The current settings are retained (e.g. sound, music, fullscreen).
 * It also ensures that the title is displayed again if the window height is greater than 630px (relevant for mobile devices).
 */
function returnToStart() {
    stopGame();
    document.getElementById('start-screen').classList.remove('d-none');
    document.getElementById('end-screen').classList.add('d-none');
    document.getElementById('canvas').classList.add('d-none');
    gameStarted = false;
    if (window.innerHeight > 630) {
        document.getElementById('title').style.display = 'block';
    }
    selectLanguage(language);
}


/**
 * This function is called when the player selects a language.
 * It sets the selected language to the global variable 'language'.
 * 
 * @param {string} selectedLanguage - The selected language ('DE' or 'EN')
 */
function selectLanguage(selectedLanguage) {
    language = selectedLanguage;
}


/**
 * This function toggles the sound on and off by changing the global variable 'isMuted'.
 * It also saves the current state of the sound in localStorage so that it persists across sessions.
 * It calls a function to change the icons of the sound buttons accordingly (including hover effect).
 * It is called when the player clicks on the sound button on the start screen or in the game.
 */
function toggleSound() {
    isMuted = !isMuted;
    localStorage.setItem('soundIsMuted', isMuted);
    setSoundIcons();
}


/**
 * This function sets the icons for the sound buttons on the start screen and in the game.
 * It changes the icon source based on whether the sound is muted or not.
 */
function setSoundIcons() {
    let icon = document.getElementById('toggle-sound-start');
    let iconGame = document.getElementById('toggle-sound-game');

    if (isMuted) {
        setIconSources(icon, './img/game/navigation/sound_off_x_turquoise.png', './img/game/navigation/sound_off_x_turquoise_hover.png')
        setIconSources(iconGame, './img/game/navigation/sound_off_x.png', './img/game/navigation/sound_off_x_hover.png')
    } else {
        setIconSources(icon, './img/game/navigation/sound_on_turquoise.png', './img/game/navigation/sound_on_turquoise_hover.png')
        setIconSources(iconGame, './img/game/navigation/sound_on.png', './img/game/navigation/sound_on_hover.png')
    }

}


/**
 * This function toggles the music on and off by changing the global variable 'musicOff'.
 * It also saves the current state of the music in localStorage so that it persists across sessions.
 * It calls a function to change the icons of the music buttons accordingly (including hover effect).
 * It is called when the player clicks on the music button on the start screen.
 */
function toggleMusic() {
    musicOff = !musicOff;
    localStorage.setItem('musicIsOff', musicOff);
    setMusicIcons();
}


/**
 * This function toggles the music on and off by changing the global variable 'musicOff'.
 * It also saves the current state of the music in localStorage so that it persists across sessions.
 * It calls a function to change the icons of the music buttons accordingly (including hover effect).
 * It is called when the player clicks on the sound button within the game.
 * The function also plays or pauses the background music depending on the current state.
 */
function toggleMusicInGame() { 
    musicOff = !musicOff;
    localStorage.setItem('musicIsOff', musicOff);

    if (musicOff) {
        world.sound.BACKGROUND_SOUND.pause();
    } else {
        world.sound.BACKGROUND_SOUND.play();
    }  
    setMusicIcons();
}


/**
 * This function sets the icons for the music buttons on the start screen and in the game.
 * It changes the icon source based on whether the sound is muted or not.
 */
function setMusicIcons() {
    let icon = document.getElementById('toggle-music-start');
    let iconGame = document.getElementById('toggle-music-game');

    if (musicOff) {
        setIconSources(icon, './img/game/navigation/music_off_turquoise.png', './img/game/navigation/music_off_turquoise_hover.png')
        setIconSources(iconGame, './img/game/navigation/music_off.png', './img/game/navigation/music_off_hover.png')
    } else {
        setIconSources(icon, './img/game/navigation/music_on_turquoise.png', './img/game/navigation/music_on_turquoise_hover.png')
        setIconSources(iconGame, './img/game/navigation/music_on.png', './img/game/navigation/music_on_hover.png')
    }
}


/**
 * This function toggles the fullscreen mode on and off.
 * It calls a function to change the icons of the fullscreen buttons accordingly (including hover effect).
 * It is called when the player clicks on the fullscreen button on the start screen or in the game.
 * It also checks if the device is a mobile device and sets the properties accordingly.
 * The function "setPropertiesForMobile()"" is called twice because sometimes the fullscreen mode is not applied immediately on mobile devices).
 */
function toggleFullScreen() {
    let icon = document.getElementById('toggle-fullscreen');
    let iconGame = document.getElementById('toggle-fullscreen-game');
    
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
        setIconSources(icon, './img/game/navigation/minimize_turquoise.png', './img/game/navigation/minimize_turquoise_hover.png')
        setIconSources(iconGame, './img/game/navigation/minimize.png', './img/game/navigation/minimize_hover.png')
    } else if (document.fullscreenElement) {
        document.exitFullscreen();
        setIconSources(icon, './img/game/navigation/maximize_turquoise.png', './img/game/navigation/maximize_turquoise_hover.png')
        setIconSources(iconGame, './img/game/navigation/maximize.png', './img/game/navigation/maximize_hover.png')
    }
    
    if (isMobileDevice()) {
        setPropertiesForMobile();
        setTimeout(() => {
            setPropertiesForMobile();
        }, 1500);
    }  
}


/**
 * This function sets the sources of the icons (including source for hover effect).
 * It changes the icon when the mouse is over it and resets it when the mouse leaves.
 * 
 * @param {string} element - The id of the icon element.
 * @param {string} normalSrc - The normal source of the icon.
 * @param {string} hoverSrc  - The source of the icon when hovered.
 */
function setIconSources(element, normalSrc, hoverSrc) {
    element.src = normalSrc;
    element.onmouseover = function() { this.src = hoverSrc; };
    element.onmouseout = function() { this.src = normalSrc; };
}


/**
 * This function is called when the player clicks on a button to open an overlay (e.g. instructions, controls).
 * 
 * @param {string} id - The id of the overlay to be opened. 
 */
function openOverlay(id) {
    document.getElementById(id).classList.remove('d-none');
}


/**
 * This function closes the overlay that is currently opened.
 * 
 * @param {string} id - The id of the overlay to be closed. 
 */
function closeOverlay(id) {
    document.getElementById(id).classList.add('d-none');
}


/**
 * This function checks the orientation of the device and displays a warning if it is in portrait mode.
 * It also checks the width of the window to determine if the warning should be displayed.
 * It is called when the window is resized or the start page is loaded.
 */  
function checkOrientation() {
    if (window.matchMedia("(orientation: portrait)").matches) {
    document.getElementById('orientation-warning').classList.remove('d-none');
    document.getElementById('container-game').classList.add('d-none');
    }
    else {
        document.getElementById('orientation-warning').classList.add('d-none');
        document.getElementById('container-game').classList.remove('d-none');
    }
}


/**
 * This function stops the game.
 * It also stops the background music and windmill sound.
 */
function stopGame() {
    clearAllIntervals();
    world.level.playClock[0].stopClock();
    world.sound.BACKGROUND_SOUND.pause();
    world.sound.WINDMILL_SOUND.pause();
}


/**
 * This function clears all intervals that are set in the game by iterating through all possible interval IDs (1 to 9999).
 * It is used to stop all animations and timers when the game is stopped.
 */
function clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
  }


/**
 * 
 * This function is called when the game ends (win or lose) and shows the end screen. 
 * In case of a win it checks if the player has reached a top score that can be entered.
 * 
 * @param {string} result - The result of the game ('win' or 'lose').
 * @param {number} timeScore - The time score of the game (in seconds).
 * @param {number} coins - The number of coins collected in the game.
 */
async function showEndScreen(result, timeScore, coins) {
    document.getElementById('end-screen').classList.remove('d-none');
    document.getElementById('mobile-control-panel').classList.add('d-none');
    if (result === 'win') {
        await checkTopScore(timeScore, coins);
        if (isTopScore) {
            setInputTopScoreElement(timeScore, coins);
            document.getElementById('enter-top-score').classList.remove('d-none');
        } 
    }
}


