module.exports = {
	name: "ping",
	description: "Ping!",
	execute(message, args, client) {
		const ms = new Date().getMilliseconds();
		message.channel.send(`Pong! ${ms}ms (quando tiver host certo vai tá bom)`);

		// for tests purposes
	}
}