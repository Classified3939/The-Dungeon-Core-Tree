addLayer("t", {
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: true,                     // You can add more variables here to add them to your layer.
        points: new Decimal(0),             // "points" is the internal name for the main resource of the layer.
        maxPoints: new Decimal(3),            
    }},

    color: "#A45729",                       // The color for this layer, which affects many elements.
    resource: "Traps",            // The name of this layer's main prestige resource.
    row: 1,                                 // The row this layer is on (0 is the first row).
    position: 0,

    baseResource: "Mana",                 // The name of the resource your prestige gain is based on.
    baseAmount() { return player.points },  // A function to return the current amount of baseResource.

    requires: new Decimal(0),              // The amount of the base needed to  gain 1 of the prestige currency.
                                            // Also the amount required to unlock the layer.

    type: "none",                         // Determines the formula used for calculating prestige currency.

    layerShown() { return true },          // Returns a bool for if this layer's node should be visible in the tree.

    tabFormat:[
        ["display-text",
            () => {return "You have set <h1>" + player.t.points + "/" + player.t.maxPoints + "</h1> traps this turn."}
        ],
        "blank",
        "buyables",
    ],

    buyables:{
        11:{
            cost(x) { return new Decimal(3).mul(x).add(3)},
            display(){ return "<h3>Spike Trap\nDeals 1 Damage to those who fall in.\nHas 3 hitpoints.\nCosts "+
                this.cost(getBuyableAmount(this.layer,this.id)) + " Mana</h3>"},
            canAfford(){
                if (player.t.points.gte(player.t.maxPoints)) return false;
                return player.points.gte(this.cost(getBuyableAmount(this.layer,this.id)));
            },
            buy(){
                player.points = player.points.sub(this.cost(getBuyableAmount(this.layer,this.id)));
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                player[this.layer].points = player[this.layer].points.add(1);
                player.c.traps.push(new SpikeTrap())
            },
            unlocked(){
                return !(hasUpgrade("r",12));
            }
        },
        12:{
            cost(x) {return new Decimal(4).mul(x).add(4)},
            display(){return"<h3>Camouflaged Spike Trap\nDeals 2 Damage to those who unknowingly fall in.\nHas 4 hitpoints.\nCosts "+
            this.cost(getBuyableAmount(this.layer,this.id)) + " Mana</h3>"},
            canAfford(){
                if (player.t.points.gte(player.t.maxPoints)) return false;
                return player.points.gte(this.cost(getBuyableAmount(this.layer,this.id)));
            },
            buy(){
                player.points = player.points.sub(this.cost(getBuyableAmount(this.layer,this.id)));
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                player[this.layer].points = player[this.layer].points.add(1);
                player.c.traps.push(new CamoSpikeTrap())
            },
            unlocked(){
                return hasUpgrade("r",12);
            }
        },
        13:{
            cost(x) {return new Decimal(7).mul(x).add(7)},
            display(){return"<h3>Slippery Floor Trap\nDeals 1 damage... somehow.\nHas 7 hitpoints.\nCosts "+
            this.cost(getBuyableAmount(this.layer,this.id)) + " Mana</h3>"},
            canAfford(){
                if (player.t.points.gte(player.t.maxPoints)) return false;
                return player.points.gte(this.cost(getBuyableAmount(this.layer,this.id)));
            },
            buy(){
                player.points = player.points.sub(this.cost(getBuyableAmount(this.layer,this.id)));
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                player[this.layer].points = player[this.layer].points.add(1);
                player.c.traps.push(new SlipperyTrap())
            },
            unlocked(){
                return hasUpgrade("r",11);
            }
        },
        14:{
            cost(x) {return new Decimal(15).mul(x).add(15)},
            display(){return"<h3>Arrow Shooter Trap\nDeals 5 damage to those shot.\nHas only 1 shot.\nCosts "+
            this.cost(getBuyableAmount(this.layer,this.id)) + " Mana</h3>"},
            canAfford(){
                if (player.t.points.gte(player.t.maxPoints)) return false;
                return player.points.gte(this.cost(getBuyableAmount(this.layer,this.id)));
            },
            buy(){
                player.points = player.points.sub(this.cost(getBuyableAmount(this.layer,this.id)));
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                player[this.layer].points = player[this.layer].points.add(1);
                player.c.traps.push(new ArrowShotTrap())
            },
            unlocked(){
                return hasUpgrade("r",13);
            }
        }
    },
    update(diff){
        player.t.maxPoints = new Decimal(3).add(Decimal.floor(player.c.points.div(2)));
    }
})