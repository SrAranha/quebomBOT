const fs = require('fs');
const Discord = require('discord.js');
const { prefix, botToken, aranhaBoladona_ID } = require('./config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();

// Command handler
const commandFolders = fs.readdirSync('./commands');

for (const folder of commandFolders) {
    const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`./commands/${folder}/${file}`);
        client.commands.set(command.name, command);
    }
}
// Initializing
client.once('ready', () => {
    console.log('\x1b[32m%s\x1b[0m','QueBomBOT is now online!');
    client.user.setActivity("created by Sr_Aranha", { type: "PLAYING"});
});
client.login(botToken);

// Command Handler
client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return; // if message is from bot or don't has prefix, ignore it

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandCalled = args.shift().toLowerCase();

	const command = client.commands.get(commandCalled)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandCalled));
    
    if (!command) return; // if no command, ignore it
    
    // Commands guildOnly: true
    if (command.guildOnly && message.channel.type === 'dm') {
        return message.reply("Esse comando não pode ser executado dentro de DM's!");
    }

    // if command, execute it
    try {
        command.execute(message, args, client);
    } catch (error) {
        console.error('\x1b[31m%s\x1b[0m', error);
        message.reply('Houve um erro ao executar o comando!')
        client.users.cache.get(aranhaBoladona_ID).send(`There was an error when executing \`${command.name}\`, please see the terminal. `);
    }
});

// Catching API errors
process.on('unhandledRejection', error => {
    console.error('Unhandled promise rejection:', error);
});