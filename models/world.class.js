class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    cameraFrozen = false;
    coins = 0;
    valueOfCoin = 20;
    swirls = 0;
    valueOfSwirl = 20;

    effectObjects = [];
    thrownObjects = [];
    endBanner = [];
    canThrow = true;

    timeScore = 0;
    
    BACKGROUND_SOUND = new Audio('./audio/01_game/background/humorous_loop.mp3');
    COIN_SOUND_COLLECT = new Audio('./audio/01_game/coin/coins-sound-effect-220030.mp3');
    SWIRL_SOUND_COLLECT = new Audio('./audio/01_game/heart/energy-drink-effect-230559.mp3');
    BOSS_SOUND_HIT = new Audio('./audio/03_enemies/hit_boss.mp3');
    WINDMILL_SOUND = new Audio('./audio/01_game/wind/wind.mp3');
    GAME_SOUND_WIN = new Audio('./audio/01_game/win/level_win.mp3');

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    /**
     * This function sets the world for the character and starts the background sound after a delay (because of the countdown).
     * It also sets the clickable objects and implements the event listener for clicks on the canvas.
     * It is called when the world is created.
     */
    setWorld() {
        this.character.world = this;
        setTimeout(() => {
            this.playBackgroundSound();
        }, 4000);
        this.setClickableObjects();
        this.implementEventListener();
    }


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
     * This function sets the clickable objects in the level (e.g. sound, fullscreen).
     * It iterates over all fixed objects in the level and checks if they are clickable.
     * If they are, it sets their initial values based on the parameters/ current selection.
     */
    setClickableObjects() {
        this.level.fixedObjects.forEach(object => {
            if (object.clickable) {
                object.setInitialValue(object.handler);
            }
        });
    }


    /**
     * This function implements an event listener for clicks on the canvas.
     * * It listens for click events and calls the checkClickedObject function to check if an clickable object was clicked.
     */
    implementEventListener() {
        this.canvas.addEventListener('click', (event) => {
            this.checkClickedObject(event);
          });
    }


    /**
     * This gets the mouse coordinates relative to the canvas and checks if any of the fixed clickable objects in the level are clicked.
     * In this case it calls the handleClick function of the object to perform the corresponding action (e.g. toggle fullscreen, sound or music).
     * It also checks if the music button was clicked and calls the checkMusic function to handle the music state.
     * 
     * @param {object} event - The click event object containing the mouse coordinates.
     */
    checkClickedObject(event) {
        const rectCanvas = canvas.getBoundingClientRect();
        const mouseX = event.clientX - rectCanvas.left;
        const mouseY = event.clientY - rectCanvas.top;

        this.level.fixedObjects.forEach(object => {
            if (object.isClicked(mouseX, mouseY) && object.clickable) {
              object.handleClick(object.handler);
              if (object.handler === 'music') {
                this.checkMusic();
              }
            }
        });
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
      * This function starts the game loop and the play clock (after the countdown has finished).
      */
    run() {
        setTimeout(() => {
            setInterval(() => {
                this.checkCollisions();
                this.checkThrowObjects();
                this.checkFirstContact();
            }, 50);
            this.level.playClock[0].startClock();
        }, 4000);
    }


    /**
    * This function checks if the first contact with the boss or a shooter has been made.
    * If the first contact with a shooter has been made, the loop for shooting bubbles is started.
    * // GGF: PRÜFEN //
    */
    checkFirstContact() {
        this.level.enemies.forEach((enemy) => {
            if ((enemy.x + enemy.adjustFrameX) - (this.character.x + this.character.adjustedWidth + this.character.adjustFrameX) < 450 && (enemy instanceof Boss || enemy instanceof Shooter)) {
                enemy.hadFirstContact = true;
                if (enemy instanceof Shooter) {
                    enemy.checkIfLoopHasStarted();
                }
                if (enemy instanceof Boss) {
                    enemy.bossFirstContactAnimation();
                }
            }

        })
    }


    /**
     * This function checks if the character throws a swirl.
     * It checks if the player presses the 'D' key and a swirl to throw is available.
     * If so, it creates a new ThrowableObject and adds it to the thrownObjects array (x-position depending on the direction the character is facing).
     * It also reduces the number of swirls, updates the corresponding status bar and calls the function to prevent the character from instantly throwing the next swirl.
     */
    checkThrowObjects() {
        if (this.keyboard.D && this.swirls >= this.valueOfSwirl && this.canThrow) {
            let wind;
            if (!this.character.otherDirection) {
                wind = new ThrowableObject(this.character.x + this.character.adjustFrameX + 75, this.character.y + this.character.adjustFrameY);
            } else if (this.character.otherDirection) {
                wind = new ThrowableObject(this.character.x + this.character.adjustFrameX -75, this.character.y + this.character.adjustFrameY);
            }
            this.thrownObjects.push(wind);
            this.swirls -= this.valueOfSwirl;
            this.level.statusBars[1].setPercentage(this.swirls, 'wind');
            this.blockThrow();
        }
    }


    /**
     * This function blocks the throwing of swirls for 1 second.
     */
    blockThrow() {
        this.canThrow = false;
        setTimeout(() => {
            this.canThrow = true;
        }, 1000);
    }


    /**
     * This function checks if the character collides with an enemy or a collectable object.
     * It also checks if a thrown object (swirl) hits an enemy.
     */
    checkCollisions() {
        this.checkCollisionEnemy();
        this.checkCollectionCoin();
        this.checkCollectionSwirl();
        this.checkHitSwirl();
    }


    /**
     * This function checks if the thrown object (swirl) hits an enemy.
     * It checks if the thrown object is colliding with an enemy and if so, it removes the thrown object and reduces the energy of the enemy.
     * If the enemy is the boss, it calls the handlingHitBoss function.
     * If the enemy is dead, it calls the handlingDeadEnemy function (passing the dead enemy as parameter).
     */ 
    checkHitSwirl() {
        this.thrownObjects.forEach((to) => {
            this.level.enemies.forEach((enemy) => {
                if (to.isColliding(enemy)) {
                    enemy.hit(20);
                    to.removeThrownObject(to.thrownObjectId);
                    if (enemy instanceof Boss) {
                        this.handlingHitBoss(enemy);
                    }   
                    if (enemy.isDead()) {
                        this.handlingDeadEnemy(enemy);
                    } 
                }
            })
        })
    }


    /**
     * This function handles the sound when the boss is hit.
     * It plays the sound (after reseting the current time to 0 to ensure the sound is played from the beginning).
     */
    handlingHitBoss(enemy) {
        if (!isMuted) {
            this.BOSS_SOUND_HIT.currentTime = 0;
            this.BOSS_SOUND_HIT.play();
        }
        enemy.onHit();
    }


    /**
     * This function handles the case when an enemy is dead.
     * It removes the enemy from the array and plays the animation for the disappearance of the respective enemy.
     * If the dead enemy is the boss, it also calls the win function.
     * 
     * @param {object} enemy - The enemy that is dead. 
     */
    handlingDeadEnemy(enemy) {
        if (enemy instanceof Boss) {
            enemy.animateDissapearanceOfBoss(enemy);
            this.win(enemy);
        } else {
            enemy.animateDissapearanceOfSmallEnemy(enemy);
        }
        let enemyIndex = enemy.findIndexOfEnemey(enemy.enemyId);
        enemy.removeEnemy(enemyIndex);
    }


    /**
     * This function handles the win condition of the game.
     * It stops the level, plays the win sound and after a short delay (for the explosion) replaces the boss with windmills and shows the win banner.
     * It also shows the end screen after a delay of 5 seconds.
     * 
     * @param {object} enemy - The enemy that is replaced by windmills (normally the boss).
     */
    win(enemy) {
        this.stopLevel();
        this.playWinSound();
       
        setTimeout(() => {
            this.showBanner('win',language);
            this.replaceByWindmills(enemy);
        }, 400);

        setTimeout(() => {
            showEndScreen('win', this.timeScore, this.coins);
        }, 5000);
    }


    /**
     * This function stops the play clock and the background sound.
     * It also sets the camera to be frozen and removes all items from the level.
     * It updates the time score with the time passed by the play clock.
     */
    stopLevel() {
        this.level.playClock[0].stopClock();
        this.BACKGROUND_SOUND.pause();
        this.cameraFrozen = true;
        this.timeScore = this.level.playClock[0].secondsPassed;
        this.removeLevelItems();
    }


    /**
     * This function removes all items from the level.
     * It removes all coins, swirls and enemies (by setting the energy of all to 0).
     */
    removeLevelItems() {
        this.level.coins = [];
        this.level.swirls = [];
        this.level.enemies.forEach(enemy => {
            enemy.energy = 0;
        });
        this.level.enemies = [];
    }


    /**
     * This function shows the end banner after the game is finished.
     * It creates a new FixedObject with the image of the end banner and adds it to the endBanner array.
     * It takes the status (win or lose) and the language as parameters to determine which image to show.
     * 
     * @param {string} status - The status of the game (win or lose).
     * @param {string} language - The language of the game (DE or EN).
     */
    showBanner(status, language) {
        this.endBanner.push(new FixedObject(`img/game/end/${status}_${language}.png`, false, 'none', 200, 150, 400, 100));
    }


    /**
     * This function replaces an enemy with windmills.
     * It creates three new Windmill objects and adds them to the effectObjects array.
     * It also plays the windmill sound and sets it to loop.
    
     * @param {object} enemy - The enemy replaced by windmills (normally the boss).
     */
    replaceByWindmills(enemy) {
        if (!isMuted) {
            this.WINDMILL_SOUND.play();
            this.WINDMILL_SOUND.loop = true;
        }

        this.effectObjects.push(new Windmill(enemy.x + enemy.adjustFrameX / 3, 40, 360));
        this.effectObjects.push(new Windmill(enemy.x + enemy.adjustFrameX + 150, 70, 320));
        this.effectObjects.push(new Windmill(enemy.x + enemy.adjustFrameX + 80, 185, 200));
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


    /**
     * This function checks if the character collides with an enemy.
     * It checks if the character is jumping on top of an enemy which in defined cases kills the enemy by shrinking it.
     * If the character is not hurt and collides with a boss or another enemy, it hurts the character and updates the energy status bar.
     * A hit from the boss reduces the energy of the character more than a hit from any other enemy.
     * 
     * @param {object} enemy - The enemy that the character hits from above or collides with.
     */
    checkCollisionEnemy() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.hitsFromAbove(enemy) && !this.character.isHurt() && (enemy instanceof Shooter || enemy instanceof Snail || enemy instanceof Bullet)) {
                this.character.jump(28);
                enemy.shrink(enemy.enemyId);
                enemy.energy = 0;
            } else if (this.character.isColliding(enemy) && (enemy instanceof Boss)) {
                this.character.hit(40);
                this.level.statusBars[0].setPercentage(this.character.energy, 'energy');
            } else if (this.character.isColliding(enemy)) {
                this.character.hit(20);
                this.level.statusBars[0].setPercentage(this.character.energy, 'energy');
            }
        })
    }


    /**
     * This function checks if the character collects a coin.
     * If so, it removes the coin from the map, increases the coin counter and plays the coin collect sound (if not muted).
     * It also displays the updated amount of coins collected.
     */
    checkCollectionCoin() {
        this.level.coins.forEach((coin) => {
            if (this.character.isColliding(coin)) {
                this.removeCoinFromMap(coin);
                this.coins++;
                this.level.fixedObjects[2].increaseCoinCounter(this.coins);
                if (!isMuted) {
                    this.COIN_SOUND_COLLECT.currentTime = 0;
                    this.COIN_SOUND_COLLECT.play();
                }
            }
        })
    }


    /**
     * This function removes a coin from the map.
     * It checks if the coin is in the array of coins and removes it if found.
     * 
     * @param {object} coin - The coin to be removed from the map.
     */
    removeCoinFromMap(coin) {
        let coinIndex = this.level.coins.indexOf(coin); // Index des Coins suchen
        if (coinIndex > -1) {
            this.level.coins.splice(coinIndex, 1); // Coin aus dem Array entfernen 
        } 
    }


    /**
     * This function checks if the character collects a swirl.
     * If so, it calls the function to remove the swirl from the map und updates the status bar for the swirls.
     */
    checkCollectionSwirl() {
        this.level.swirls.forEach((swirl) => {
            if (this.character.isColliding(swirl)) {
                this.removeSwirlFromMap(swirl);
                this.level.statusBars[1].setPercentage(this.swirls, 'wind');
            }
        })
    }


    /**
     * This function removes a swirl from the map.
     * It checks if the swirl is in the array of swirls and removes it if found.
     * It increments the swirls collected (up to a maximum of 100%) and plays a sound (if not muted).
     * 
     * @param {object} swirl - The swirl to be removed from the map.
     */
    removeSwirlFromMap(swirl) {
        let swirlIndex = this.level.swirls.indexOf(swirl);
        if (swirlIndex > -1) {
            this.level.swirls.splice(swirlIndex, 1); // Swirl aus dem Array entfernen
            if (this.swirls < 100) {
                this.swirls += this.valueOfSwirl;
            }
            if (!isMuted) {
                this.SWIRL_SOUND_COLLECT.currentTime = 0;
                this.SWIRL_SOUND_COLLECT.play();
            }
        } 
    }
    

    /**
     * This function draws the world on the canvas.
     * It first clears the canvas and then calls several functions to draw the required elements.
     * It also adds the character to the map and translates the canvas based on the camera position.
     * The order is important: whatever is drawn first ends up in the background, the character should always be shown in the foreground.
     * It uses requestAnimationFrame to continuously call the draw function.
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.translate(this.camera_x, 0);
        this.drawBackground();
        this.drawFixedPositionedObjects();
        this.drawFlexiblePositionedObjects();
        this.drawEndBanner();
        this.addToMap(this.character);
        this.ctx.translate(-this.camera_x, 0);

        let self = this;
        requestAnimationFrame(() => {
            self.draw()});
    }


    /**
     * This function draws the background objects and the clouds to the map.
     */
    drawBackground() {
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
    }


    /**
     * This function draws the fixed positioned objects to the map.
     * It translates the canvas based on the camera position and adds the status bars, fixed objects and play clock to the map.
     * Then it translates the canvas back to the original position after drawing.
     */
    drawFixedPositionedObjects() {
        this.ctx.translate(-this.camera_x, 0);
        this.addObjectsToMap(this.level.statusBars);
        this.addObjectsToMap(this.level.fixedObjects);
        this.addObjectsToMap(this.level.playClock);
        this.ctx.translate(this.camera_x, 0);
    }


    /**
     * This function draws the flexible positioned objects to the map.
     * It adds the enemies, collectable objects (coins & swirls), thrown objects and effect objects to the map.
     */
    drawFlexiblePositionedObjects() {
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.swirls);
        this.addObjectsToMap(this.thrownObjects);
        this.addObjectsToMap(this.effectObjects);
    }


    /**
     * This function draws the end banner to the map. 
     * As the end banner is fixed positioned, it translates the canvas based on the camera position and adds the end banner to the map.
     * Then it translates the canvas back to the original position after drawing.
     */
    drawEndBanner() {
        this.ctx.translate(-this.camera_x, 0);
        this.addObjectsToMap(this.endBanner);
        this.ctx.translate(this.camera_x, 0);
    }


    /**
     * This function iterates over the given array and calls the addToMap function for each object.
     * It is used to add multiple objects to the map at once.
     * 
     * @param {array} objects - An array of objects to be added to the map. 
     */
    addObjectsToMap(objects) {
        objects.forEach(object => {
            this.addToMap(object);
        });
    }


    /**
     * This function adds a single object to the map.
     * It first checks if the object needs to be flipped (if it is facing the other direction).
     * Then it draws the object, - if relevant - its frame and the play clock on the canvas.
     * It also flips the image back to its original position (if it was flipped before).
     * 
     * @param {object} object - The object to be added to the map. 
     */
    addToMap (object) {
        if (object.otherDirection) {
            this.flipImage(object);
        }

        object.draw(this.ctx);
        object.drawFrame(this.ctx);
        object.drawClock(this.ctx);
        
        if (object.otherDirection) {
            this.flipImageBack(object);
        }
    }


    /**
     * This function flips the image of the object horizontally (if an object is facing the other direction).
     * 
     * @param {object} movObj - The object to be flipped. 
     */
    flipImage(movObj) {
        this.ctx.save();
        this.ctx.translate(movObj.width, 0);
        this.ctx.scale(-1, 1);
        movObj.x = movObj.x * -1;
    }


    /**
     * This function flips the image of the object back to its original position.
     * It is called after the object has been drawn.
     * 
     * @param {object} movObj - The object to be flipped back. 
     */
    flipImageBack(movObj) {
        movObj.x = movObj.x * -1;
        this.ctx.restore();
    }
}