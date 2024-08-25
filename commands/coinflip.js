const { SlashCommandBuilder } = require('@discordjs/builders');
const profileModel = require('../models/profileSchema')
const {EmbedBuilder} = require('discord.js')
const data = new SlashCommandBuilder()
.setName('coinflip')
.setDescription('Toss a coin')
.addStringOption(option =>
    option.setName('side')
        .setDescription('Heads or tails')
        .setRequired(true)
        .addChoices(
            { name: 'Heads', value: 'h' },
            { name: 'Tails', value: 't' },
        ))
.addIntegerOption(option1 =>
	option1.setName('creepma')
		.setDescription('Bet ammount')
		.setRequired(true))
var timeout = [];

let sure = 10 *100;
module.exports = {
	name: 'coinflip',
	description: 'Toss a coin',
	data: data,
	async execute(interaction, profileData) {
      if(timeout.includes(interaction.user.id)) return await interaction.reply({content: 'You need to wait for a bit to do send money again', ephemeral: true})

      if(!profileData){
        interaction.reply("Creating database...")}
        else{
       const user = interaction.user
          const ht = interaction.options.getString('side')
          if(!ht) return interaction.reply(`What You Chose? heads or tails?`) // If No heads Or tails Provided
          const amount = interaction.options.getInteger('creepma')
          if(!amount) return interaction.reply(`Provide Amount`) // If No Amount Provided
          const bal = profileData.creepma
          
          const coin = ['h', 't'] // Coin Options
  
              if(!coin.includes(ht)) return interaction.reply(`It Should Be heads or tails Only`) // If Something Other Is Provided
              if(isNaN(amount)) return interaction.reply(`Amount Isn't A Number`) // If Amount Is Not A Number
              if(amount > profileData.creepma) return interaction.reply(`You Dont Have That Much Money In Wallet`) // If User Provided Greater Money Then He Has
              if(amount < 25) return interaction.reply(`Need To Bet At Least 25 Creepma`) // If Provided Amount Is Less Then $500
  
              const flip = coin[Math.floor(Math.random() * coin.length)]
  
             /* const fliped = Capitalize({ // For Making heads To Heads And tails To Tails
                  Capital: flip
              })*/
               
              if(flip === ht) { // If Coin Fliped Is What User Provided
                if(ht == "h"){
                    const embed = new EmbedBuilder()
                    .setTimestamp()
                    .setColor('#00FF00')
                    .setDescription(`
    <@${user.id}> Fliped Coin Which Landed On Heads! **${interaction.user.username}** Got <:creepma:917843285379260487> **${amount}**
                    `)
                    interaction.reply({
                      embeds: [embed]
                  })
                }else{
                    const embed = new EmbedBuilder()
                    .setTimestamp()
                    .setColor('#00FF00')
                    .setDescription(`
    <@${user.id}> Fliped Coin Which Landed On Tails! **${interaction.user.username}** Got <:creepma:917843285379260487> **${amount}**
                    `)
                    interaction.reply({
                      embeds: [embed]
                  })
                }
                 
                  
                  
                  const response = await profileModel.findOneAndUpdate(
        {
          userID: interaction.user.id,
        },
        {
          $inc: {
            creepma: amount,
          },
        }
      );
                  
                  
              } else { // If Coin Fliped Is Not What User Provided
                  if(ht == "h"){
                    const embed = new EmbedBuilder()
                  .setTimestamp()
                  .setColor('#FF0000')
                  .setTitle('Your side was.. "Heads"')
                  .setDescription(`
  <@${user.id}> Fliped coin which landed on tails... **${interaction.user.username}** Lost <:creepma:917843285379260487> **${amount}**
                  `)
                  interaction.reply({
                    embeds: [embed]
                  })
                  }else{
                    const embed = new EmbedBuilder()
                  .setTimestamp()
                  .setColor('#FF0000')
                  .setTitle('Your side was.. "Tails"')
                  .setDescription(`
  <@${user.id}> Fliped coin which landed on heads... **${interaction.user.username}** Lost <:creepma:917843285379260487> **${amount}**
                  `)
                  interaction.reply({
                    embeds: [embed]
                  })
                  }
                   
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
                   
                   
              }
          } 
           
          timeout.push(interaction.user.id)
          setTimeout(() => {
             timeout.shift()
          }, sure);
	},
};
/* timeout.push(interaction.user.id)
         setTimeout(() => {
            timeout.shift()
         }, sure);
 */