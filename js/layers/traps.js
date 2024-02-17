addLayer("t", {
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: true,                     // You can add more variables here to add them to your layer.
        points: new Decimal(0),
        maxPoints: new Decimal(3),             // "points" is the internal name for the main resource of the layer.
    }},

    color: "#A45729",                       // The color for this layer, which affects many elements.
    resource: "Traps",            // The name of this layer's main prestige resource.
    row: 1,                                 // The row this layer is on (0 is the first row).

    baseResource: "Mana",                 // The name of the resource your prestige gain is based on.
    baseAmount() { return player.points },  // A function to return the current amount of baseResource.

    requires: new Decimal(0),              // The amount of the base needed to  gain 1 of the prestige currency.
                                            // Also the amount required to unlock the layer.

    type: "none",                         // Determines the formula used for calculating prestige currency.

    layerShown() { return true },          // Returns a bool for if this layer's node should be visible in the tree.

    tabFormat:[
        ["display-text",
            () => {return "You have set " + player.t.points + "/" + player.t.maxPoints + " traps this turn."}
        ],
        "blank",
        "buyables",
    ],

    buyables:{
        11:{
            cost(x) { return new Decimal(3).mul(x).add(3)},
            display(){ return "<h3>Spike Trap\nDeals 1 Damage to those who fall in.\nLasts 3 turns, cannot be damaged.\nCosts "+
                this.cost(getBuyableAmount(this.layer,this.id)) + " Mana</h3>"},
            canAfford(){
                if (player.t.points.gte(player.t.maxPoints)) return false;
                return player.points.gte(this.cost(getBuyableAmount(this.layer,this.id)));
            },
            buy(){
                player.points = player.points.sub(this.cost(getBuyableAmount(this.layer,this.id)));
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                player[this.layer].points = player[this.layer].points.add(1);
            }
        }
    },
})