// ===== Select DOM elements =====
var buttonBox = document.querySelector('.btns'),
    btns = document.querySelectorAll('.btns .btn'),
    x_turn = document.querySelector('.x_turn'),
    o_turn = document.querySelector('.o_turn'),
    showChange = document.querySelector('.showChange'),
    choose = document.querySelectorAll('.choose'),
    startingPage = document.querySelector('.starting_page'),
    mainPage = document.querySelector('.main_page'),
    winnerName = document.querySelector('.winnerName'),
    winnerPage = document.querySelector('.winner_page'),
    playAgainBtn = document.querySelector('.playAgainBtn'),
    timerAnimation = document.querySelector('.timer');

// ===== Game state =====
let changeTurn = false;   // false = X, true = O
let hasWinner = false;
let turnTimer;

// ===== Timer functions =====
function startTimer() {
    clearTimeout(turnTimer);         // clear existing timer
    resetAnimation();                // reset CSS animation
    turnTimer = setTimeout(() => {
        changeTurn = !changeTurn;    // switch turn if time runs out
        updateTurnIndicator();
        startTimer();                // restart timer for next turn
    }, 4000);                        // 4 second timer
}

function resetAnimation() {
    timerAnimation.style.animation = 'none';
    timerAnimation.offsetHeight; // force reflow
    timerAnimation.style.animation = 'animate 4s linear forwards';
}

// ===== UI indicator for whose turn =====
function updateTurnIndicator() {
    if (changeTurn) { // O’s turn
        buttonBox.classList.remove('x');
        buttonBox.classList.add('o');
        timerAnimation.style.backgroundColor = '#A80D2A';
        showChange.style.left = '155px';
        showChange.style.backgroundColor = '#A80D2A';
        o_turn.style.color = '#fff';
        x_turn.style.color = '#000';
    } else { // X’s turn
        buttonBox.classList.add('x');
        buttonBox.classList.remove('o');
        timerAnimation.style.backgroundColor = '#183153';
        showChange.style.left = '0';
        showChange.style.backgroundColor = '#183153';
        o_turn.style.color = '#000';
        x_turn.style.color = '#fff';
    }
}

// ===== Player chooses X or O to start =====
choose.forEach(chooseNow => {
    chooseNow.addEventListener('click', () => {
        if (chooseNow.id === 'playerX') {
            changeTurn = false; // X starts
        } else {
            changeTurn = true;  // O starts
        }
        startingPage.style.display = 'none';
        mainPage.style.display = 'block';
        updateTurnIndicator();
        startTimer();
    });
});

// ===== Example: Play again =====
playAgainBtn.addEventListener('click', () => {
    winnerPage.style.display = 'none';
    mainPage.style.display = 'block';
    changeTurn = false;
    hasWinner = false;
    updateTurnIndicator();
    startTimer();
});
