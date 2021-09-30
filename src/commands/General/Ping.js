const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		const ping = await interaction.reply({ content: 'Pingando...', fetchReply: true});
		interaction.editReply(`Ping de ${ping.createdTimestamp - interaction.createdTimestamp}ms`)
	},
};