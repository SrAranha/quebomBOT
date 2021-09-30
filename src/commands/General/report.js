const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('report')
		.setDescription('Comando para reportar/sugerir algo pro QueBomBOT')
        .addStringOption(option =>
            option.setName('texto')
            .setDescription('Texto descrevendo o problema ou sugestão.')
            .setRequired(true)),
	async execute(interaction) {
        const input = interaction.options.getString('texto');
        const reportChannel = interaction.client.channels.cache.find(channel => channel.id === "855534581951365161");

        const { queBomBOT_ID } = require("../../config.json");
        const id = interaction.client.users.cache.get(queBomBOT_ID);
        const reportEmbed = {
            author: {
                name: `${interaction.user.username}`,
                icon_url: `${interaction.user.displayAvatarURL()}`,
            },
            fields: [
                {
                    name: `Report/suggestion received from \`${interaction.guild.name} (${interaction.guildId})\``,
                    value: `${input}`,
                },
            ],
            timestamp: new Date(),
            footer: {
                icon_url: `${id.displayAvatarURL()}`,
            }
        }
        interaction.reply({ content: "Obrigado pela sua mensagem!", ephemeral: true });
        reportChannel.send({ embeds: [reportEmbed] });
	},
};