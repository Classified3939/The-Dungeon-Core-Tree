var combatInfoString = "Battle will be recapped here... once you've had one!"
var mostRecentInfo = "Last battle...<br>";
var infoCount = 1;

function clearInfoString(){
    combatInfoString = "Last battle...<br>"
    mostRecentInfo = " ";
}

function killEnemy(enemyName){
    let newInfo = enemyName + " was killed!";
    if (mostRecentInfo === " ") {
        mostRecentInfo = newInfo;
    }
    else if (mostRecentInfo === newInfo) infoCount += 1
    else {
        combatInfoString = combatInfoString + mostRecentInfo + " (x" + infoCount + ")<br>"
        mostRecentInfo = newInfo;
        infoCount = 1;
    }
}

function woundEnemy(enemyName,damageAmount){
    let newInfo = enemyName + " was wounded for " + damageAmount + " damage!"
    if (mostRecentInfo === " ") {
        mostRecentInfo = newInfo;
    }
    else if (mostRecentInfo === newInfo) infoCount += 1
    else {
        combatInfoString = combatInfoString + mostRecentInfo + " (x" + infoCount + ")<br>"
        mostRecentInfo = newInfo;
        infoCount = 1;
    }
}

function destroyTrap(trapName, enemyName){
    let newInfo =  trapName + " was destroyed by "+ enemyName + "!"
    if (mostRecentInfo === " ") {
        mostRecentInfo = newInfo;
    }
    else if (mostRecentInfo === newInfo) infoCount += 1
    else {
        combatInfoString = combatInfoString + mostRecentInfo + " (x" + infoCount + ")<br>"
        mostRecentInfo = newInfo;
        infoCount = 1;
    }
}

function finishInfo(){
    if (mostRecentInfo == " ") combatInfoString = combatInfoString + "...nothing happened.";
    else combatInfoString = combatInfoString + mostRecentInfo + " (x" + infoCount + ")"
    infoCount = 1;
}

function nextWaveInfo(){
    combatInfoString = combatInfoString + "<br>You move on to the next wave of enemies!"
}