class Enemy extends MoveableObject {
  maxStartX = 3400;
  state;
  energy;
  counterEnemyId = 1;
  enemyId;
  hadFirstContact = false;

  ENEMY_SMALL_SOUND_KILL = new Audio("audio/03_enemies/kill_small_enemy.mp3");
  ENEMY_SMALL_SOUND_SHRINK = new Audio("audio/03_enemies/shrink_enemy.mp3");
  BOSS_SOUND_KILL = new Audio("audio/03_enemies/kill_boss.mp3");


  /**
   * This function is used to shrink the enemy.
   * First, it gets the index of the enemy in the enemies array based on the enemyID.
   * Then plays a sound (if not muted) and calls the function to display the shrinking effect.
   * It also removes the enemy from the enemies array after the animation is complete.
   * Before removing the enemy, it checks if the enemy is still in the enemies array by using the findIndexOfEnemey function again.
   * 
   * @param {number} enemyId - The id of the enemy to be shrunk.
   */
  shrink(enemyId) {
    let enemyIndex = this.findIndexOfEnemey(enemyId);
    if (enemyIndex === -1) return;

    let enemy = world.level.enemies[enemyIndex];
    if (!isMuted) {
      this.ENEMY_SMALL_SOUND_SHRINK.currentTime = 0;
      this.ENEMY_SMALL_SOUND_SHRINK.play();
    }

    this.animateShrinking(enemy, () => {
      enemyIndex = this.findIndexOfEnemey(enemyId);
      if (enemyIndex !== -1) {
        this.removeEnemy(enemyIndex);
      }
    });
  }


  // PRÜFEN //
  animateShrinking(enemy, callback) {
    let scale = 1;
    let steps = 20; // Anzahl der Animationsschritte (mehr Schritte = sanftere Animation)
    let stepSize = enemy.height / steps; // Wie viel Höhe pro Frame reduziert wird
    let animationInterval = setInterval(() => {
      if (scale <= 0) {
        clearInterval(animationInterval); // Stoppt die Animation
        callback(); // Entfernt den Gegner nach der Animation
      } else {
        scale -= 1 / steps;
        enemy.height -= stepSize;
        enemy.y += stepSize / 1.2; // Gegner leicht nach oben schieben für Falt-Effekt
      }
    }, 20);
  }


/**
 * This function finds the index of the enemy in the enemies array.
 * It uses the enemyId to identify the enemy.
 * 
 * @param {number} enemyId - The id of the enemy to be found.
 * @returns {number} - The index of the enemy in the enemies array or -1 if not found.
 */
  findIndexOfEnemey(enemyId) {
    return world.level.enemies.findIndex((enemy) => enemy.enemyId === enemyId);
  }


  /**
   * This function removes the enemy from the enemies array.
   * 
   * @param {number} enemyIndex - The index of the enemy to be removed.
   */
  removeEnemy(enemyIndex) {
    if (enemyIndex !== -1) {
      world.level.enemies.splice(enemyIndex, 1);
    }
  }


  /**
   * This function is called when any enemy - despite the boss - is killed or destroyed.
   * It creates a small and short explosion effect and plays a sound (if not muted).
   * 
   * * @param {object} enemy - The enemy object that is being killed.
   */
  animateDissapearanceOfSmallEnemy(enemy) {
    let explosion = new FixedObject("img/effects/explosion_small_enemy.png", false, "none", enemy.x + enemy.adjustFrameX / 1.3, enemy.y + enemy.adjustFrameY / 1.6, 120, 120);
    world.effectObjects.push(explosion);

     if (!isMuted) {
          this.ENEMY_SMALL_SOUND_KILL.currentTime = 0;
          this.ENEMY_SMALL_SOUND_KILL.play();
        }
    setTimeout(() => {
      let explosionIndex = world.effectObjects.indexOf(explosion);
      if (explosionIndex > -1) {
        world.effectObjects.splice(explosionIndex, 1);
      }
    }, 200);
  }
}
