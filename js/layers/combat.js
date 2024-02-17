addLayer("c", {
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: true,
        points: new Decimal(1),                     // You can add more variables here to add them to your layer.             // "points" is the internal name for the main resource of the layer.
        traps: [],
        enemies: getWaveData(0),
        combatCooldown: new Decimal(0), 
    }},
    name: "combat", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "C", // This appears on the layer's node. Default is the id with the first letter capitalized
    color: "#8B0000",                       // The color for this layer, which affects many elements.
    resource: "Wave",            // The name of this layer's main prestige resource.
    row: 2,                                 // The row this layer is on (0 is the first row).

                                            // Also the amount required to unlock the layer.

    type: "none",                         // Determines the formula used for calculating prestige currency.
    exponent: 0.5,                          // "normal" prestige gain is (currency^exponent).

    layerShown() { return true },          // Returns a bool for if this layer's node should be visible in the tree.
    tooltip(){return "Wave "+ player.c.points},
    clickables:{
        11:{
            display(){return "<h1>Initiate Combat</h1>"},
            canClick() {return player.c.combatCooldown.lte(0) && player.c.traps.length > 0},
            onClick(){
                player.t.points = new Decimal(0);
                setBuyableAmount("t",11,new Decimal(0))
                player.c.combatCooldown = new Decimal(10);
                player.points = new Decimal(0);
                for (enemy of player.c.enemies){
                    if (enemy.killed) continue;
                    for (trap of player.c.traps){
                        if (trap.usedUp) continue;
                        enemy.attack(trap);
                    }
                }
                player.c.traps = player.c.traps.filter((t) => !t.usedUp);
                if (player.c.enemies.filter((e)=> !e.killed).length === 0){
                    if (waveData[player.c.points]){
                        player.c.enemies = getWaveData(player.c.points);
                        player.c.points = player.c.points.add(1);
                    }
                    else{
                        player.c.enemies = getWaveData(player.c.points.sub(1));
                    }
                }
                player.c.enemies = player.c.enemies.filter((e) => !e.killed);
            }
        }
    },
    tabFormat:[
        ["display-text",
        () => {return "You have been challenged by wave <h1 style='color:#8B0000'>" + player.c.points + "</h1>"}],
        ["display-text",
        () => {
            var waveString = "It features:<br>";
            var enemyName = player.c.enemies[0].name;
            var enemyLevel = player.c.enemies[0].level;
            var enemyHealth = player.c.enemies[0].hitPoints
            if (player.c.enemies.length == 1){
                waveString = waveString + "1 " + enemyName + " ("+ enemyHealth + " Health)";
                return waveString;
            }
            var enemyNumber = 0;
            for (let i = 0; i < player.c.enemies.length; i++){
                if (player.c.enemies[i].name == enemyName && new Decimal(player.c.enemies[i].level).equals(enemyLevel) &&
                   new Decimal(player.c.enemies[i].hitPoints).equals(enemyHealth)){
                    enemyNumber++;
                }
                else{
                    waveString = waveString + enemyNumber + " " + enemyName  + " ("+ enemyHealth + " Health)" + "<br>";
                    enemyName = player.c.enemies[i].name;
                    enemyLevel = player.c.enemies[i].level;
                    enemyHealth = player.c.enemies[i].hitPoints
                    enemyNumber = 1;
                }
            }
            waveString = waveString + enemyNumber + " " + enemyName  + " ("+ enemyHealth + " Health)";
            return waveString;
        }],
        "blank",
        "clickables",
        ["display-text",
        () => {return "Cooldown: " + player.c.combatCooldown.toFixed(2) + " seconds."},
        ],
        "blank",
        ["display-text",
        () => {
            let attackString = "You have 1 dungeon floor.<br>";
            if (player.c.traps.length === 0) return attackString + "You haven't set any traps!";
            let trapName = player.c.traps[0].name;
            let trapHealth = player.c.traps[0].hitPoints;
            let trapDamage = player.c.traps[0].damage;
            if (player.c.traps.length === 1){
                attackString = attackString + "You have 1 "+ trapName + " (" + trapDamage + " damage) with " + trapHealth + " hitpoints remaining";
                return attackString;
            }
            let trapNumber = 0;
            for (let i = 0; i < player.c.traps.length; i++){
                if (player.c.traps[i].name == trapName && new Decimal(player.c.traps[i].hitPoints).equals(trapHealth)){
                    trapNumber++;
                }
                else{
                    attackString = attackString + "You have " + trapNumber + " " + trapName + " (" + Decimal.mul(trapDamage,trapNumber) + " damage) with " + trapHealth + " hitpoints remaining<br>";
                    trapName = player.c.traps[i].name;
                    trapHealth = player.c.traps[i].hitPoints;
                    trapDamage = player.c.traps[i].damage;
                    trapNumber = 1;
                }
            }
            attackString = attackString + "You have " + trapNumber + " " + trapName + " (" + Decimal.mul(trapDamage,trapNumber) + " damage) with " + trapHealth + " hitpoints remaining";
            return attackString;
        }],
    ],
    branches: ["t"],
    update(diff){
        player.c.combatCooldown = player.c.combatCooldown.sub(diff);
        if (Decimal.lte(player.c.combatCooldown,0)) player.c.combatCooldown = new Decimal(0);
    },
    refreshComponents(){
        if (typeof(player.c.enemies[0].attack) === "undefined"){
            for (let i = 0; i < player.c.enemies.length; i++){
                let enemyLevel = player.c.enemies[i].level;
                let enemyHealth = player.c.enemies[i].hitPoints;
                switch (player.c.enemies[i].id){
                    case "warriorEnemy":
                        player.c.enemies[i] = new WarriorEnemy(enemyLevel,enemyHealth);
                        break;
                }
            }
        }
        if (typeof(player.c.traps[0]) === "undefined") return;
        if (typeof(player.c.traps[0].use) === "undefined"){
            for (let i = 0; i < player.c.traps.length; i ++){
                let trapHealth = player.c.traps[i].hitPoints;
                switch (player.c.traps[i].id){
                    case "spikeTrap":
                        player.c.traps[i] = new SpikeTrap(trapHealth);
                }
            }
        }
    },
    hotkeys: [
        {
            key: "c", // What the hotkey button is. Use uppercase if it's combined with shift, or "ctrl+x" for holding down ctrl.
            description: "c: Initiate combat.", // The description of the hotkey that is displayed in the game's How To Play tab
            onPress() { if (layers.c.clickables[11].canClick()) {
                layers.c.clickables[11].onClick()
            }},
        }
    ]
})