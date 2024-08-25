
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	name: 'balance',
	description: 'Check your balance',
	data: new SlashCommandBuilder()
		.setName('balance')
		.setDescription('Check your balance'),
	async execute(interaction, profileData) {
		if(!profileData){
            interaction.reply("Creating database...");
        }else{
            interaction.reply(`<:creepma:917843285379260487> **| ${interaction.user.username}**, you currently have **__${profileData.creepma}__ creepma!**`);
        } },
};
