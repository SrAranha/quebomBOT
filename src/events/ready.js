module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		const green = '\x1b[32m%s\x1b[0m';
		console.log(green,`${client.user.tag} is now online!`);
        client.user.setActivity("created by Sr_Aranha", { type: "PLAYING"});
	},
};