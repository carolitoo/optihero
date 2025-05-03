let canvas;
let world;
let keyboard = new Keyboard();

let language = 'DE';
let isMuted = !true;
let musicOff = !true;

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
    await renderCharacterSelection();
}


/**
 * This function initializes the game by setting up the level and creating a new world instance.
 * It also binds mobile buttons for touch controls and sets a timeout to hide the loading screen and show the main game screen.
 */
function init() {
    initLevel();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    bindMobileButtons();

    setTimeout(() => {
        document.getElementById('loading-screen').style.display = 'none';
        document.getElementById('wrapper-fullscreen').style.display = 'flex';
        document.getElementById('mobile-control-panel').classList.remove('d-none');
      }, 4000);

    }


/**
 * This function initiates the game by replacing the start or end screen with the canvas/ game screen.
 * It also starts a countdown and initializes the game.
 */
function startGame() {
    countdownStart();
    document.getElementById('start-screen').classList.add('d-none');
    document.getElementById('end-screen').classList.add('d-none');
    document.getElementById('canvas').classList.remove('d-none');
    init();
}


/**
 * This function starts a countdown before the game begins.
 */
function countdownStart() {
    document.getElementById('loading-screen').style.display = 'flex';
    document.getElementById('wrapper-fullscreen').style.display = 'none';
    document.getElementById('loading-spinner').classList.add('d-none');

    COUNTDOWN_SOUND.play();
    document.getElementById('loading-text').innerHTML = '3';
    setTimeout(() => {document.getElementById('loading-text').innerHTML = '2';}, 1000);
    setTimeout(() => {document.getElementById('loading-text').innerHTML = '1';}, 2000);
    // setTimeout(() => {document.getElementById('loading-text').innerHTML = 'Good luck!';}, 3000);
    if (language === 'DE') {
        setTimeout(() => {document.getElementById('loading-text').innerHTML = 'Viel Erfolg!';}, 3000);
    }
    if (language === 'EN') {
        setTimeout(() => {document.getElementById('loading-text').innerHTML = 'Good luck!';}, 3000);
    }
}




/**
 * This function is called when the game is restarted.
 * It stops the current game, resets the level and starts a new game.
 */
function restartGame() {
    world.WINDMILL_SOUND.pause();
    startGame();
}


/**
 * This function stops the game and returns to the start screen.
 * It is called when the player loses or wins the game.
 * The current settings are retained (e.g. sound, music, fullscreen).
 */
function returnToStart() {
    stopGame();
    document.getElementById('start-screen').classList.remove('d-none');
    document.getElementById('end-screen').classList.add('d-none');
    document.getElementById('canvas').classList.add('d-none');
    selectLanguage(language);
    // SOUND-, MUSIK- UND FULLSCREEN-EINSTELLUNGEN ÜBERNEHMEN
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
 * This function toggles the sound on and off.
 * It changes the icons of the sound buttons accordingly.
 * It is called when the player clicks on the sound button on the start screen or in the game.
 * 
 */
function toggleSound() {
    let icon = document.getElementById('toggle-sound-start');
    let iconGame = document.getElementById('toggle-sound-game');

    isMuted = !isMuted;

    if (isMuted) {
        icon.src = 'img/game/navigation/sound_off_x_green.png';
        iconGame.src = './img/game/navigation/sound_off_x.png';
    } else {
        icon.src = 'img/game/navigation/sound_on_green.png';
        iconGame.src = './img/game/navigation/sound_on.png';
    }
}


/**
 * This function toggles the music on and off.
 * It changes the icons of the music buttons accordingly.
 * It is called when the player clicks on the sound button on the start screen.
 * 
 */
function toggleMusic() {
    let icon = document.getElementById('toggle-music-start');
    let iconGame = document.getElementById('toggle-music-game');

    musicOff = !musicOff;

    if (musicOff) {
        icon.src = 'img/game/navigation/music_off_green.png';
        iconGame.src = './img/game/navigation/music_off.png';
    } else {
        icon.src = 'img/game/navigation/music_on_green.png';
        iconGame.src = './img/game/navigation/music_on.png';
    }  
}


/**
 * This function toggles the music on and off.
 * It changes the icons of the music buttons accordingly.
 * It is called when the player clicks on the sound button within the game.
 * 
 */
function toggleMusicInGame() { 
    let icon = document.getElementById('toggle-music-start');
    let iconGame = document.getElementById('toggle-music-game');

    musicOff = !musicOff;

    if (musicOff) {
        icon.src = 'img/game/navigation/music_off_green.png';
        iconGame.src = './img/game/navigation/music_off.png';
        world.BACKGROUND_SOUND.pause();
    } else {
        icon.src = 'img/game/navigation/music_on_green.png';
        iconGame.src = './img/game/navigation/music_on.png';
        world.BACKGROUND_SOUND.play();
    }  
}


/**
 * This function toggles the fullscreen mode on and off.
 * It changes the icons of the fullscreen buttons accordingly.
 * It is called when the player clicks on the fullscreen button on the start screen or in the game.
 */
function toggleFullScreen() {
    let icon = document.getElementById('toggle-fullscreen');
    let iconGame = document.getElementById('toggle-fullscreen-game');
    
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
        icon.src = 'img/game/navigation/minimize_green.png';
        iconGame.src = './img/game/navigation/minimize.png';
    } else if (document.fullscreenElement) {
        document.exitFullscreen();
        icon.src = 'img/game/navigation/maximize_green.png';
        iconGame.src = './img/game/navigation/maximize.png';
        }
}


/**
 * This function is called when the player clicks on the instructions button on the start screen.
 * It opens an overlay containing instructions for the game.
 */
function openInstructions() {
    document.getElementById('instructions').classList.remove('d-none');
}


/**
 * This function is called when the player clicks on the controls button on the start screen.
 * It opens an overlay explaining how the controls have to be used in the game.
 */
function openControls() {
    document.getElementById('controls').classList.remove('d-none');
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
    if (window.matchMedia("(orientation: portrait)").matches && window.innerWidth < 670) {
    document.getElementById('orientation-warning').classList.remove('d-none');}
    else [
        document.getElementById('orientation-warning').classList.add('d-none')
    ]
}


/**
 * This function adds an event listener and calls the checkOrientation function when the window is resized.
 */
window.addEventListener('resize', checkOrientation); 


/**
 * This function stops the game.
 * It also stops the background music and windmill sound.
 */
function stopGame() {
    clearAllIntervals();
    world.level.playClock[0].stopClock();
    world.BACKGROUND_SOUND.pause();
    world.WINDMILL_SOUND.pause();
}


/**
 * This function clears all intervals that are set in the game.
 * It is used to stop all animations and timers when the game is stopped.
 * It iterates through all possible interval IDs (1 to 9999) and clears them.
 */
function clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
  }


/**
 * 
 * This function is called when the game ends (win or lose) and shows the end screen. 
 * In case of a win it checks if the player has reached a top score that can be entered (to be implemented).
 * 
 * @param {string} result - The result of the game ('win' or 'lose').
 */
function showEndScreen(result) {
    document.getElementById('end-screen').classList.remove('d-none');
    document.getElementById('mobile-control-panel').classList.add('d-none');
    if (result === 'win') {
        // ggf. auf Top5-Wert prüfen, sonst ausgrauen
        document.getElementById('enter-score-button').classList.remove('d-none');
    } else {
        document.getElementById('enter-score-button').classList.add('d-none');
    }
}


