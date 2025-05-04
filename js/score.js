let topScore = [
    {
        "position": 1,
        "name": "Hugo",
        "timeInSeconds": 15,
        "coins": 5
    },
    {
        "position": 2,
        "name": "Maria",
        "timeInSeconds": 18,
        "coins": 3
    },
    {
        "position": 3,
        "name": "Selma",
        "timeInSeconds": 25,
        "coins": 5
    },
    {
        "position": 4,
        "name": "Ian",
        "timeInSeconds": 25,
        "coins": 4
    },
    {
        "position": 5,
        "name": "Elli",
        "timeInSeconds": 32,
        "coins": 6
    } 
];
let topScoreAsText;
let isTopScore = false;
let positionScore = 999;


/**
 * This function retrieves the top score from the local storage.
 * If the top score is not found, it initializes it to 0.
 * 
 * @returns {Array} topScore - Array of objects containing the top scores
 */
function getTopScoreFromLocalStorage() {
    topScoreAsText = localStorage.getItem('topScore');
    if (topScoreAsText) {
        topScore = JSON.parse(topScoreAsText);
    } else {
        topScore = [];
    }
}


/**
 * This function sets the top score to the local storage.
 * It converts the top score array to a string and stores it in the local storage.
 */
function setTopScoreToLocalStorage() {
    topScoreAsText = JSON.stringify(topScore);
    localStorage.setItem('topScore', topScoreAsText);
}


/**
 * This function gets the top scores from the local storage and checks if there are any values available yet.
 * Depending on the result, it calls the appropriate function to handle the top score.
 * 
 * @param {number} timeInSeconds - The time in seconds of the new score
 * @param {number} coins - The number of coins of the new score
 */
async function checkTopScore(timeInSeconds, coins) {
    getTopScoreFromLocalStorage();

    if (!topScore.length) {
        handleEmptyTopScore(timeInSeconds, coins);
    } else {
        handleExistingTopScore(timeInSeconds, coins);
    }     
}


/**
 * This function handles the case when there are no top scores available yet.
 * It calls the function to add a new top score with the given time and coins. 
 * 
 * @param {number} timeInSeconds - The time in seconds of the new score
 * @param {number} coins - The number of coins of the new score
 */
async function handleEmptyTopScore(timeInSeconds, coins) {
    isTopScore = true;
    document.getElementById('enter-score-button').onclick = () => {
        addNewTopScore(0, 1, timeInSeconds, coins);
    }
}


/**
 * This function handles the case when there are existing top scores.
 * It checks if the new score is a top score.
 * In case of a new top score it calls the function to add a new top score with the given time and coins.
 *  
 * @param {number} timeInSeconds - The time in seconds of the new score
 * @param {number} coins - The number of coins of the new score
 */
async function handleExistingTopScore(timeInSeconds, coins) {
    await getScorePosition(timeInSeconds, coins);

    if (positionScore <= topScore.length) {
        isTopScore = true;
        document.getElementById('enter-score-button').onclick = () => {
            addNewTopScore(positionScore - 1, positionScore, timeInSeconds, coins);
        }
    } else {
        isTopScore = false;
    }
}


/**
 * This function retrieves the position of the new score in the top score list.
 * It compares the new score with the existing scores and finds the right position for it.
 * If the new score is not a top score, it keeps the default value (999).
 * 
 * @param {number} timeInSeconds - The time in seconds of the new score
 * @param {number} coins - The number of coins of the new score
 */
async function getScorePosition(timeInSeconds, coins) {
    positionScore = 999; 
    for (let i = 0; i < topScore.length; i++) {
        // PRÜFEN, FKT. NOCH NICHT RICHTIG
        if (timeInSeconds < topScore[i].timeInSeconds) {
            positionScore = i + 1;
            break;
        } else if (timeInSeconds === topScore[i].timeInSeconds && coins > topScore[i].coins) {
            positionScore = i + 1;
            break;
        } 
    }
}


/**
 * This function adds a new top score to the top score array.
 * It asks the user for their name and creates a new score object.
 * It then adds the new score at the right position of top score array and removes the last entry if the array length exceeds 5.
 * It also updates the local storage with the new top score.
 * 
 * @param {number} index - The index at which to insert the new score
 * @param {number} position - The position of the new score in the top score list
 * @param {number} timeInSeconds - The time in seconds of the new score
 * @param {number} coins - The number of coins of the new score
 */
async function addNewTopScore(index, position, timeInSeconds, coins) {
    const playerName = await askForPlayerName();
    const newScore = {
        "position": position,
        "name": playerName,
        "timeInSeconds": timeInSeconds,
        "coins": coins
    };

    topScore.splice(index, 0, newScore);
    if (topScore.length > 5) {
        topScore.pop();
    }
    await adjustTopScorePositions();
    setTopScoreToLocalStorage();
}



// ANPASSEN // GGF. TASTATUR ZURÜCKSETZEN (wegen "D")
function askForPlayerName() {
    return new Promise((resolve) => {
        const playerName = prompt("Please enter your name:");
        if (playerName) {
            resolve(playerName);
        } else {
            resolve("Anonymous");
        }
    });
}


/**
 * This function adjusts the positions of the top scores in the array.
 * It starts from the first position and checks if the current score is equal to the previous one.
 * If they are equal, it assigns the same position to the current score. Otherwise, it assigns the next position.
 */
async function adjustTopScorePositions() {
    topScore[0].position = 1;
    for (let i = 1; i < topScore.length; i++) {
        if (topScore[i].timeInSeconds === topScore[i-1].timeInSeconds && topScore[i].coins === topScore[i-1].coins) {
            topScore[i].position = i;
        } else {
            topScore[i].position = i + 1;
        }
    }
}


async function showTopScore() {
    const scoreTable = document.getElementById('table-top-scores')
    scoreTable.innerHTML = '';
    scoreTable.innerHTML += await createTableHeaderHTML();

    for (let i = 0; i < 5; i++) {
        if (i < topScore.length) {
            scoreTable.innerHTML += await createFilledScoreElementHTML(i);
        } else {
            scoreTable.innerHTML += await createEmptyScoreElementHTML(i);
        }
    }

    document.getElementById('list-top-scores').classList.remove('d-none');
}


async function createTableHeaderHTML() {
    let playerPosition;
    let playerName;

    if (selectLanguage === 'de') {
        playerPosition = 'Platz';
        playerName = 'Name';
    } else if (selectLanguage === 'en') {
        playerPosition = 'Position';
        playerName = 'Name';
    }
    
    return `
        <tr>
            <th>${playerPosition}</th>
            <th>${playerName}</th>
            <th><img ZEIT></th>
            <th><img COINS></th>
        </tr>`;
}
    



async function createFilledScoreElementHTML(i) {
    return `
    <tr>
        <th>${topScore[i].position}.</th>
        <th>${topScore[i].name}</th>
        <th>${topScore[i].timeInSeconds}</th>
        <th>${topScore[i].coins}</th>
    </tr>`;
}


async function createEmptyScoreElementHTML(i) {
    return `
    <tr>
        <th>-</th>
        <th>...</th>
        <th>-:-</th>
        <th>-</th>
    </tr>`;

}