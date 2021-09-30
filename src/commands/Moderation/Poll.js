const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('poll')
		.setDescription('Cria uma votação com ✅ e ❌')
        .addStringOption(txt =>
            txt.setName('texto')
            .setDescription('O que será votado.')
            .setRequired(true)),
	async execute(interaction) {
        const memberPerms = interaction.member.permissions;
        if (memberPerms.has(Permissions.FLAGS.ADMINISTRATOR) || memberPerms.has(Permissions.FLAGS.MANAGE_MESSAGES)) {
            const input = interaction.options.getString('texto');
            const pollEmbed = {
                color: "#df8edd",
                title: `${input}`,
                author: {
                    name: `Criado por: ${interaction.user.tag}`,
                    icon_url: `${interaction.user.avatarURL()}`,
                },
                timestamp: new Date(),
            }
            const pollMsg = await interaction.reply({ embeds: [pollEmbed], fetchReply: true });
		    pollMsg.react('✅');
		    pollMsg.react('❌');
        }
        else { interaction.reply({ content: "Você **não** tem permissão para usar este comando!", ephemeral: true }); }
    }
}