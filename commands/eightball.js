const { SlashCommandBuilder } = require('@discordjs/builders');

const data = new SlashCommandBuilder()
.setName('eightball')
.setDescription('Replies with an answer to your question!')
.addStringOption(option =>
	option.setName('question')
		.setDescription('Ask a question')
		.setRequired(true));

module.exports = {
	name: 'eightball',
	description: 'Replies with an answer.',
	data: data,
	async execute(interaction) {
		const input = interaction.options.getString("input")
        responses = [
			"It is certain",
			"It is decidedly so",
			"Without a doubt",
			"Yes – definitely",
			"You may rely on it",
			"As I see it",
			"yes",
			"Most Likely",
			"Outlook good",
			"Yes",
			"Signs point to yes"
		];
		randomIndex = Math.floor(Math.random() * responses.length);
		await interaction.reply(responses[randomIndex]);
	},
};
