const editJsonFile = require('edit-json-file');
const { aranhaBoladona_ID } = require('../config.json');
module.exports = {
	name: 'interactionCreate',
	execute(interaction) {
		if (!interaction.isCommand()) return;
		const command = interaction.client.commands.get(interaction.commandName);
		if (!command) return;
		try {
			command.execute(interaction);
			console.log(`||Someone used ${command.data.name}||`);
			if (interaction.user.id != aranhaBoladona_ID) {	// Storing used commands, except from me (Sr_Aranha)
				let file = editJsonFile(`${__dirname}/commands.json`);
				value = file.get(`timesUsed_${command.data.name}`);
				if (value) {
					value++;
					file.set(`timesUsed_${command.data.name}`, value);
				} else {
					file.set(`timesUsed_${command.data.name}`, 1);
				}
				file.save();
				file = editJsonFile(`${__dirname}/commands.json`, { autosave: true });
			}

		} catch (error) {
			var red = '\x1b[31m%s\x1b[0m';
			console.error(red, error);
			interaction.reply({ content: 'Houve um erro ao executar esse comando!', ephemeral: true });
		}
	}
}
