class World {
    character = new Character();
    boss = new Boss();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    coins = 0;
    valueOfCoin = 20;
    swirls = 0;
    valueOfSwirl = 20;

    effectObjects = [];
    thrownObjects = [];
    canThrow = true;
    

    BACKGROUND_SOUND = new Audio('./audio/01_game/background/01_humorous-loop-275485.mp3');
    COIN_SOUND_COLLECT = new Audio('./audio/01_game/coin/coins-sound-effect-220030.mp3');
    SWIRL_SOUND_COLLECT = new Audio('./audio/01_game/heart/energy-drink-effect-230559.mp3');
    BOSS_SOUND_HIT = new Audio('./audio/01_game/explosion/sci-fi-explosion-09-190268.mp3');
    // BOSS_SOUND_HIT = new Audio('./audio/01_game/explosion/explosion-36210.mp3');
    WINDMILL_SOUND = new Audio('./audio/02_character/throw/viento-de-ciada-79892.mp3');
    GAME_SOUND_WIN = new Audio('./audio/01_game/win/01_brass-fanfare-with-timpani-and-winchimes-reverberated-146260.mp3');

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
        if (!musicOff) {
            this.BACKGROUND_SOUND.volume = 0.3;
            this.BACKGROUND_SOUND.loop = true;
            this.BACKGROUND_SOUND.currentTime = 0;
            this.BACKGROUND_SOUND.play();
        }
    }


     /**
      * function starts the game loop
      */
    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
            this.checkFirstContact();
        }, 50);
        this.level.playClock[0].startClock();
    }

/**
 * function checks if the first contact with the boss and the shooter has been made
 * if the first contact with the shooter has been made, the loop for shooting bubbles is started
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
     * function checks if the character collides with an enemy or a collectable object
     */
    checkCollisions() {
        this.checkCollisionEnemy();
        this.checkCollectionCoin();
        this.checkCollectionSwirl();
        this.checkHitSwirl();
    }



    // checkHitSwirl() {
    //     this.thrownObjects.forEach((to) => {
    //         this.level.enemies.forEach((enemy) => {
    //             if (to.isColliding(enemy)) {
    //                 enemy.hit(20);
    //                 to.removeThrownObject(to.thrownObjectId);
    //                 if (enemy instanceof Boss) {
    //                     if (!isMuted) {
    //                         this.BOSS_SOUND_HIT.currentTime = 0;
    //                         this.BOSS_SOUND_HIT.play();
    //                     }
    //                 }   
    //                 if (enemy.isDead()) {
    //                     let enemyIndex = enemy.findIndexOfEnemey(enemy.enemyId);
    //                     enemy.removeEnemy(enemyIndex);
    //                     enemy.animateDissapearanceOfEnemy(enemy);
    //                 } 
    //             }
    //         })
    //     })
    // }


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


    handlingHitBoss() {
        if (!isMuted) {
            this.BOSS_SOUND_HIT.currentTime = 0;
            this.BOSS_SOUND_HIT.play();
        }
    }


    handlingDeadEnemy(enemy) {
        if (enemy instanceof Boss) {
            enemy.animateDissapearanceOfBoss(enemy);
            this.win(enemy);
        }
        let enemyIndex = enemy.findIndexOfEnemey(enemy.enemyId);
        enemy.removeEnemy(enemyIndex);
        enemy.animateDissapearanceOfSmallEnemy(enemy);
    }


    win(enemy) {
        this.level.playClock[0].stopClock();
        this.replaceByWindmills(enemy);
        this.playWinSound();
        setTimeout(() => {
            this.showBanner('win',language);
        }, 400);

        let timeScore = this.level.playClock[0].secondsPassed;
   '     this.checkTopScore(timeScore, this.coins);'
    }


    // checkTopScore(timeScore, coinScore) {
    //     let topScore = this.level.fixedObjects[2].getTopScore();
    //     if (timeScore < topScore.time || coinScore > topScore.coins) {
    //         this.level.fixedObjects[2].setTopScore(timeScore, coinScore);
    //     }
    // }


    showBanner(status, language) {
        this.effectObjects.push(new FixedObject(`img/game/end/${status}_${language}.png`, this.character.x + 200, 150, 400, 100));
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