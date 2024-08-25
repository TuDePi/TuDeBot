const { SlashCommandBuilder } = require('@discordjs/builders');
const profileModel = require('../models/profileSchema')
const vips = require('../vip.json')
const neyapti = [
    `**bitcoin miner**`,
    `**stock trader**`,
    `**cashier**`,
    `**discord moderator**`,
    `**bartender**`,
    `**stripper**`
]
var timeout = [];
let sure = 20 *100;

const whitelist = vips.vips
function vip(value) {
    return whitelist.includes(value);
  }
module.exports = {
	name: 'work',
	description: 'Work for some creepma',
	data: new SlashCommandBuilder()
		.setName('work')
		.setDescription('Work for some creepma.'),
	async execute(interaction, profileData) {
        if(timeout.includes(interaction.user.id)) return await interaction.reply({content: 'You need to wait for a bit to work again', ephemeral: true})

        let adam = interaction.user.id
		if(!profileData){
            interaction.reply("Creating database...")}
              else if(vip(adam)){ 
                console.log(whitelist)
              const yapilan = Math.floor(Math.random() * (neyapti.length));
              const yapildi = neyapti[yapilan]
          const randomNumber = Math.floor(Math.random() * 150) + 100;
        
          const response = await profileModel.findOneAndUpdate(
          {
             userID: interaction.user.id,
          },
          {
             $inc: {
               creepma: randomNumber,
          },
      }
         );
         timeout.push(interaction.user.id)
  setTimeout(() => {
     timeout.shift()
  }, sure);
            return interaction.reply(`**${interaction.user.username}** (vip), worked as ${yapildi} and earned **${randomNumber} creepma!**`);
  
            }
            else{         
              const yapilan = Math.floor(Math.random() * (neyapti.length));
              const yapildi = neyapti[yapilan]
          const randomNumber = Math.floor(Math.random() * 40) + 9;
        
          const response = await profileModel.findOneAndUpdate(
          {
             userID: interaction.user.id,
          },
          {
             $inc: {
               creepma: randomNumber,
          },
      }
    );
    timeout.push(interaction.user.id)
  setTimeout(() => {
     timeout.shift()
  }, sure);
    return interaction.reply(`**${interaction.user.username}**, worked as ${yapildi} and earned **${randomNumber} creepma!**`);
  
  }

    
    },
};
