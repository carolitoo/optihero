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
        topScore = 0;
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
function checkTopScore(timeInSeconds, coins) {
    getTopScoreFromLocalStorage();

    if (topScore === 0) {
        handleEmptyTopScore(timeInSeconds, coins);
    } else {
        handleExistingTopScore(timeInSeconds, coins);
    }     
}


/**
 * This function handles the case when there are no top scores available yet.
 * It adds a new top score with the given time and coins. It also sets the top score to the local storage.
 * 
 * @param {number} timeInSeconds - The time in seconds of the new score
 * @param {number} coins - The number of coins of the new score
 */
async function handleEmptyTopScore(timeInSeconds, coins) {
    console.log("No top scores available yet.");
    await addNewTopScore(0, 1, timeInSeconds, coins);
    setTopScoreToLocalStorage();
}


/**
 * This function handles the case when there are existing top scores.
 * It checks if the new score is a top score.
 * In case of a new top score it is added to the array and set to the local storage.
 * In case that the new scroe is not a top score a button to show the top scores is displayed instead (to be implemented).
 * 
 * @param {number} timeInSeconds - The time in seconds of the new score
 * @param {number} coins - The number of coins of the new score
 */
async function handleExistingTopScore(timeInSeconds, coins) {
    await getScorePosition(timeInSeconds, coins);

    if (positionScore <= topScore.length) {
        console.log("New top score. Position: " + positionScore);
        await addNewTopScore(positionScore - 1, positionScore, timeInSeconds, coins);
        setTopScoreToLocalStorage();
    } else {
        console.log("No new top score. Zeit: " + timeInSeconds + " Coins: " + coins);
        // Button - Anzeige Top Score
    }  
}


/**
 * This function retrieves the position of the new score in the top score list.
 * It compares the new score with the existing scores and finds the right position for it.
 * 
 * @param {number} timeInSeconds - The time in seconds of the new score
 * @param {number} coins - The number of coins of the new score
 */
async function getScorePosition(timeInSeconds, coins) {
    for (let i = 0; i < topScore.length; i++) {
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
    console.log(topScore);
}


// ANPASSEN
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

