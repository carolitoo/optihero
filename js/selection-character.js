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



async function getIndexOfCharacter(character) {
    return selectableCharacters.findIndex(char => char.idCharacter === character);
}


async function previousCharacter() {
    indexOfSelectedCharacter = await getIndexOfCharacter(selectedCharacter);
    if (indexOfSelectedCharacter === 0) {
        selectedCharacter = selectableCharacters[selectableCharacters.length - 1].idCharacter;
    } else {
        selectedCharacter = selectableCharacters[indexOfSelectedCharacter - 1].idCharacter;
    }
    await renderCharacterSelection();
}


async function nextCharacter() {
    indexOfSelectedCharacter = await getIndexOfCharacter(selectedCharacter);
    if (indexOfSelectedCharacter === selectableCharacters.length - 1) {
        selectedCharacter = selectableCharacters[0].idCharacter;
    } else {
        selectedCharacter = selectableCharacters[indexOfSelectedCharacter + 1].idCharacter;
    }
    await renderCharacterSelection();
}


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


async function renderCharacterSelection() {
    indexOfSelectedCharacter = await getIndexOfCharacter(selectedCharacter);
    await determinePredecessors();
    await determineSuccessors();

    document.getElementById('profile-1').innerHTML = await generatePreviousProfileHTML(indexOfPredecessor2);
    document.getElementById('profile-2').innerHTML = await generatePreviousProfileHTML(indexOfPredecessor1);
    document.getElementById('profile-3').innerHTML = await generateSelectedProfileHTML(indexOfSelectedCharacter);
    document.getElementById('profile-4').innerHTML = await generateNextProfileHTML(indexOfSuccessor1);
    document.getElementById('profile-5').innerHTML = await generateNextProfileHTML(indexOfSuccessor2);
}





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


async function generateSelectedProfileHTML(indexOfSelectedCharacter) {
    return `
        <img
            class="profile-picture"
            src="${selectableCharacters[indexOfSelectedCharacter].imgCharacter}"
            alt="${selectableCharacters[indexOfSelectedCharacter].altCharacter}"
        />
    `;
};


