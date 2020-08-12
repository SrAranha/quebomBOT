module.exports = {
	name: 'ping',
	description: 'Ping!',
	execute(message) {
		const ms = new Date().getMilliseconds();
		message.channel.send(`Pong! ${ms}ms (Ainda não é um comando confiável)`);
	},
};