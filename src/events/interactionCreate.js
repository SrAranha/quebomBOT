module.exports = {
	name: 'interactionCreate',
	execute(interaction) {
		if (!interaction.isCommand()) return;
		const command = interaction.client.commands.get(interaction.commandName);
		if (!command) return;
		try {
			command.execute(interaction);
		} catch (error) {
			var red = '\x1b[31m%s\x1b[0m';
			console.error(red, error);
			interaction.reply({ content: 'Houve um erro ao executar esse comando!', ephemeral: true });
		}
	}
}
