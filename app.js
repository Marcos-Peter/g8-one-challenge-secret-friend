const friendNameInput = document.getElementById('friendName');
const friendsListElement = document.getElementById('friendsList');
const resultElement = document.getElementById('result');
const drawButton = document.getElementById('draw-button');

// const friendsNames = [];
const friendsNames = ['Marcos', 'Victor', 'Lilian', 'Gabriela', 'Maria', 'Renato', 'Gaia', 'Laika'];

const listElementStyle = `
    margin-bottom: 8px;
    background-color: #C4C4C4;
    font-weight: 600;
    border-radius: 8px;
    text-align: center;
    padding: 4px;
    min-width: 300px;
    min-height: 30px;
`;

let isAValidDraw = false;

const toggleDrawButton = () => {
    if (isAValidDraw) {
        drawButton.removeAttribute('disabled');
        drawButton.style.cursor = 'pointer';
        drawButton.style.backgroundColor = ' #FE652B';
        drawButton.style.color = '#FFF';
    } else {
        drawButton.setAttribute('disabled', true);
        drawButton.style.cursor = 'not-allowed';
        drawButton.style.backgroundColor = 'rgb(138, 138, 138)';
        drawButton.style.color = '#000';
    };
};

toggleDrawButton();

const checkForValidDraw = (friendsNamesQtt) => {
    isAValidDraw = friendsNamesQtt >= 3;
};

const clearInputOnClick = () => {
    friendNameInput.value = '';
};

const checkForValidName = (name) => {
    const isValidName = name.trim() && name.length > 1;

    if (!isValidName) {
        alert('You need to enter a valid name. \n(Non-empty and bigger than one character)');
    };

    return isValidName;
};

const checkForRepeatedName = (name) => {
    const repeatedName = friendsNames.some(item => item.toLowerCase() === name.toLowerCase());

    if (repeatedName) {
        alert('This name already exists on list.\nIn order to make a fair draw, please enter a different name or add a surname.');
    };

    return repeatedName;
};

const getFriendNameFromInput = () => {
    const friendName = friendNameInput.value;

    if (checkForValidName(friendName)) return friendName;

    clearInputOnClick();

    return;
};

const addFriendNameToTheList = (namesArray, listElement) => {
    listElement.innerHTML = '';
    
    const newNamesList = namesArray.map((name) => {
        return `<li style='${listElementStyle}' blue'>${name}</li>`;
    });

    if (newNamesList.length > 0) {
        listElement.innerHTML = newNamesList.join('\n');
    };
};

const addANewFriend = () => {
    const friendToAdd = getFriendNameFromInput();

    if (!friendToAdd || checkForRepeatedName(friendToAdd)) return;

    friendsNames.unshift(friendToAdd);
    clearInputOnClick();

    addFriendNameToTheList(friendsNames, friendsListElement);
    checkForValidDraw(friendsNames.length);
    toggleDrawButton();

    friendsListElement.setAttribute('style', `column-count: ${friendsNames.length > 8 ? '2' : '1'};`);
};

const hideTheNamesList = (listElementsQtt, listElement) => {
    listElement.innerHTML = '';
    
    const hiddenList = Array(listElementsQtt).fill(' ').map((_) => {
        return `<li style='${listElementStyle}' blue'></li>`;
    });

    if (hiddenList.length > 0) {
        listElement.innerHTML = hiddenList.join('\n');
    };
};

const drawAFriend = () => {
    if (!isAValidDraw && friendsNames.length < 3) {
        alert('You need to enter at least three friends to make a draw. \nEnter the names and try again.');
        
        return;
    } else if (friendsNames.length <= 0) {
        resultElement.innerHTML = '';
        isAValidDraw = false;
        toggleDrawButton();
        return;
    };

    resultElement.innerHTML = '';
    
    const drawnNumber = Math.floor(Math.random() * friendsNames.length);
    const drawnFriendName = friendsNames[drawnNumber];
    console.log(drawnNumber);
    
    friendsNames.splice(drawnNumber, 1);
    hideTheNamesList(friendsNames.length, friendsListElement);
    
    resultElement.innerHTML = `Your secret friend is ${drawnFriendName}`;
};
