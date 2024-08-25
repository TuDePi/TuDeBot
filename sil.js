const fs = require('fs');
const { REST, Routes } = require('discord.js');
require("dotenv").config();
const clientId = process.env.client;
const token = process.env.token;

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// console.log(command.data.toJSON())
	commands.push(command.data.toJSON());
}



const rest = new REST({ version: '10' }).setToken(token);

(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		// The put method is used to fully refresh all commands in the guild with the current set
		const data = await rest.put(Routes.applicationGuildCommands(clientId, '1043607521295872020'), { body: [] })
	.then(() => console.log('Successfully deleted all guild commands.'))
	.catch(console.error);

// for global commands
rest.put(Routes.applicationCommands(clientId), { body: [] })
	.then(() => console.log('Successfully deleted all application commands.'))
	.catch(console.error);
		

	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
})();
