const startGameBtn = document.getElementById('start-game-btn');

let gameIsRunning = false;

const PLAYER_CHOICES = {
    ROCK: 'ROCK',
    PAPER: 'PAPER',
    SCISSORS: 'SCISSORS',
};

const GAME_RESULTS = {
    PLAYER_WON: 'PLAYER_WON',
    COMPUTER_WON: 'COMPUTER_WON',
    DRAW: 'DRAW',
};

const getPlayerChoice = () => {
    const selection = prompt(
        `${PLAYER_CHOICES.ROCK}, ${PLAYER_CHOICES.PAPER} or ${PLAYER_CHOICES.SCISSORS}?`,
        ''
    ).toUpperCase();
    if (
        selection !== PLAYER_CHOICES.ROCK &&
        selection !== PLAYER_CHOICES.PAPER &&
        selection !== PLAYER_CHOICES.SCISSORS
    ) {
        alert('Invalid choice!');
        return getPlayerChoice();
    }
    return selection;
};

const getComputerChoice = () => {
    const randomValue = Math.random();
    if (randomValue < 0.34) {
        return PLAYER_CHOICES.ROCK;
    } else if (randomValue < 0.67) {
        return PLAYER_CHOICES.PAPER;
    } else {
        return PLAYER_CHOICES.SCISSORS;
    }
};

const getResults = (playerChoice, computerChoice) => {
    if (playerChoice === computerChoice) {
        return GAME_RESULTS.DRAW;
    } else if (
        (computerChoice === PLAYER_CHOICES.ROCK &&
            playerChoice === PLAYER_CHOICES.PAPER) ||
        (computerChoice === PLAYER_CHOICES.PAPER &&
            playerChoice === PLAYER_CHOICES.SCISSORS) ||
        (computerChoice === PLAYER_CHOICES.SCISSORS &&
            playerChoice === PLAYER_CHOICES.ROCK)
    ) {
        return GAME_RESULTS.PLAYER_WON;
    } else {
        return GAME_RESULTS.COMPUTER_WON;
    }
};

startGameBtn.addEventListener('click', function () {
    if (gameIsRunning) {
        return;
    }
    gameIsRunning = true;
    console.log('Game is starting...');
    const playerSelection = getPlayerChoice();
    const computerSelection = getComputerChoice();
    const winner = getResults(playerSelection, computerSelection);
    console.log('Player =>', playerSelection);
    console.log('Computer =>', computerSelection);
    console.log('Results =>', winner);
});
