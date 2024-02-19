addLayer("r", {
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: false,                     // You can add more variables here to add them to your layer.
        points: new Decimal(0),             // "points" is the internal name for the main resource of the layer.
    }},

    color: "#CFCAFF",                       // The color for this layer, which affects many elements.
    resource: "research points",            // The name of this layer's main prestige resource.
    row: 1,                                 // The row this layer is on (0 is the first row).
    position: 1,

    baseResource: "mana",                 // The name of the resource your prestige gain is based on.
    baseAmount() { return player.points },  // A function to return the current amount of baseResource.

    requires: new Decimal(10),              // The amount of the base needed to  gain 1 of the prestige currency.
                                            // Also the amount required to unlock the layer.

    type: "normal",                         // Determines the formula used for calculating prestige currency.
    exponent: 0.5,                          // "normal" prestige gain is (currency^exponent).

    gainMult() {                            // Returns your multiplier to your gain of the prestige resource.
        return new Decimal(1)               // Factor in any bonuses multiplying gain here.
    },
    gainExp() {                             // Returns the exponent to your gain of the prestige resource.
        return new Decimal(1)
    },

    layerShown() { return player.r.unlocked },          // Returns a bool for if this layer's node should be visible in the tree.

    upgrades: {
        11:{
        title: "Slippery Floor",
        description: "Low damage but long lasting.",
        cost: new Decimal(3)
        },
       12:{
        title:"Camouflaged Spike Trap",
        description: "Replaces regular Spike Trap.",
        cost: new Decimal(5)
       },
       13:{
        title: "Arrow Shooter",
        description: "Powerful trap that fires exactly once.",
        cost: new Decimal(8),
       }
    },
    hotkeys: [
        {
            key: "r", // What the hotkey button is. Use uppercase if it's combined with shift, or "ctrl+x" for holding down ctrl.
            description: "r: Research Points.", // The description of the hotkey that is displayed in the game's How To Play tab
            onPress() { if (player.r.unlocked) doReset("r") },
        }
    ]
})