const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = require("node-fetch");
function getQuote() {
	return fetch("https://zenquotes.io/api/random")
		.then(res => {
		return res.json()
		})
		.then(data => {
		return data[0]["q"] + " -" + data[0]["a"]
		})
}
module.exports = {
	name: "quote",
	description: "Gets a random zen quote",
	data: new SlashCommandBuilder()
		.setName('quote')
		.setDescription('Gets a random zen quote'),
	async execute(interaction) {
		getQuote().then(quote => interaction.reply(quote))
	},
};
