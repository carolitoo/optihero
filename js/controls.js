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
window.addEventListener('keyup', () => {
    unsetKeyboard();
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
 * This function binds the touch events to the mobile buttons.
 * It sets the corresponding property in the keyboard object to true when the button is pressed and to false when the button is released.
 * It also prevents the default behaviour to ensure there are no unwanted side effects (e.g. page scrolling or double events).
 */
function bindMobileButtons() {

    document.getElementById('mobile-left').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.LEFT = true;
    });
    document.getElementById('mobile-left').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.LEFT = false;
    });

    document.getElementById('mobile-right').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.RIGHT = true;
    });
    document.getElementById('mobile-right').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.RIGHT = false;
    });

    document.getElementById('mobile-jump').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.SPACE = true;
    });

    document.getElementById('mobile-jump').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.SPACE = false;
    });

    document.getElementById('mobile-throw').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.D = true;
    });

    document.getElementById('mobile-throw').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.D = false;
    });
}