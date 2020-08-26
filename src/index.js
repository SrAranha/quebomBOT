const http = require('http');
const fs = require('fs');
const port = 53134;
const url = require('url');
const fetch = require('node-fetch');
const Discord = require('Discord.js');
const { prefix, botToken, CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } = require('./config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();

// Command handler
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

// Initializing
client.once('ready', () => {
    console.log('\x1b[32m%s\x1b[0m','QueBomBOT is now online! \n' +
    'Avaliable commands: ' + commandFiles);
});
client.login(botToken);

// Command Handler
client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return; // if message is from bot or don't has prefix, ignore it

	const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    
    if (!client.commands.has(commandName)) return; // if no command, ignore it
    
    const command = client.commands.get(commandName);

    // Commands guildOnly
    if (command.guildOnly && message.channel.type === 'dm') {
        return message.reply('Esse comando não pode ser executado dentro de DM\'s!');
    }
    
    // if command, execute it
    try {
        command.execute(message, args);
    } catch (error) {
        console.error('\x1b[31m%s\x1b[0m', error);
        message.reply('Houve um erro ao executar o comando!')
    }
});

// Catching API errors
process.on('unhandledRejection', error => {
	console.error('Unhandled promise rejection:', error);
});

//OAuth2
http.createServer((req, res) => {
	let responseCode = 404;
	let content = '404 Error';

	const urlObj = url.parse(req.url, true);

	if (urlObj.query.code) {
		const accessCode = urlObj.query.code;
		const data = {
			client_id: `${CLIENT_ID}`,
			client_secret: `${CLIENT_SECRET}`,
			grant_type: 'authorization_code',
			redirect_uri: `${REDIRECT_URI}`,
			code: accessCode,
			scope: 'indentify',
		};

		fetch('https://discordapp.com/api/oauth2/token', {
			method: 'POST',
			body: new URLSearchParams(data),
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
		})
			.then(discordRes => discordRes.json())
			.then(info => {
				console.log(info);
				return info;
			})
			.then(info => fetch('https://discordapp.com/api/users/@me', {
				headers: {
					authorization: `${info.token_type} ${info.access_token}`,
				},
			}))
			.then(userRes => userRes.json())
			.then(console.log);
	}

	if (urlObj.pathname === '/') {
		responseCode = 200;
		content = fs.readFileSync('./index.html');
	}

	res.writeHead(responseCode, {
		'content-type': 'text/html;charset=utf-8',
	});

	res.write(content);
	res.end();
})
	.listen(port);