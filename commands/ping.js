const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = {
	name: 'ping',
	description: 'Basic command. Check latency times in milliseconds',
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong and latency times.'),
	async execute(interaction) {
		const sent = await interaction.reply({ content: 'Pinging...', fetchReply: true });
		interaction.editReply(`Roundtrip latency: ${sent.createdTimestamp - interaction.createdTimestamp}ms`);
	},
};
