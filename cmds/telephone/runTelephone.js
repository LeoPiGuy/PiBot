const fs = require("fs");
const tele = "./../../telephone.json";
const telephone = require(tele);
const arrayShuffle = require("array-shuffle")


module.exports.run = async (key, bot) => {
	console.log("Atempting to start the game of telephone with the key " + key);

	let game = telephone[key];
	let players = game.users;
	let orderedPlayers = [];

	// for(let i in players) {
	// 	orderedPlayers.push(i);
	// }
	// orderedPlayers = arrayShuffle(orderedPlayers);
	let rawOrderedPlayers = [];
    for(let i in players) {
        rawOrderedPlayers.push(i);
    }
    orderedPlayers = arrayShuffle(rawOrderedPlayers);
    console.log("orderedPlayers:" + orderedPlayers)
	for(let i in game.channels) {
		let channel = bot.channels.get(game.channels[i]);
		let playerList = "1| " + orderedPlayers[0];
		for(k = 1, k < orderedPlayers.length, k++) {
			let obj = players[orderedPlayers[k]];
			let name = obj["name"];
			playerList = `${playerList} \n ${k + 1}| ${orderedPlayers[k]}`;
			console.log(name);
		}
		channel.send("embed": {
		"title": `The game of telephone with the key ${key} has started! \n There are ${orderedPlayers.length} players participating in the game. \n Here they are in order:`,
		"description": playerList
		});
	}
    console.log(players);
	console.log(orderedPlayers);
}