addLayer("c", {
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: true,
        points: new Decimal(1)                     // You can add more variables here to add them to your layer.             // "points" is the internal name for the main resource of the layer.
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
    tooltip(){return "Wave "+ player.c.points}
})