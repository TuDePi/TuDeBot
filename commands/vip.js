const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = {
	name: 'vip',
	description: 'Buy VIP',
	data: new SlashCommandBuilder()
		.setName('vip')
		.setDescription('Buy a vip to support us!'),
	async execute(interaction) {
		interaction.reply({content: "Check your dms!", ephemeral: true})
        interaction.user.send("Not selling vips rn.")
    
    },
};
