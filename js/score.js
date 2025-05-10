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
let maxTopScores = 5;
let positionScore = 999;
let playerName;


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
        handleEmptyTopScore();
    } else {
        handleExistingTopScore(timeInSeconds, coins);
    }     
}


/**
 * This function handles the case when there are no top scores available yet.
 * It sets the isTopScore variable to true and the positionScore to 1.
 */
function handleEmptyTopScore() {
    isTopScore = true;
    positionScore = 1;

}


/**
 * This function handles the case when there are existing top scores.
 * It gets the score position and checks if the new score is a top score.
 * It sets the isTopScore variable accordingly.
 *  
 * @param {number} timeInSeconds - The time in seconds of the new score
 * @param {number} coins - The number of coins of the new score
 */
async function handleExistingTopScore(timeInSeconds, coins) {
    await getScorePosition(timeInSeconds, coins);

    if (positionScore <= maxTopScores) {
        isTopScore = true;
    } else {
        isTopScore = false;
    }
}


/**
 * This function retrieves the position of the new score in the top score list.
 * It compares the new score with the existing scores and finds the right position for it.
 * If the new score is worse than the existing scores, but there are still free scores available, it extends the array.
 * If the new score is not a top score, it keeps the default value (999).
 * 
 * @param {number} timeInSeconds - The time in seconds of the new score
 * @param {number} coins - The number of coins of the new score
 */
async function getScorePosition(timeInSeconds, coins) {
    positionScore = 999; 
    for (let i = 0; i < topScore.length; i++) {
        if (timeInSeconds < topScore[i].timeInSeconds) {
            positionScore = i + 1;
            break;
        } else if (timeInSeconds === topScore[i].timeInSeconds && coins > topScore[i].coins) {
            positionScore = i + 1;
            break;
        } 
    }
    if (positionScore === 999 && topScore.length < maxTopScores) {
        positionScore = topScore.length + 1;
    }
}


/**
 * This function resets the input field for the player name and also sets up an event listener.
 * It prevents the default form submission behavior and calls the addNewTopScore function with the provided parameters.
 * It also closes the overlay and shows the top score.
 * The function also shows the position of the player in the top score list.
 * 
 * @param {number} timeScore - The time score of the game (in seconds).
 * @param {number} coins - The number of coins collected in the game.
 */
function setInputTopScoreElement(timeScore, coins) {
    document.getElementById('input-player-name').value = ''; 

    document.getElementById('container-input-score').addEventListener('submit', (event) => {
        event.preventDefault(); 
        addNewTopScore(positionScore - 1, positionScore, timeScore, coins);
        closeOverlay('enter-top-score');
        showTopScore();
      }, { once: true });
    
      if (language === 'DE') {
        document.getElementById('label-input-player-name').innerHTML = `Du hast den ${positionScore}. Platz erreicht.`;
    } else if (language === 'EN') {
        document.getElementById('label-input-player-name').innerHTML = `You reached the ${positionScore}. place.`;
    }
}


/** 
 * This function adds a new top score to the top score array.
 * It gets the name of the player out of the input field that is displayed after winnung and having reached a top score.
 * It calls the function to update the array with the top scores.
 * It also updates the local storage with the new top score.
 * 
 * @param {number} index - The index at which to insert the new score
 * @param {number} position - The position of the new score in the top score list
 * @param {number} timeInSeconds - The time in seconds of the new score
 * @param {number} coins - The number of coins of the new score
 */
async function addNewTopScore(index, position, timeInSeconds, coins) {
    playerName = document.getElementById('input-player-name').value;

    if (!playerName) {
        console.log('No name entered/ available.');
    } else {
        const newScore = {
            "position": position,
            "name": playerName,
            "timeInSeconds": timeInSeconds,
            "coins": coins
        };
        await updateTopScoreArray(index, newScore);
        setTopScoreToLocalStorage();
    }
}


/**
 * This function updates the top score array with the new score.
 * It adds the new score at the right position and removes the last entry if the array length exceeds the maximum number of entries.
 * It also calls the function to adjust the positions of the scores in the array.
 * 
 * @param {number} index - The index at which to insert the new score
 * @param {object} newScore - The new score object to be added to the array
 */
async function updateTopScoreArray(index, newScore) {
    topScore.splice(index, 0, newScore);
    if (topScore.length > maxTopScores) {
        topScore.pop();
    }
    await adjustTopScorePositions();
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


/**
 * This function shows the top score in the table.
 * It clears the existing content of the table and adds the header.
 * It then loops through the top score array and adds each score to the table.
 * If there are less than the maximum amount of entries, it adds empty score elements to fill the table.
 */
async function showTopScore() {
    const scoreTable = document.getElementById('table-top-scores')
    scoreTable.innerHTML = '';
    scoreTable.innerHTML += await createTableHeaderHTML();

    for (let i = 0; i < maxTopScores; i++) {
        if (i < topScore.length) {
            let formattedTime = await formatTime(topScore[i].timeInSeconds);
            scoreTable.innerHTML += await createFilledScoreElementHTML(i, formattedTime);
        } else {
            scoreTable.innerHTML += await createEmptyScoreElementHTML();
        }
    }
    document.getElementById('list-top-scores').classList.remove('d-none');
}


/**
 * This function creates the header of the score table.
 * 
 * @returns {string} - The HTML string for the table header
 */
async function createTableHeaderHTML() {
    return `
        <tr>
            <th>Pos.</th>
            <th class="ta-left column-name-width">Name</th>
            <th><img src="./img/game/navigation/timer_white.png" class="table-img-timer"></th>
            <th><img src="./img/game/navigation/coin_score.png" class="table-img-coin"></th>
        </tr>`;
}
    

/**
 * This function creates the HTML for a filled score element in the table.
 * It takes the index of the score and the formatted time as parameters.
 * 
 * @param {number} i - The index of the score in the top score array 
 * @param {number} formattedTime - The formatted time string in the format mm:ss 
 * @returns {string} - The HTML string for the filled score element
 */
async function createFilledScoreElementHTML(i, formattedTime) {
    return `
    <tr>
        <td>${topScore[i].position}</td>
        <td class="ta-left column-name-width">${topScore[i].name}</td>
        <td>${formattedTime}</td>
        <td>${topScore[i].coins}</td>
    </tr>`;
}


/**
 * This function creates the HTML for an empty score element in the table.
 * It is used when there are less than 5 scores in the top score array.
 * 
 * @returns {string} - The HTML string for the empty score element
 */
async function createEmptyScoreElementHTML() {
    return `
    <tr>
        <td>-</td>
        <td class="ta-left column-name-width">...</td>
        <td>-:-</td>
        <td>-</td>
    </tr>`;
}


/**
 * This function formats the time in seconds into a string of the format mm:ss.
 * It uses the twoDigits function to ensure that both minutes and seconds are always two digits long.
 * 
 * @param {number} seconds - The time in seconds to be formatted
 * @returns {string} - The formatted time string in the format mm:ss
 */
async function formatTime (seconds) {
    let minutes = Math.floor(seconds / 60);
    let secondsLeft = seconds % 60;
    return `${twoDigits(minutes)}:${twoDigits(secondsLeft)}`;
}


/**
 * This function takes a number and returns it as a string with at least two digits.
 * If the number is less than 10, it will be padded with a leading zero.
 * 
 * @param {number} digit - The number to be formatted
 * @returns {string} - The formatted number as a string with at least two digits
 */
function twoDigits(digit) {
    return digit.toString().padStart(2, "0");
}