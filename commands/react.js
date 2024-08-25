const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	name: 'react',
	description: 'Reacts to a message with an emoji',
	data: new SlashCommandBuilder()
		.setName('react')
		.setDescription('Reacts to a message with an emote'),
	async execute(interaction) {
		const message = await interaction.reply({ content: 'Awaiting reaction', fetchReply: true });
        message.react('😄')
	},
};
