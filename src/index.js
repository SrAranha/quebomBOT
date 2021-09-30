const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const { prefix, botToken, aranhaBoladona_ID } = require('./config.json');

const yellow = '\x1b[33m%s\x1b[0m';

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_VOICE_STATES] });

client.commands = new Collection();

const commandFolders = fs.readdirSync('./commands');
for (const folder of commandFolders) {
    const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`./commands/${folder}/${file}`);
        client.commands.set(command.data.name, command);
    }
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
client.login(botToken);

// Catching API errors
process.on('unhandledRejection', error => {
    console.error(yellow, error);
});

//// Command Handler
//client.on('messageCreate', message => {
//    if (!message.content.startsWith(prefix) || message.author.bot) return; // if message is from bot or don't has prefix, ignore it
//    
//    const args = message.content.slice(prefix.length).trim().split(/ +/);
//    const commandCalled = args.shift().toLowerCase();
//
//	const command = client.commands.get(commandCalled)
//		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandCalled));
//    
//    if (!command) return; // if no command, ignore it
//    
//    // Commands guildOnly: true
//    if (command.guildOnly && message.channel.type === 'DM') {
//        return message.reply("Esse comando não pode ser executado dentro de DM's!");
//    }
//
//    // if command, execute it
//    try {
//        command.execute(message, args, client);
//    } catch (error) {
//        console.error('\x1b[31m%s\x1b[0m', error);
//        message.reply('Houve um erro ao executar o comando!')
//    }
//});