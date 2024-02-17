let waveData = [
    [["warriorEnemy",new Decimal(1)]],
    [["warriorEnemy",new Decimal(1)],["warriorEnemy",new Decimal(1)],["warriorEnemy",new Decimal(1)],["warriorEnemy",new Decimal(1)]],
];

function getWaveData(waveNumber){
    let currentWave = waveData[waveNumber];
    let enemyArray = [];
    for (let enemy of currentWave){
        switch(enemy[0]){
            case "warriorEnemy":
                enemyArray.push(new WarriorEnemy(enemy[1]));
                break;
        }
    }
    return enemyArray;
}