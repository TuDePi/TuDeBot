const fs = require('fs');
require("dotenv").config();
const token = process.env.token;
const mtoken = process.env.mtoken;
const { Client, GatewayIntentBits, Partials, Collection, Discord } = require("discord.js");
const profileModel = require('./models/profileSchema')
const mongoose = require('mongoose')
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.DirectMessageReactions,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildWebhooks,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.GuildBans
    ],
    partials: [Partials.Channel]
});
mongoose.connect(mtoken, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("connected to MongoDB")
});

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}

}

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;
	let profileData;
try {
  profileData = await profileModel.findOne({ userID: interaction.user.id });
  if (!profileData) {
	let profile = await profileModel.create({
	  userID: interaction.user.id,
	  creepma: 500,
	  bank: 0,
	});
	profile.save();
  }
} catch (err) {
  console.log(err);}
	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction, profileData);
	} 
	catch (error) {
		console.error(error);
		return interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

client.login(token);
