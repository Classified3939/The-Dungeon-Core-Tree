addLayer("a", {
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: true,                     // You can add more variables here to add them to your layer.
        points: new Decimal(0),             // "points" is the internal name for the main resource of the layer.
    }},

    color: "#9b870c",                       // The color for this layer, which affects many elements.
    resource: "achievements",            // The name of this layer's main prestige resource.
    row: "side",                                 // The row this layer is on (0 is the first row).

    type: "none",                         // Determines the formula used for calculating prestige currency.

    layerShown() { return true },          // Returns a bool for if this layer's node should be visible in the tree.

    achievements:{
        11:{
            name: "First Strike",
            tooltip: "Use one or more spike traps to attack your first enemy!<br>Unlocks a new Logbook entry.",
            done(){
                return player.c.points.gte(2) || player.c.enemies[0].hitPoints.lte(9);
            },
            onComplete(){
                player.a.points = player.a.points.add(1);
                player.l.lore2Unlocked = true;
                player.l.shouldNotify = true;
            }
        },
        12:{
            name: "Level Up!",
            tooltip: "Kill your first enemy.<br>Unlocks a new Logbook entry.",
            done(){
                return player.c.points.gte(2);
            },
            onComplete(){
                player.a.points = player.a.points.add(1);
                player.l.lore3Unlocked = true;
                player.l.shouldNotify = true;
            }
        }
    }
})