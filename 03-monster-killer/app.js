const PLAYER_ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 10;
const HEAL_VALUE = 21;

const ATTACK_TYPES = {
    ATTACK: 'ATTACK',
    STRONG_ATTACK: 'STRONG_ATTACK',
};

const BATTLE_RESULTS = {
    KILL_MONSTER: 'KILL_MONSTER',
    KILL_PLAYER: 'KILL_PLAYER',
    DRAW: 'DRAW',
};

const LOG_EVENTS = {
    PLAYER_ATTACK: 'PLAYER_ATTACK',
    PLAYER_STRONG_ATTACK: 'PLAYER_STRONG_ATTACK',
    MONSTER_ATTACK: 'MONSTER_ATTACK',
    PLAYER_HEAL: 'PLAYER_HEAL',
    GAME_OVER: 'GAME_OVER',
};

const getMaxLifeValue = () => {
    const enteredValue = prompt('Maximum life for you and the monster', '100');
    const parsedValue = parseInt(enteredValue);
    if (isNaN(parsedValue) || parsedValue <= 0) {
        throw { message: 'Invalid input, not a valid number' };
    }
    return parsedValue;
};

let chosenMaxLife;
try {
    chosenMaxLife = getMaxLifeValue();
} catch (error) {
    chosenMaxLife = 100;
    console.log(error);
}
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;

let battleLog = [];
let lastLoggedEntry;

let hasBonusLife = true;

adjustHealthBars(chosenMaxLife);

const writeToBattleLog = (event, value, monsterHealth, playerHealth) => {
    let logEntry = {
        event: event,
        value: value,
        monsterHealth: monsterHealth,
        playerHealth: playerHealth,
    };
    switch (event) {
        case LOG_EVENTS.PLAYER_ATTACK:
            logEntry = {
                ...logEntry,
                target: 'MONSTER',
            };
            break;
        case LOG_EVENTS.PLAYER_STRONG_ATTACK:
            logEntry = {
                ...logEntry,
                target: 'MONSTER',
            };
            break;
        case LOG_EVENTS.PLAYER_HEAL:
            logEntry = {
                ...logEntry,
                target: 'PLAYER',
            };
            break;
        case LOG_EVENTS.MONSTER_ATTACK:
            logEntry = {
                ...logEntry,
                target: 'PLAYER',
            };
            break;
        case LOG_EVENTS.GAME_OVER:
            break;
        default:
            logEntry = {};
            break;
    }
    battleLog.push(logEntry);
};

const reset = () => {
    currentPlayerHealth = chosenMaxLife;
    currentMonsterHealth = chosenMaxLife;
    resetGame(chosenMaxLife);
};

const finishBattle = (battleResult) => {
    switch (battleResult) {
        case BATTLE_RESULTS.KILL_MONSTER:
            alert('You won!');
            writeToBattleLog(
                LOG_EVENTS.GAME_OVER,
                'PLAYER WON',
                currentMonsterHealth,
                currentPlayerHealth
            );
            break;
        case BATTLE_RESULTS.KILL_PLAYER:
            alert('You lost!');
            writeToBattleLog(
                LOG_EVENTS.GAME_OVER,
                'PLAYER LOST',
                currentMonsterHealth,
                currentPlayerHealth
            );
            break;
        case BATTLE_RESULTS.DRAW:
            alert('You have a draw!');
            writeToBattleLog(
                LOG_EVENTS.GAME_OVER,
                'BATTLE DRAW',
                currentMonsterHealth,
                currentPlayerHealth
            );
            break;
        default:
            break;
    }
};

const endRound = () => {
    const playerHealth = currentPlayerHealth;
    const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
    currentPlayerHealth -= playerDamage;

    writeToBattleLog(
        LOG_EVENTS.MONSTER_ATTACK,
        playerDamage,
        currentMonsterHealth,
        currentPlayerHealth
    );

    if (currentPlayerHealth <= 0 && hasBonusLife) {
        hasBonusLife = false;
        removeBonusLife();
        currentPlayerHealth = playerHealth;
        setPlayerHealth(playerHealth);
        alert(
            'You lost your bonus life! Your health will be restored to where it was before dying'
        );
    }

    let battleResult;
    if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
        battleResult = BATTLE_RESULTS.KILL_MONSTER;
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
        battleResult = BATTLE_RESULTS.KILL_PLAYER;
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth <= 0) {
        battleResult = BATTLE_RESULTS.DRAW;
    }
    finishBattle(battleResult);

    if (currentMonsterHealth <= 0 || currentPlayerHealth <= 0) {
        reset();
    }
};

const attackMonster = (attackType) => {
    const maxDamage =
        attackType === ATTACK_TYPES.ATTACK
            ? PLAYER_ATTACK_VALUE
            : STRONG_ATTACK_VALUE;
    const logType =
        attackType === ATTACK_TYPES.ATTACK
            ? LOG_EVENTS.PLAYER_ATTACK
            : LOG_EVENTS.PLAYER_STRONG_ATTACK;

    const monsterDamage = dealMonsterDamage(maxDamage);
    currentMonsterHealth -= monsterDamage;
    writeToBattleLog(
        logType,
        monsterDamage,
        currentMonsterHealth,
        currentPlayerHealth
    );
    endRound();
};

const healPlayerHandler = () => {
    let healValue;
    if (currentPlayerHealth >= chosenMaxLife - HEAL_VALUE) {
        alert('You can not heal more than your max health!');
        healValue = chosenMaxLife - currentPlayerHealth;
    } else {
        healValue = HEAL_VALUE;
    }
    increasePlayerHealth(healValue);
    currentPlayerHealth += healValue;
    writeToBattleLog(
        LOG_EVENTS.PLAYER_HEAL,
        healValue,
        currentMonsterHealth,
        currentPlayerHealth
    );
    endRound();
};

const attackHandler = () => attackMonster(ATTACK_TYPES.ATTACK);

const strongAttackHandler = () => attackMonster(ATTACK_TYPES.STRONG_ATTACK);

const logHandler = () => {
    let i = 0;
    for (const log of battleLog) {
        if (
            (!lastLoggedEntry && lastLoggedEntry !== 0) ||
            lastLoggedEntry < i
        ) {
            console.log('-------------------------------------------');
            console.log(`#${i}`);
            for (const key in log) {
                console.log(`${key} :   ${log[key]}`);
            }
            console.log('-------------------------------------------');
            lastLoggedEntry = i;
            break;
        }
        i++;
    }
};

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healPlayerHandler);
logBtn.addEventListener('click', logHandler);
