addLayer("l", {
    name: "lore", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "!", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
    }},
    color: "#5f5f5f5",
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    row: 0, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return true},
    tooltip(){return "Logbook"},
    infoboxes:{
        lore1:{
            title: "Awakening",
            body() { return getLore1()}
        }
    },
    tabFormat:{
        "Lore":{
            buttonStyle(){return {'color':'white'}},
            content:
                [
                    ["infobox","lore1"]
                ]
        },
        "Combat":{}
    },
})
