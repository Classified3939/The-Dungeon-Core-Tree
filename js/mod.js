let modInfo = {
	name: "The Dungeon Core Tree",
	id: "dungeoncoreC39",
	author: "Classified39",
	pointsName: "Mana",
	modFiles: ["layers/lore.js", "layers/traps.js", "layers/combat.js", "layers/achievements.js", "tree.js",
	"layers/research.js", "layers/heropedia.js", "gameUtils/loreStrings.js", "gameUtils/heroStrings.js",
	"gameUtils/trapUnit.js","gameUtils/enemyUnit.js", "gameUtils/enemyTypes.js","gameUtils/waveData.js",
	"gameUtils/trapTypes.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	offlineLimit: 0,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.1",
	name: "3 enemies, 3.5 traps, 0 idea what I'm doing",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v0.1</h3><br>
		- Added traps, combat, research, achievements, heropedia.<br>
		- Added warriors, mages, scouts.`

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

function getBaseGain(){
	let base = player.c.points;
	//base = base.add(200);
	return base
}

function getLoss(){
	let loss = new Decimal(0.0);
	loss = loss.add(Decimal.log2(Decimal.div(player.points,10)))
	for (let i = 3; i < Decimal.log10(player.points); i++){
		loss = Decimal.pow(loss,1.15);
	}
	if (Decimal.gte(loss,getBaseGain())){
		loss = getBaseGain();
	}
	if (Decimal.lte(loss,0)){
		loss = new Decimal(0.0);
	}
	return new Decimal(loss);
}

function getSoftcapLevel(){
	if (Decimal.gte(Decimal.log10(player.points),3)){
		return Decimal.log10(player.points).sub(2).toFixed(0);
	}
	else{
		return new Decimal(0);
	}
}

function getDisplayText(){
	if (typeof(player) == "undefined") return " "
	return "Base Gain: " + getBaseGain().toFixed(2) + " -=- Losing: " + getLoss().toFixed(2) + (Decimal.gte(getSoftcapLevel(),1) ? " -=- Softcap Lv. " + getSoftcapLevel() : ""); 
}
// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0);
	let gain = getBaseGain();
	let loss = new Decimal(0);
	if (Decimal.gte(player.points,1)){
		if (player)
		loss = getLoss();
	}
	gain = Decimal.sub(gain,loss);
	if (Decimal.lte(gain,1e-3)){
		gain = new Decimal(0);
		if (Decimal.lte(player.points.ceil().sub(player.points),0.1)){
			gain = new Decimal(1e-3);
		}
	}
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
	() => getDisplayText(),
]

// Determines when the game "ends"
function isEndgame() {
	return player.c.points.gte(11);
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}