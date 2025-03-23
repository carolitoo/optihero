class Enemy extends MoveableObject {
  maxStartX = 1800;
  state;
  energy;
  counterEnemyId = 1;
  enemyId;
  hadFirstContact = false;


  ENEMY_SMALL_SOUND_KILL = new Audio('audio/01_game/explosion/splash-death-splash-46048.mp3');
  ENEMY_SMALL_SOUND_SHRINK = new Audio('audio/03_enemies/shrink_enemy.mp3');
  BOSS_SOUND_KILL = new Audio('audio/01_game/explosion/sci-fi-explosion-09-190268.mp3');


  shrink(enemyId) {
    let enemyIndex = this.findIndexOfEnemey(enemyId);
    if (enemyIndex === -1) return;

    let enemy = world.level.enemies[enemyIndex];
    if (!isMuted) {
      this.ENEMY_SMALL_SOUND_SHRINK.currentTime = 0
      this.ENEMY_SMALL_SOUND_SHRINK.play();
  }

  this.animateShrinking(enemy, () => {
    // Ermittele den Index erneut, falls sich das Array geändert hat (stellt sicher, dass sich der richtige Gegner entfernt wird und der Boss nicht verschwindet)
    enemyIndex = this.findIndexOfEnemey(enemyId);
    if (enemyIndex !== -1) {
      this.removeEnemy(enemyIndex);
    }
    });
  }


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


  findIndexOfEnemey(enemyId) {
    return world.level.enemies.findIndex((enemy) => enemy.enemyId === enemyId);
  }


  removeEnemy(enemyIndex) {
    if (enemyIndex !== -1) {
      world.level.enemies.splice(enemyIndex, 1);
    }
  }


  animateDissapearanceOfSmallEnemy(enemy)  {
    let explosion = new FixedObject('img/effects/explosion_3.png', enemy.x + enemy.adjustFrameX/ 1.3, enemy.y + enemy.adjustFrameY / 1.6, 120, 120);
    world.effectObjects.push(explosion);
    setInterval(() => {
        let explosionIndex = world.effectObjects.indexOf(explosion);
        if (explosionIndex > -1) {
            world.effectObjects.splice(explosionIndex, 1);
            if (!isMuted) {
              this.ENEMY_SMALL_SOUND_KILL.currentTime = 0
              this.ENEMY_SMALL_SOUND_KILL.play();
          }
        }
    }, 100);
}

}
