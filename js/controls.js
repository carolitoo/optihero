/**
 * This event listener checks if the pointer is coarse (e.g. touch screen).
 * It ensures that the mobile control panel is displayed correctly also on simulating a mobile device (e.g. in a browser/ dev tools). 
 */
const mqCoarse = window.matchMedia('(pointer: coarse)');
mqCoarse.addEventListener('change', checkDisplayMobileControlPanel);


/**
 * This event listener is for the keyboard controls of the game.
 * It checks if a key is pressed and if so it calls the function to check if the pressed key is relevant for the game.
 * The event listener won't call the function while entering data into an input field.
 */
window.addEventListener('keydown', (e) => {
    if (document.activeElement.tagName === "INPUT") {
        return;
      }
    checkKey(e.code);
});


/**
 * This event listener is for the keyboard controls of the game.
 * It checks if a key is released and if so it calls the function to unset the pressed key.
*/
window.addEventListener('keyup', (e) => {
    unsetKey(e.code);
});


/**
 *  This function checks which key is pressed and sets the corresponding property in the keyboard object to true.
 * 
 * @param {string} code - The code of the pressed key
 */
function checkKey(code) {
    switch (code) {
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


/**
 * This function unsets a single key by setting the corresponding property in the keyboard object to false.
 * 
 * @param {string} code - The code of the released key 
 */
function unsetKey(code) {
    switch (code) {
        case 'ArrowLeft':
            keyboard.LEFT = false;
            break;
        case 'ArrowRight':
            keyboard.RIGHT = false;
            break;
        case 'Space':
            keyboard.SPACE = false;
            break;
        case 'KeyD':
            keyboard.D = false;
            break;
    }
}


/**
 * This function unsets the pressed keys by setting all properties in the keyboard object to false.
 * It is called when the key is released.
 */
function unsetKeyboard() {
    keyboard.LEFT = false;
    keyboard.RIGHT = false;
    keyboard.SPACE = false;
    keyboard.D = false;
}


/**
 * This function checks if the user is using a mobile device and displays the mobile control panel accordingly.
 * If also binds the touch events to the buttons (if needed).
 * It is called when the window is resized, the page is loaded or the pointer is changed.
 */
function checkDisplayMobileControlPanel() {
    if (isMobileDevice() || mqCoarse.matches) {
        document.getElementById('mobile-control-panel-left').style.display = 'flex';
        document.getElementById('mobile-control-panel-side').style.display = 'flex';
        document.getElementById('mobile-control-panel').classList.add('mobile-control-button-mob-device');
        document.getElementById('mobile-control-panel').addEventListener('dblclick', e => e.preventDefault());
        setPropertiesForMobile();
        bindMobileButtons();
    } else {
        document.getElementById('mobile-control-panel-left').style.display = 'none';
        document.getElementById('mobile-control-panel-side').style.display = 'none';
        document.getElementById('mobile-control-panel').classList.remove('mobile-control-button-mob-device');
        resetPropertiesForDesktop();
    }
}


/**
 * This function sets the properties for the mobile device.
 * It ensures that the canvas takes up the full height and width of the viewport.
 * It also sets the width and height variables accordingly so that various elements (e.g. buttons) can be dimensioned correctly. 
 */
function setPropertiesForMobile() {
    document.getElementById('canvas').style.height = '100vh';
    document.getElementById('canvas').style.width = '100%';
    if (gameStarted) {
        document.getElementById('title').style.display = 'none';
    }
    let mobileWidth = window.innerWidth; 
    document.querySelector(':root').style.setProperty('--width-canvas', mobileWidth + 'px');

    let mobileHeight = window.innerHeight;
    document.querySelector(':root').style.setProperty('--height-canvas', mobileHeight + 'px');
}


/**
 * This function ensures that the properties are reseted correctly for desktop devices.
 */
function resetPropertiesForDesktop() {
    if (window.innerWidth >= 720) {
        document.querySelector(':root').style.setProperty('--width-canvas', '720px');
        document.getElementById('canvas').style.width = '720px';
    } else {
        document.querySelector(':root').style.setProperty('--width-canvas', '100%');
        document.getElementById('canvas').style.width = '100%';
    }

    if (window.innerHeight >= 480) {
        document.querySelector(':root').style.setProperty('--height-canvas', '480px');
        document.getElementById('canvas').style.height = '480px';
    } else {    
        document.querySelector(':root').style.setProperty('--height-canvas', '100vh');
        document.getElementById('canvas').style.height = '100vh';
    }

    if (window.innerHeight >= 630) {
        document.getElementById('title').style.display = 'flex';
    }
}


/**
 * This function checks if the user is on a mobile device.
 * It returns true if the user is on a mobile device, false otherwise.
 * 
 * @returns {boolean} - True if the user is on a mobile device
 */
function isMobileDevice() {
  const ua = navigator.userAgent.toLowerCase();
  const isAndroid = ua.includes("android");
  const isIOS = ua.includes("iphone") || ua.includes("ipad") || ua.includes("ipod") || 
                (navigator.userAgent.includes("Macintosh") && 'ontouchend' in document);

  const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 1;

  return hasTouch && (isAndroid || isIOS);
}


/**
 * This function binds the touch events to the mobile buttons.
 * It sets the corresponding property in the keyboard object to true when the button is pressed and to false when the button is released.
 * It also prevents the default behaviour to ensure there are no unwanted side effects (e.g. page scrolling or double events).
 */
function bindMobileButtons() {

    document.getElementById('mobile-left').addEventListener('touchstart', (e) => {
          if (e.cancelable) {
            e.preventDefault();
        }
        keyboard.LEFT = true;
    });
    document.getElementById('mobile-left').addEventListener('touchend', (e) => {
          if (e.cancelable) {
            e.preventDefault();
        }
        keyboard.LEFT = false;
    });

    document.getElementById('mobile-right').addEventListener('touchstart', (e) => {
          if (e.cancelable) {
            e.preventDefault();
        }
        keyboard.RIGHT = true;
    });
    document.getElementById('mobile-right').addEventListener('touchend', (e) => {
          if (e.cancelable) {
            e.preventDefault();
        }
        keyboard.RIGHT = false;
    });

    document.getElementById('mobile-jump').addEventListener('touchstart', (e) => {
         if (e.cancelable) {
            e.preventDefault();
        }
        keyboard.SPACE = true;
    });

    document.getElementById('mobile-jump').addEventListener('touchend', (e) => {
          if (e.cancelable) {
            e.preventDefault();
        }
        keyboard.SPACE = false;
    });

    document.getElementById('mobile-throw').addEventListener('touchstart', (e) => {
         if (e.cancelable) {
            e.preventDefault();
        }
        keyboard.D = true;
    });

    document.getElementById('mobile-throw').addEventListener('touchend', (e) => {
          if (e.cancelable) {
            e.preventDefault();
        }
        keyboard.D = false;
    });
}