addLayer("h", {
    symbol: "?",
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: true,                     // You can add more variables here to add them to your layer.
        points: new Decimal(0),             // "points" is the internal name for the main resource of the layer.
        entryShown: "displayWarrior"
    }},

    color: "#ADD8E6",                       // The color for this layer, which affects many elements.
    resource: "entries",            // The name of this layer's main prestige resource.
    row: "side",                                 // The row this layer is on (0 is the first row).

    type: "none",                         // Determines the formula used for calculating prestige currency.

    layerShown() { return hasAchievement("a",13)},          // Returns a bool for if this layer's node should be visible in the tree.

    clickables:{
        11:{
            display() {return "<h1>Warrior</h1>"},
            onClick() {player.h.entryShown = "displayWarrior"},
            canClick() {return true},
        },
        12:{
            display() {return "<h1>Mage</h1>"},
            onClick() {player.h.entryShown = "displayMage"},
            canClick() {return true},
        },
        13:{
            display(){return "<h1>Scout</h1>"},
            onClick() {player.h.entryShown = "displayScout"},
            canClick() {return player.c.points.gte(8)}
        }
    },

    tabFormat: [
        "clickables",
        "blank",
        ["display-text",
            function() 
            {
                switch (player.h.entryShown){
                    case "displayWarrior":
                        return DisplayWarrior();
                    case "displayMage":
                        return DisplayMage();
                    case "displayScout":
                        return DisplayScout();
                }
            }    
    ]
    ]
})