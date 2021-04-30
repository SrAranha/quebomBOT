module.exports = {
	name: 'ping',
	description: 'Ping!',
	execute(message, client) {
		const ms = new Date().getMilliseconds();
		message.channel.send(`Pong! ${ms}ms (quando tiver host certo vai tá bom)`);
		message.channel.send(client.users.cache);
	}
}