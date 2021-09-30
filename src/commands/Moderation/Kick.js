const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('expulsar')
		.setDescription('Expulsa o usuário mencionado.')
        .addUserOption(user => 
            user.setName('usuario')
            .setDescription('Usuário que deseja expulsar.')
            .setRequired(true))
        .addStringOption(reason =>
            reason.setName('razao')
            .setDescription('Razao para expulsar o usuário')
            .setRequired(false)),
	async execute(interaction) {
        const memberPerms = interaction.member.permissions;
        if (memberPerms.has(Permissions.FLAGS.ADMINISTRATOR) || memberPerms.has(Permissions.FLAGS.KICK_MEMBERS)) {
            const user = interaction.options.getUser('usuario');
            const reason = interaction.options.getString('razao');
            const { auditLog_QBom, serverQbomOficial_ID } = require('../../config.json');
            const auditLog = interaction.client.channels.cache.get(auditLog_QBom);

            const kickEmbed = {
                color: "#FFEA00",
                title: `Usuário expulso: ${user.tag}`,
                author: {
                    name: `${interaction.user.tag}`,
                    icon_url: `${interaction.user.avatarURL()}`,
                },
                fields: [
                    {
                        name: "Motivo:",
                        value: `${reason}.`,
                    },
                ],
                timestamp: new Date(),
            };
            interaction.guild.members.kick(user);
            if (interaction.guildId === serverQbomOficial_ID) {
                auditLog.send({ embeds: [kickEmbed] });
            }
            else interaction.reply({ content: `${user.tag} foi expulso do servidor.`, ephemeral: true});
        }
        else interaction.reply({ content: 'Você **não** tem permissão para usar este comando.', ephemeral: true });
    }
}