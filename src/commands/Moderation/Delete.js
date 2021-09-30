const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('delete')
		.setDescription('Deleta mensagens que não passam de duas semanas.')
        .addIntegerOption(qnt =>
            qnt.setName('quantidade')
            .setDescription('Quantas mensagens que deseja deletar.')
            .setRequired(true)),
	async execute(interaction) {
        const memberPerms = interaction.member.permissions;
        if (memberPerms.has(Permissions.FLAGS.ADMINISTRATOR) || memberPerms.has(Permissions.FLAGS.MANAGE_MESSAGES)) {
            const qnt = interaction.options.getInteger('quantidade');
            if (qnt > 100) {
                interaction.reply({ content: "O número máximo de mensagens para deletar é 100." , ephemeral: true});                
            }
            else if (qnt < 101) {
                interaction.channel.bulkDelete(qnt);
                interaction.reply({ content: `${qnt} mensagens foram deletadas`, ephemeral: true });
            }
        }
        else interaction.reply({ content: "Você **não** tem permissão para usar este comando.", ephemeral: true });
    }
}