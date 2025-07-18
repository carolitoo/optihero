/**
 * This file contains the translations for the game.
 * It translates all fixed texts (not generated via JS).
 * The function is called when the user changes the language on the start screen to English.
 */
function translateEN() {
  document.getElementById("text-selection-character").innerHTML =
    "SELECT YOUR OPTI.HERO";

  document.getElementById("start-button").innerHTML = `LET'S<br>PLAY!`;
  document.getElementById("how-to-play-button").innerHTML = `HOW TO<br>PLAY`;
  document.getElementById("control-button").innerHTML = `SHOW<br>CONTROLS`;

  document.getElementById("restart-button-label").innerHTML = `PLAY AGAIN!`;
  document.getElementById(
    "return-to-start-button-label"
  ).innerHTML = `RETURN TO START`;

  document.getElementById(
    "intro-headline"
  ).innerHTML = `Your opti.hero needs you!`;
  document.getElementById("intro-text").innerHTML = `
    Help him build a new wind farm and don't let the numerous obstacles stop you.<br><br>
    Jump over the enemies and collect enough gusts of wind, which you can use against your opponents on the way to more renewable energy.<br><br>
    Make sure you keep enough gusts of wind to deal with the final boss - the Bureaucracy.<br><br>
    You can also defeat some enemies by jumping down on them from above, but watch out for the harsh laws that you should not come into conflict with.<br><br> 
    If we're going to make the energy transition, there is no time to lose!<br><br>
    Collect some PPAs along the way to boost your efficiency. <br><br> 
    Maybe you might even beat the high score...`;
  document.getElementById("intro-end").innerHTML = `Good luck!`;

  document.getElementById("controls-headline").innerHTML = `Controls`;
  document.getElementById("space-key").innerHTML = `space`;
  document.getElementById("label-move-right").innerHTML = `move right`;
  document.getElementById("label-move-left").innerHTML = `move left`;
  document.getElementById("label-throw").innerHTML = `throw`;
  document.getElementById("label-jump").innerHTML = `jump`;

  document.getElementById(
    "text-orientation"
  ).innerHTML = `Please turn your device to play.`;

  document.getElementById("imprint-headline").innerHTML = "Imprint";
  document.getElementById("imprint-contact").innerHTML = `Contact`;
  document.getElementById("imprint-copyright").innerHTML = `<p>
                The icons are provided by
                <a
                  href="https://fontawesome.com/"
                  rel="nofollow"
                  target="_blank"
                  >FontAwesome</a
                >
                unter the
                <br/>
                <a
                  href="https://fontawesome.com/license"
                  target="_blank"
                  rel="nofollow"
                  >Creative Commons Attribution 4.0 International license.</a
                >
              </p>
              <br/>

              <p>
                The flag icons are created by
                <a
                  href="https://www.flaticon.com/packs/countrys-flags/"
                  rel="nofollow"
                  target="_blank"
                  >Freepik - Flaticon.</a
                >
              </p>
              <br/>

              <p>
                The sounds are taken from
                <a
                  href="https://pixabay.com/service/license-summary/"
                  rel="nofollow"
                  target="_blank"
                  >Pixaby.</a
                >
              </p>`;

  document.getElementById("enter-top-score-headline").innerHTML =
    "Congratulations!";
  document.getElementById("submit-score-btn").innerHTML = `SAVE SCORE`;
  document.getElementById("input-player-name").placeholder = "Your name...";
}

/**
 * This file contains the translations for the game.
 * It translates all fixed texts (not generated via JS).
 * The function is called when the user changes the language on the start screen to German.
 */
function translateDE() {
  document.getElementById("text-selection-character").innerHTML =
    "WÄHLE DEINEN OPTI.HERO";

  document.getElementById("start-button").innerHTML = `LOS<br>GEHT'S!`;
  document.getElementById("how-to-play-button").innerHTML = `INFO ZUM<br>SPIEL`;
  document.getElementById("control-button").innerHTML = `BELEGUNG<br>TASTEN`;

  document.getElementById(
    "restart-button-label"
  ).innerHTML = `NOCHMAL SPIELEN!`;
  document.getElementById(
    "return-to-start-button-label"
  ).innerHTML = `ZURÜCK ZUM START`;

  document.getElementById(
    "intro-headline"
  ).innerHTML = `Dein opti.hero braucht dich!`;
  document.getElementById("intro-text").innerHTML = `
    Hilf ihm, einen neuen Windpark zu errichten und lass dich dabei nicht von den zahlreichen Hürden stoppen. <br><br>
    Überspringe die Gegner und sammle ausreichend Windböen, welche du gezielt gegen deine Widersacher auf dem Weg zu mehr erneuerbarer Energie einsetzen kannst. <br><br>
    Achte dabei darauf, dass du ausreichend Windböen aufbewahrst, um der Endgegnerin – der Bürokratie – den Garaus zu machen. <br><br>
    Einige Gegner kannst du auch besiegen, indem du von oben auf sie herabspringst, aber nimm dich dabei in Acht vor den scharfen Gesetzen, mit denen du nicht in Konflikt geraten solltest. <br><br> 
    Damit wir die Energiewende vorantreiben, sollten wir keine Zeit verlieren! <br><br> 
    Sammle auf dem Weg dahin das ein oder andere PPA, um so deine Wirtschaftlichkeit zu optimieren. <br><br> 
    Möglicherweise schaffst du es sogar den Highscore zu knacken...`;
  document.getElementById("intro-end").innerHTML = `Viel Erfolg!`;

  document.getElementById("controls-headline").innerHTML = `Steuerung`;
  document.getElementById("space-key").innerHTML = `Leertaste`;
  document.getElementById("label-move-right").innerHTML = `recht laufen`;
  document.getElementById("label-move-left").innerHTML = `links laufen`;
  document.getElementById("label-throw").innerHTML = `werfen`;
  document.getElementById("label-jump").innerHTML = `springen`;

  document.getElementById(
    "text-orientation"
  ).innerHTML = `Bitte drehe dein Gerät, um zu spielen.`;

  document.getElementById("imprint-headline").innerHTML = "Impressum";
  document.getElementById("imprint-contact").innerHTML = `Kontakt`;
  document.getElementById("imprint-copyright").innerHTML = `<p>
                Die Icons kommen von
                <a
                  href="https://fontawesome.com/"
                  rel="nofollow"
                  target="_blank"
                  >FontAwesome</a
                >
                unter der
                <br/>
                <a
                  href="https://fontawesome.com/license"
                  target="_blank"
                  rel="nofollow"
                  >Creative Commons Attribution 4.0 International license.</a
                >
              </p>
              <br/>

              <p>
                Die Flaggen-Icons wurden erstellt von
                <a
                  href="https://www.flaticon.com/packs/countrys-flags/"
                  rel="nofollow"
                  target="_blank"
                  >Freepik - Flaticon.</a
                >
              </p>
              <br/>

              <p>
                Die Sounds stammen von
                <a
                  href="https://pixabay.com/service/license-summary/"
                  rel="nofollow"
                  target="_blank"
                  >Pixaby.</a
                >
              </p>`;

  document.getElementById("enter-top-score-headline").innerHTML =
    "Herzlichen Glückwunsch!";
  document.getElementById("submit-score-btn").innerHTML = `ERGEBNIS SPEICHERN`;
  document.getElementById("input-player-name").placeholder = "Dein Name...";
}
