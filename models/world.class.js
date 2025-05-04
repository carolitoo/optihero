class World {
    character = new Character();
    boss = new Boss();
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


    setClickableObjects() {
        this.level.fixedObjects.forEach(object => {
            if (object.clickable) {
                object.setInitialValue(object.handler);
            }
        });
    }


    implementEventListener() {
        this.canvas.addEventListener('click', (event) => {
            this.checkClickedObject(event);
          });
    }


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
    * This function checks if the first contact with the boss and the shooter has been made.
    * If the first contact with the shooter has been made, the loop for shooting bubbles is started.
    */
    checkFirstContact() {
        this.level.enemies.forEach((enemy) => {
            if ((enemy.x + enemy.adjustFrameX) - (this.character.x + this.character.adjustedWidth + this.character.adjustFrameX) < 450 && (enemy instanceof Boss || enemy instanceof Shooter)) {
                enemy.hadFirstContact = true;
                if (enemy instanceof Shooter) {
                    enemy.checkIfLoopHasStarted();
                }
            }

        })
    }


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
            this.canThrow = false;
            setTimeout(() => {
                this.canThrow = true;
            }, 1000);
        }
    }


    /**
     * This function checks if the character collides with an enemy or a collectable object.
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
                        this.handlingHitBoss();
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
    handlingHitBoss() {
        if (!isMuted) {
            this.BOSS_SOUND_HIT.currentTime = 0;
            this.BOSS_SOUND_HIT.play();
        }
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


    win(enemy) {
        this.level.playClock[0].stopClock();
        this.BACKGROUND_SOUND.pause();
        this.cameraFrozen = true;

        this.replaceByWindmills(enemy);
        this.playWinSound();
        this.removeAllItems();
      
        setTimeout(() => {
            this.showBanner('win',language);
        }, 400);
        setTimeout(() => {
            showEndScreen('win');
        }, 5000);

        let timeScore = this.level.playClock[0].secondsPassed;
        // this.checkTopScore(timeScore, this.coins);
    }


    // checkTopScore(timeScore, coinScore) {
    //     let topScore = this.level.fixedObjects[2].getTopScore();
    //     if (timeScore < topScore.time || coinScore > topScore.coins) {
    //         this.level.fixedObjects[2].setTopScore(timeScore, coinScore);
    //     }
    // }

    removeAllItems() {
        this.level.coins = [];
        this.level.swirls = [];
        this.level.enemies.forEach(enemy => {
            enemy.energy = 0;
        });
        this.level.enemies = [];
    }


    showBanner(status, language) {
        this.endBanner.push(new FixedObject(`img/game/end/${status}_${language}.png`, false, 'none', 200, 150, 400, 100));
    }


    replaceByWindmills(enemy) {
        if (!isMuted) {
            this.WINDMILL_SOUND.play();
            this.WINDMILL_SOUND.loop = true;
        }

        let intervalWindmill = setInterval(() => {
            this.effectObjects.push(new Windmill(enemy.x + enemy.adjustFrameX / 3, 40, 360));
            this.effectObjects.push(new Windmill(enemy.x + enemy.adjustFrameX + 150, 70, 320));
            this.effectObjects.push(new Windmill(enemy.x + enemy.adjustFrameX + 80, 185, 200));
            // Interval stoppen, damit die Windmills nicht mehrfach angelegt werden
            clearInterval(intervalWindmill);
            }, 400);
    }


    playWinSound() {
        if (!isMuted) {
            let winInterval = setInterval(() => {
                this.GAME_SOUND_WIN.play();
            }, 1000);
            setTimeout(() => {
                clearInterval(winInterval);
            }, 4000);
        }
    }


    checkCollisionEnemy() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isShrinking(enemy) && !this.character.isHurt() && (enemy instanceof Shooter || enemy instanceof Snail || enemy instanceof Bullet)) {
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


    removeCoinFromMap(coin) {
        let coinIndex = this.level.coins.indexOf(coin); // Index des Coins suchen
        if (coinIndex > -1) {
            this.level.coins.splice(coinIndex, 1); // Coin aus dem Array entfernen 
        } 
    }



    // removeElementFromMap(element, array, collector, sound, valueOfElement) {
    //     let elementIndex = array.indexOf(element); // Index des Elements suchen
    //     if (elementIndex > -1) {
    //         array.splice(elementIndex, 1); // Element aus dem Array entfernen
    //         if (collector < 100) {
    //             collector += valueOfElement;
    //         }
    //         if (! this.isMuted) {
    //             sound.currentTime = 0
    //             sound.play();
    //         }
    //     } 
    // }


    checkCollectionSwirl() {
        this.level.swirls.forEach((swirl) => {
            if (this.character.isColliding(swirl)) {
                this.removeSwirlFromMap(swirl);
                this.level.statusBars[1].setPercentage(this.swirls, 'wind');
            }
        })
    }


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
    


    draw() {
        // löscht alle Inhalte
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        // zeichnet Inhalte ein
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);

        this.ctx.translate(-this.camera_x, 0);
        // ---- fix positionierte Inhalte ---- 
        this.addObjectsToMap(this.level.statusBars);
        this.addObjectsToMap(this.level.fixedObjects);
        this.addObjectsToMap(this.level.playClock);
        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.swirls);
        this.addObjectsToMap(this.thrownObjects);
        this.addObjectsToMap(this.effectObjects);

        this.ctx.translate(-this.camera_x, 0);
        // ---- fix positionierte Inhalte ---- 
        this.addObjectsToMap(this.endBanner);
        this.ctx.translate(this.camera_x, 0);

        this.addToMap(this.character);
      
        this.ctx.translate(-this.camera_x, 0);

        // draw() wird immer wieder aufgerufen
        let self = this;
        requestAnimationFrame(() => {
            self.draw()});
    }



    addObjectsToMap(objects) {
        objects.forEach(object => {
            this.addToMap(object);
        });
    }


    addToMap (object) {
        if (object.otherDirection) {
            this.flipImage(object);
        }

        object.draw(this.ctx);
        object.drawFrame(this.ctx);
        object.drawClock(this.ctx);
        // object.drawHitEffect(this.ctx);
        
        if (object.otherDirection) {
            this.flipImageBack(object);
        }
    }


    flipImage(movObj) {
        this.ctx.save();
        this.ctx.translate(movObj.width, 0);
        this.ctx.scale(-1, 1);
        movObj.x = movObj.x * -1;
    }


    flipImageBack(movObj) {
        movObj.x = movObj.x * -1;
        this.ctx.restore();
    }
}