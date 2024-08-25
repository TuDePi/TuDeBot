const { SlashCommandBuilder, channelMention } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
	name: 'help',
	description: 'Lists commands for the bot',
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Lists commands for the bot'),
	async execute(interaction) {
		interaction.reply("I can't help you rn")
	/*	const embed = new EmbedBuilder()
		.setTitle("Help")
        .setDescription("Here are my basic commands")
		.addFields(
			{ name: 'Commands'},
			{ name: '\u200B', value: '\u200B' },
			{ name: 'cat', value: 'Returns a cat image', inline: true },
			{ name: 'echo', value: 'Sends inputted text messages', inline: true },
			{ name: 'eightball', value: 'Predict the future by asking a question', inline: true },
			{ name: 'ping', value: 'Basic command. Returns ping', inline: true },
			{ name: 'quote', value: 'Returns a zen quote', inline: true },
			{ name: 'stats', value: 'Show bot operating system and memory usage', inline: true },
			{ name: 'serverinfo', value: 'Shows server info in an embed', inline: true },
			{ name: 'userinfo', value: 'Shows user info in an embed', inline: true },

		)
        await interaction.reply({embeds: [embed]});*/
	},
};