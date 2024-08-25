const { SlashCommandBuilder } = require('@discordjs/builders');
const vip = require('../vip.json')
const profileModel = require("../models/profileSchema");
const sdk = require('api')('@writesonic/v2.2#4enbxztlcbti48j');

const whitelist = vip.vips

function isAllowed(value) {
    return whitelist.includes(value);
  }
module.exports = {
	name: 'ask',
	description: 'Ask anythink to Creeper',
	data: new SlashCommandBuilder()
		.setName('ask')
		.setDescription('Ask anythink to Creeper.')
        .addStringOption(option =>
            option.setName('prompt')
                .setDescription('question')
                .setRequired(true)),
	async execute(interaction, profileData) {
	
        const prompt1 = interaction.options.getString('prompt')
    let prompt2 = prompt1 + " (reply should be in maximum of 10 words)"
    if(prompt1 == ""){  
      message.reply("You shouldn't spend your money on nothing. :P")
        return;
    }
    if(25 > profileData.creepma) return message.reply("You need to have 25 <:creepma:917843285379260487> to use this command. Do *money to check you balance");
    const response2 = await profileModel.findOneAndUpdate(
        {
           userID: interaction.user.id,
        },
        {
           $inc: {
             creepma: -25,
        },
    }
       );
sdk.auth('Your Token Here');
sdk.chatsonic_V2BusinessContentChatsonic_post({
  enable_google_results: false,
  enable_memory: false,
  input_text: prompt2
}, {engine: 'premium'})
  .then(({ data }) => 
  cost50 = new EmbedBuilder()
          .setColor('#808080')
            .setFooter({text: "This command is currently in beta!"})
            .setDescription("Your prompt was **'"+prompt1+"'**")
            .setTitle(data)
          )
  
 // interaction.reply(data.message))
  .catch(err => console.error(err));    
      
    
    },
};
