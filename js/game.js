let canvas;
let world;
let keyboard = new Keyboard();

let language = 'DE';
let isMuted = !true;
let musicOff = !true;



function init() {
    initLevel();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    }


function startGame() {
    document.getElementById('start-screen').classList.add('d-none');
    document.getElementById('canvas').classList.remove('d-none');
    init();
}


function selectLanguage(selectedLanguage) {
    language = selectedLanguage;
}


function toggleSound() {
    let icon = document.getElementById('toggle-sound-start');
    isMuted = !isMuted;
    if (isMuted) {
        icon.src = 'img/game/navigation/sound_off_x_green.png';
    } else {
        icon.src = 'img/game/navigation/sound_on_green.png';
    }
}


function toggleMusic() {
    let icon = document.getElementById('toggle-music-start');
    musicOff = !musicOff;
    if (musicOff) {
        icon.src = 'img/game/navigation/music_off_green.png';
    } else {
        icon.src = 'img/game/navigation/music_on_green.png';
    }  
}


function toggleFullScreen() {
    let icon = document.getElementById('toggle-fullscreen');

    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
        icon.src = 'img/game/navigation/minimize_green.png';
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
            icon.src = 'img/game/navigation/maximize_green.png';
        }
    }
}



function checkOrientation() {
    if (window.matchMedia("(orientation: portrait)").matches && window.innerWidth < 670) {
    document.getElementById('orientation-warning').classList.remove('d-none');}
    else [
        document.getElementById('orientation-warning').classList.add('d-none')
    ]
}


window.addEventListener('resize', checkOrientation); 


window.addEventListener('keydown', (e) => {
    checkKey(e.code);
});


window.addEventListener('keyup', () => {
    unsetKeyboard();
});


function checkKey(code) {
    switch (code) {
        // case 'ArrowUp':
        //     keyboard.UP = true;
        //     break;
        case 'ArrowLeft':
            keyboard.LEFT = true;
            break;
        case 'ArrowRight':
            keyboard.RIGHT = true;
            break;
        case 'Space':
            keyboard.SPACE = true;
            break;
        case 'KeyD':
            keyboard.D = true;
            break;
    }
}


function unsetKeyboard() {
    // keyboard.UP = false;
    keyboard.LEFT = false;
    keyboard.RIGHT = false;
    keyboard.SPACE = false;
    keyboard.D = false;
}


function stopGame() {
    clearAllIntervals();
    world.level.playClock[0].stopClock();
}


function clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
  }




