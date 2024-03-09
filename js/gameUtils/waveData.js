
function getWaveData(waveNumber){
    if (typeof(WarriorEnemy) === "undefined"){
        return;
    }
    let currentWave = waveData[waveNumber];
    let enemyArray = [];
    for (let enemy of currentWave){
        switch(enemy[0]){
            case "warrior":
                enemyArray.push(new WarriorEnemy(enemy[1]));
                break;
            case "mage":
                enemyArray.push(new MageEnemy(enemy[1]));
                break;
            case "scout":
                enemyArray.push(new ScoutEnemy(enemy[1]));
                break;
        }
    }
    return enemyArray;
}

let waveData = [
    [
        ["warrior",new Decimal(1)]
    ],
    [
        ["warrior",new Decimal(1)],
        ["warrior",new Decimal(1)],
        ["warrior",new Decimal(1)],
    ],
    [
        ["warrior",new Decimal(1)],
        ["warrior",new Decimal(1)],
        ["warrior",new Decimal(2)],
    ],
    [
        ["warrior",new Decimal(2)],
        ["warrior",new Decimal(3)],
        ["mage", new Decimal(1)],
    ],
    //wave 5
    [
        ["mage",new Decimal(2)],
        ["warrior",new Decimal(3)],
        ["mage", new Decimal(2)],
        ["warrior",new Decimal(3)],
    ],
    [
        ["warrior",new Decimal(4)],
        ["warrior", new Decimal(4)],
        ["mage",new Decimal(4)],
    ],
    [
        ["mage",new Decimal(5)],
        ["mage",new Decimal(5)],
        ["mage",new Decimal(5)],
    ],
    [
        ["scout",new Decimal(3)],
        ["warrior",new Decimal(6)],
        ["mage",new Decimal(5)],
    ],
    [
        ["scout",new Decimal(4)],
        ["scout",new Decimal(5)],
        ["warrior",new Decimal(6)],
        ["mage",new Decimal(5)],
    ],
    //wave 10
    [
        ["scout",new Decimal(6)],
        ["scout",new Decimal(6)],
        ["warrior",new Decimal(7)],
        ["warrior",new Decimal(7)],
        ["mage", new Decimal(7)],
    ],
    [
        ["warrior",new Decimal(1)],
    ]
];