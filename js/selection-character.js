let selectedCharacter = 15;
let indexOfSelectedCharacter;
let indexOfPredecessor1;
let indexOfPredecessor2;
let indexOfSuccessor1;
let indexOfSuccessor2;

let selectableCharacters = [
    {
        "idCharacter": 1,
        "imgCharacter": "./img/character/Character1/Idle/Character01-Idle_00.png",
        "altCharacter": "Character1"
    },
    {
        "idCharacter": 3,
        "imgCharacter": "./img/character/Character3/Idle/Character03-Idle_00.png",
        "altCharacter": "Character3"
    },
    {
        "idCharacter": 10,
        "imgCharacter": "./img/character/Character10/Idle/Character010-Idle_00.png",
        "altCharacter": "Character10"
    },
    {
        "idCharacter": 12,
        "imgCharacter": "./img/character/Character12/Idle/Character012-Idle_00.png",
        "altCharacter": "Character12"
    },
    {
        "idCharacter": 13,
        "imgCharacter": "./img/character/Character13/Idle/Character013-Idle_00.png",
        "altCharacter": "Character13"
    },
    {
        "idCharacter": 15,
        "imgCharacter": "./img/character/Character15/Idle/Character015-Idle_00.png",
        "altCharacter": "Character15"
    }
]


/**
 * This function retrieves the index of a character in the selectableCharacters array.
 * It uses the findIndex method to search for the character by its id.
 * 
 * @param {number} character - The id of the character to find.
 * @returns - The index of the character in the selectableCharacters array.
 */
async function getIndexOfCharacter(character) {
    return selectableCharacters.findIndex(char => char.idCharacter === character);
}


/**
 * This function is called when the user clicks on the previous character profile.
 * It retrieves the index of the selected character and updates the selected character to the previous one in the list.
 * It wraps around to the last character if the current character is the first in the list.
 * It then calls the renderCharacterSelection function to update the displayed profiles.
 */
async function previousCharacter() {
    indexOfSelectedCharacter = await getIndexOfCharacter(selectedCharacter);
    if (indexOfSelectedCharacter === 0) {
        selectedCharacter = selectableCharacters[selectableCharacters.length - 1].idCharacter;
    } else {
        selectedCharacter = selectableCharacters[indexOfSelectedCharacter - 1].idCharacter;
    }
    await renderCharacterSelection();
}


/**
 * This function is called when the user clicks on the second previous character profile.
 * It retrieves the index of the selected character and updates the selected character to the second previous one in the list.
 * It wraps around to the last/ second last character if the current character is the first/ second in the list.
 * It then calls the renderCharacterSelection function to update the displayed profiles.
 */
async function previousCharacter2() { 
    indexOfSelectedCharacter = await getIndexOfCharacter(selectedCharacter);
    if (indexOfSelectedCharacter === 0) {
        selectedCharacter = selectableCharacters[selectableCharacters.length - 2].idCharacter;
    } else {
        selectedCharacter = selectableCharacters[indexOfSelectedCharacter - 2].idCharacter;
    }
    await renderCharacterSelection();
}


/**
 * This function is called when the user clicks on the next character profile.
 * It retrieves the index of the selected character and updates the selected character to the next one in the list.
 * It wraps around to the first character if the current character is the last in the list.
 * It then calls the renderCharacterSelection function to update the displayed profiles.
 */
async function nextCharacter() {
    indexOfSelectedCharacter = await getIndexOfCharacter(selectedCharacter);
    if (indexOfSelectedCharacter === selectableCharacters.length - 1) {
        selectedCharacter = selectableCharacters[0].idCharacter;
    } else {
        selectedCharacter = selectableCharacters[indexOfSelectedCharacter + 1].idCharacter;
    }
    await renderCharacterSelection();
}


/**
 * This function is called when the user clicks on the second next character profile.
 * It retrieves the index of the selected character and updates the selected character to the second next one in the list.
 * It wraps around to the first/ second character if the current character is the second to last/ last in the list.
 * It then calls the renderCharacterSelection function to update the displayed profiles.
 */
async function nextCharacter2() {
    indexOfSelectedCharacter = await getIndexOfCharacter(selectedCharacter);
    if (indexOfSelectedCharacter === selectableCharacters.length - 2) {
        selectedCharacter = selectableCharacters[0].idCharacter;
    } else if (indexOfSelectedCharacter === selectableCharacters.length - 1) {
        selectedCharacter = selectableCharacters[1].idCharacter;
    } else {
        selectedCharacter = selectableCharacters[indexOfSelectedCharacter + 2].idCharacter;
    }
    await renderCharacterSelection();
}


/**
 * This function determines and sets the indices of the predecessor characters based on the index of the selected character.
 * If the selected character is the first in the list, it wraps around to the last two characters.
 * If the selected character is the second in the list, it sets the first and last characters as predecessors.
 * Otherwise, it sets the two characters before the selected character as predecessors.
 */
