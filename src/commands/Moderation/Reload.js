module.exports = {
	name: 'reload',
    aliases: ['restart','rld'],
	description: 'Reloads a command',
	args: true,
	execute(message, args) {
		message.delete();
        const { AranhaBoladona_ID } = require('../../config.json');
		//Checks if its me (Sr_Aranha) who passes the command
		if (!message.author.id === AranhaBoladona_ID) return message.reply('você não tem permissão para utilizar este comando');

		if (!args.length) return message.reply('Você não passou comando algum para recarregar.');
		
		const commandName = args[0].toLowerCase();
		const command = message.client.commands.get(commandName)
			|| message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

		if (!command) {
			return message.reply(`Não tem comando com o nome \`${commandName}\`.`);
		}

		const commandFolders = fs.readdirSync('./commands');
		const folderName = commandFolders.find(folder => fs.readdirSync(`./commands/${folder}`).includes(`${commandName}.js`));

		delete require.cache[require.resolve(`../${folderName}/${command.name}.js`)];
			
		try {
			const newCommand = require(`../${folderName}/${command.name}.js`);
			message.client.commands.set(newCommand.name, newCommand);
			message.channel.send(`Command \`${newCommand.name}\` was reloaded!`);
		} catch (error) {
			console.error(error);
			message.channel.send(`There was an error while reloading a command \`${command.name}\`:\n\`${error.message}\``);
		}

		try {
			const newCommand = require(`./${command.name}.js`);
			message.client.commands.set(newCommand.name, newCommand);
			console.log('\x1b[35m%s\x1b[0m', `${command.name} was reloaded!`);
		} catch (error) {
			console.log(error);
			message.reply(`Teve um erro ao recarregar o comando \`${command.name}\`:\n\`${error.message}\``);
		}
	},
};