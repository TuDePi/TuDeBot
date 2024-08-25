const { SlashCommandBuilder } = require('@discordjs/builders');

const data = new SlashCommandBuilder()
.setName('randomnumber')
.setDescription('Gives you a random integer')
.addIntegerOption(option1 =>
	option1.setName('minimum')
		.setDescription('Integer as minimum')
		.setRequired(true))
.addIntegerOption(option2 =>
    option2.setName('maximum')
        .setDescription('Integer as maximum')
        .setRequired(true));
        

module.exports = {
	name: 'randomnumber',
	description: 'Gets a random number between two intergers',
	data: data,
	async execute(interaction) {
		const min = interaction.options.getInteger("minimum");
        const max = interaction.options.getInteger("maximum");
        let result = Math.round(Math.random() * (max - min) + min);
        await interaction.reply(`${result}`);
	}
};