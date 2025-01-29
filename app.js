const friendNameInput = document.getElementById('friendName');
const friendsListElement = document.getElementById('friendsList');
const resultElement = document.getElementById('result');
const warningElement = document.getElementById('warning');
const drawButton = document.getElementById('draw-button');

const friendsNames = [];

let isAValidDraw = false;

const showError = (message) => {
    warningElement.textContent = message;
    warningElement.style.display = 'flex';
};

const clearError = () => {
    warningElement.style.display = 'none';
};

const showResult = (result) => {
    resultElement.style.display = 'flex';
    resultElement.textContent = result;
};

const clearResult = () => {
    resultElement.style.display = 'none';
};

const toggleDrawButton = () => {
    drawButton.disabled = !isAValidDraw;
    drawButton.style.cursor = isAValidDraw ? 'pointer' : 'not-allowed';
    drawButton.style.backgroundColor = isAValidDraw ? '#FE652B' : '#8a8a8a';
    drawButton.style.color = isAValidDraw ? '#FFF' : '#000';
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
        showError('You need to enter a valid name. \n(Non-empty and bigger than one character)');
    };

    return isValidName;
};

const checkForRepeatedName = (name) => {
    const repeatedName = friendsNames.some(item => item.toLowerCase() === name.toLowerCase());

    if (repeatedName) {
        showError('This name already exists on list.\nIn order to make a fair draw, please enter a different name or add a surname.');
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
    listElement.innerHTML = namesArray.map(name => `<li class="friend-item">${name}</li>`).join('');
};

const addANewFriend = () => {
    clearError();
    

    const friendToAdd = getFriendNameFromInput();

    if (!friendToAdd || checkForRepeatedName(friendToAdd)) return;

    friendsNames.unshift(friendToAdd);
    clearInputOnClick();

    addFriendNameToTheList(friendsNames, friendsListElement);
    checkForValidDraw(friendsNames.length);
    toggleDrawButton();

    friendsListElement.classList.toggle('two-columns', friendsNames.length > 8);
};

const hideTheNamesList = (listElementsQtt, listElement) => {
    listElement.innerHTML = '';
    
    const hiddenList = Array(listElementsQtt).fill(' ').map((_) => {
        return `<li class="friend-item"></li>`;
    });

    if (hiddenList.length > 0) {
        listElement.innerHTML = hiddenList.join('\n');
    };
};

const drawAFriend = () => {
    clearError();

    if (!isAValidDraw && friendsNames.length < 3) {
        showError('You need to enter at least three friends to make a draw. \nEnter the names and try again.');
        
        return;
    } else if (friendsNames.length <= 0) {
        clearResult();
        isAValidDraw = false;
        toggleDrawButton();
        return;
    };

    resultElement.innerHTML = '';
    
    const drawnFriendName = friendsNames.splice(Math.floor(Math.random() * friendsNames.length), 1)[0];

    hideTheNamesList(friendsNames.length, friendsListElement);
    
    showResult(`Your secret friend is ${drawnFriendName}`);
};
