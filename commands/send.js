const { SlashCommandBuilder } = require('@discordjs/builders');
const profileModel = require('../models/profileSchema')
const data = new SlashCommandBuilder()
.setName('send')
.setDescription('Send some creepma to your friends')
.addUserOption(option =>
	option
		.setName('target')
		.setDescription('The member to send money')
		.setRequired(true))
.addIntegerOption(option1 =>
	option1.setName('creepma')
		.setDescription('Creepma amount to send')
		.setRequired(true))
var timeout = [];

let sure = 10 *100;
module.exports = {
	name: 'send',
	description: 'Send some creepma to your friends',
	data: data,
	async execute(interaction, profileData) {
      if(timeout.includes(interaction.user.id)) return await interaction.reply({content: 'You need to wait for a bit to do send money again', ephemeral: true})

		const user = interaction.options.getUser('target')

        profileData2 = await profileModel.findOne({ userID: user.id });
        
        if(!profileData && !profileData2){
            interaction.reply("Creating database...")}
  
              const amount = interaction.options.getInteger('creepma');
  
         if(!user) return interaction.reply("Please mention a user to pay!");
         if(!amount) return interaction.reply("Please specify an amount to pay!");
         if(isNaN(amount)) return interaction.reply("Please specify a valid number!");
         if(amount < 1) return interaction.reply("Please specify a valid amount!");
         if(amount > profileData.creepma) return interaction.reply("You don't have that much creepma!");
         if(amount == profileData.creepma) return interaction.reply("You can't pay yourself!");
         if(amount > profileData.creepma) return interaction.reply("You can't pay more than you have!");
         if(amount < 0) return interaction.reply("Please specify a valid amount!");
         if(amount == 0) return interaction.reply("Please specify a valid amount!");
         
         if(user == interaction.user) return interaction.channel.send(`💳 | **${interaction.user.username}** paid **${amount} creepma** to... **${user.username}**... but... why?`);
  
         const response = await profileModel.findOneAndUpdate(
          {
             userID: interaction.user.id,
          },
          {
             $inc: {
               creepma: -amount,
          },
      }
         );
         const response2 = await profileModel.findOneAndUpdate(
          {
             userID: user.id,
          },
          {
             $inc: {
               creepma: amount,
          },
      }
         );
         timeout.push(interaction.user.id)
         setTimeout(() => {
            timeout.shift()
         }, sure);

            return interaction.reply(`**💳 | ${interaction.user.username}** paid **${amount} creepma** to **${user.username}**!`);
           
           

	},
};