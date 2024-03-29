const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('cargo')
		.setDescription('Dê um cargo para o usuário.')
        .addUserOption(user => 
            user.setName('usuario')
            .setDescription('Usuário para dar o cargo.')
            .setRequired(true))
        .addRoleOption(role =>
            role.setName('cargo')
            .setDescription('cargo para dar ao usuário.')
            .setRequired(true)),
	async execute(interaction) {
        const memberPerms = interaction.member.permissions;
        if (memberPerms.has(Permissions.FLAGS.ADMINISTRATOR) || memberPerms.has(Permissions.FLAGS.MANAGE_ROLES)) {
            const role = interaction.options.getRole('cargo');
            const user = interaction.options.getMember('usuario');
            const { auditLog_QBom, serverQbomOficial_ID } = require('../../config.json');
            const auditLog = interaction.client.channels.cache.get(auditLog_QBom);

            const roleEmbed = {
                color: "#4EFF00",
                title: `Cargo ${role.name} dado à ${user.user.tag}`,
                author: {
                    name: `${interaction.user.tag}`,
                    icon_url: `${interaction.user.avatarURL()}`,
                },
                timestamp: new Date(),
            };
            user.roles.add(role);

            if (interaction.guildId === serverQbomOficial_ID) {
                auditLog.send({ embeds: [roleEmbed] });
            }
            else interaction.reply({ content: `${user.user.tag} recebeu o cargo de ${role.name}.`, ephemeral: true});
        }
        else interaction.reply({ content: 'Você **não** tem permissão para usar este comando.', ephemeral: true });
    }
}