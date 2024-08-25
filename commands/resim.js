const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = require("node-fetch");
const { EmbedBuilder } = require("discord.js");

module.exports = {
	name: 'draw',
	description: 'Draws your prompt',
	data: new SlashCommandBuilder()
		.setName('draw')
		.setDescription('Draws your prompt.')
        .addStringOption(option =>
            option.setName('prompt')
                .setDescription('A prompt to draw')
                .setRequired(true)),
	async execute(interaction) {
        const prompt = interaction.options.getString("prompt")
        await interaction.deferReply().then(msg => {
          const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("User-Agent", "PostmanRuntime/7.41.2");
      myHeaders.append("Accept", "*/*");
      myHeaders.append("Postman-Token", "6a4376da-082e-414f-9bb4-19a50c64ff78");
      myHeaders.append("Host", "api.craiyon.com");
      myHeaders.append("Accept-Encoding", "gzip, deflate, br");
      myHeaders.append("Connection", "keep-alive");
      
      const raw = JSON.stringify({
        "model": "drawing",
        "negative_prompt": "",
        "prompt": prompt,
        "token": null,
        "version": "35s5hfwn9n78gb06"
      });
      
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
      };
      fetch("https://api.craiyon.com/v3", requestOptions)
     .then(response => response.json())
     .then(data =>{ 
        cost50 = new EmbedBuilder()
        .setColor('#808080')
          .setFooter({text: "This command is currently in beta! Because of that result can be wrong."})
          .setTitle("Your prompt was **'"+prompt+"'**")
          .setImage("https://img.craiyon.com/"+data.images[0])
        msg.edit(
       {embeds: [cost50]}
       )})
       .catch(error => {
        const timestamp = new Date().toISOString();
        console.error(`Error at ${timestamp}:`, error);
        msg.edit({ content: `An error occurred while processing your request. Please try again later.`, embeds: [] });
    });
  })

    },
};