async function determinePredecessors() { 
    if (indexOfSelectedCharacter === 0) {
        indexOfPredecessor1 = selectableCharacters.length - 1;
        indexOfPredecessor2 = selectableCharacters.length - 2;
    } else if (indexOfSelectedCharacter === 1) {
        indexOfPredecessor1 = indexOfSelectedCharacter - 1;
        indexOfPredecessor2 = selectableCharacters.length - 1;
    } else {
        indexOfPredecessor1 = indexOfSelectedCharacter - 1;
        indexOfPredecessor2 = indexOfSelectedCharacter - 2;
    }
}


/**
 * This function determines and sets the indices of the successor characters based on the index of the selected character.
 * If the selected character is the last in the list, it wraps around to the first two characters.
 * If the selected character is the second to last in the list, it sets the last and first characters as successors.
 * Otherwise, it sets the two characters after the selected character as successors.
 */
async function determineSuccessors() {
    if (indexOfSelectedCharacter === selectableCharacters.length - 1) {
        indexOfSuccessor1 = 0;
        indexOfSuccessor2 = 1;
    } else if (indexOfSelectedCharacter === selectableCharacters.length - 2) {
        indexOfSuccessor1 = indexOfSelectedCharacter + 1;
        indexOfSuccessor2 = 0;
    } else {
        indexOfSuccessor1 = indexOfSelectedCharacter + 1;
        indexOfSuccessor2 = indexOfSelectedCharacter + 2;
    }
}


/**
 * This function retrieves the index of the selected character, determines the predecessors and successors, and generates the HTML for each profile.
 */
async function renderCharacterSelection() {
    indexOfSelectedCharacter = await getIndexOfCharacter(selectedCharacter);
    await determinePredecessors();
    await determineSuccessors();

    document.getElementById('profile-1').innerHTML = await generatePreviousProfileHTML2(indexOfPredecessor2);
    document.getElementById('profile-2').innerHTML = await generatePreviousProfileHTML(indexOfPredecessor1);
    document.getElementById('profile-3').innerHTML = await generateSelectedProfileHTML(indexOfSelectedCharacter);
    document.getElementById('profile-4').innerHTML = await generateNextProfileHTML(indexOfSuccessor1);
    document.getElementById('profile-5').innerHTML = await generateNextProfileHTML2(indexOfSuccessor2);
}


/**
 * This function generates the HTML for the previous character profile.
 * The image element has an onclick event that calls the previousCharacter function when clicked.
 * 
 * @param {number} indexOfCharacter - The index of the character in the selectableCharacters array.
 * @returns - The HTML string for the previous character profile.
 */
async function generatePreviousProfileHTML(indexOfCharacter) {
    return `
       <img
            class="profile-picture"
            src="${selectableCharacters[indexOfCharacter].imgCharacter}"
            alt="${selectableCharacters[indexOfCharacter].altCharacter}"
            onclick="previousCharacter()"
        />
    `;
}


/**
 * This function generates the HTML for the second previous character profile.
 * The image element has an onclick event that calls the previousCharacter2 function when clicked.
 * 
 * @param {number} indexOfCharacter - The index of the character in the selectableCharacters array.
 * @returns The HTML string for the second previous character profile.
 */
async function generatePreviousProfileHTML2(indexOfCharacter) {
    return `
       <img
            class="profile-picture"
            src="${selectableCharacters[indexOfCharacter].imgCharacter}"
            alt="${selectableCharacters[indexOfCharacter].altCharacter}"
            onclick="previousCharacter2()"
        />
    `;
}



/**
 * This function generates the HTML for the next character profile.
 * The image element has an onclick event that calls the nextCharacter function when clicked.
 * 
 * @param {number} indexOfCharacter - The index of the character in the selectableCharacters array. 
 * @returns - The HTML string for the next character profile.
 */
async function generateNextProfileHTML(indexOfCharacter) {
    return `
        <img
            class="profile-picture"
            src="${selectableCharacters[indexOfCharacter].imgCharacter}"
            alt="${selectableCharacters[indexOfCharacter].altCharacter}"
            onclick="nextCharacter()"
        />
    `;
}


/**
 * This function generates the HTML for the second next character profile.
 * The image element has an onclick event that calls the nextCharacter2 function when clicked.
 * 
 * @param {number} indexOfCharacter - The index of the character in the selectableCharacters array.
 * @returns - The HTML string for the second next character profile.
 */
async function generateNextProfileHTML2(indexOfCharacter) {
    return `
        <img
            class="profile-picture"
            src="${selectableCharacters[indexOfCharacter].imgCharacter}"
            alt="${selectableCharacters[indexOfCharacter].altCharacter}"
            onclick="nextCharacter2()"
        />
    `;
}


/**
 * This function generates the HTML for the selected character profile.
 * The image element does not have an onclick event.
 * 
 * @param {number} indexOfSelectedCharacter - The index of the selected character in the selectableCharacters array. 
 * @returns - The HTML string for the selected character profile.
 */
async function generateSelectedProfileHTML(indexOfSelectedCharacter) {
    return `
        <img
            class="profile-picture"
            src="${selectableCharacters[indexOfSelectedCharacter].imgCharacter}"
            alt="${selectableCharacters[indexOfSelectedCharacter].altCharacter}"
        />
    `;
};


