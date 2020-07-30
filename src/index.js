const fs = require('fs');
const Discord = require('Discord.js');
const { prefix, botToken } = require('./config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();

// command handler
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

// initializing
client.once('ready', () => {
    console.log('\x1b[32m%s\x1b[0m','QueBomBOT is now online! \n' +
        'Avaliable commands: ' + commandFiles);
});
client.login(botToken);

// commands
client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return; // if message is from bot or don't has prefix, ignore it

	const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    if (!client.commands.has(commandName)) return; // if no command, ignore it

    const command = client.commands.get(commandName);

    // if command, execute it
    try {
        command.execute(message, args);
    } catch (error) {
        console.error('\x1b[31m%s\x1b[0m', error);
        message.reply('Houve um erro ao executar o comando!')
    }
});