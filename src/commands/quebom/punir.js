const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('punir')
		.setDescription('Dê o cargo de punido a um usuário.')
        .addUserOption(user => 
            user.setName('usuario')
            .setDescription('Usuário para punir.')
            .setRequired(true)),
    async execute(interaction) {
        const memberPerms = interaction.member.permissions;
        if (memberPerms.has(Permissions.FLAGS.ADMINISTRATOR) || memberPerms.has(Permissions.FLAGS.MANAGE_ROLES)) {
            const member = interaction.options.getMember('usuario');
            const punish = interaction.guild.roles.cache.find(role => role.name === 'Punidos');
            const { auditLog_QBom, serverQbomOficial_ID } = require('../../config.json');
            const auditLog = interaction.client.channels.cache.get(auditLog_QBom);

            const punishEmbed = {
                color: "#865400",
                title: `Membro punido: ${member.user.tag}`,
                author: {
                    name: `${interaction.user.tag}`,
                    icon_url: `${interaction.user.avatarURL()}`,
                },
                timestamp: new Date(),
            };

            member.roles.add(punish);

            if (interaction.guildId === serverQbomOficial_ID) {
                auditLog.send({ embeds: [punishEmbed] });
            }
            else interaction.reply({ content: `${member.user.tag} foi punido.`, ephemeral: true});
        }
        else interaction.reply({ content: 'Você **não** tem permissão para usar este comando.', ephemeral: true });
    }
}