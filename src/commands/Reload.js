module.exports = {
	name: 'reload',
	description: 'Reloads a command',
	args: true,
	execute(message, args) {
		//Checks if its me (Sr_Aranha) who passes the command
		if (!message.author.id === '227887537102782464') return message.channel.send(`${message.author}, você não tem permissão para utilizar este comando`);

		if (!args.length) return message.channel.send(`Você não passou comando algum para recarregar, ${message.author}!`);
		
		const commandName = args[0].toLowerCase();
		const command = message.client.commands.get(commandName)
			|| message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

		if (!command) {
			return message.channel.send(`Não tem comando com o nome \`${commandName}\`, ${message.author}!`);
		}

		delete require.cache[require.resolve(`./${command.name}.js`)];

		try {
			const newCommand = require(`./${command.name}.js`);
			message.client.commands.set(newCommand.name, newCommand);
			console.log('\x1b[35m%s\x1b[0m', `${command.name} was reloaded!`);
		} catch (error) {
			console.log(error);
			message.channel.send(`Teve um erro ao recarregar o comando \`${command.name}\`:\n\`${error.message}\``);
		}
	},
};