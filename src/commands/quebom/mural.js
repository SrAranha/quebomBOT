const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('mural')
		.setDescription('Comando exclusivo para o evento de Desenhos do QueBom.')
        .addSubcommand(id => 
            id.setName('id_mensagem')
            .setDescription("Id da mensagem que deseja a reação '✅'.")
            .addStringOption(id => 
                id.setName('id_mensagem')
                .setDescription("Id da mensagem que deseja a reação '✅'.")
                .setRequired(true)))
        .addSubcommand(opt => 
            opt.setName('opcao')
            .setDescription('Se devo abrir ou fechar o Mural para o público.')
            .addStringOption(choice =>
                choice.setName('opcao')
                .setDescription('Se deco abrir ou fechar o Mural para o público.')
                .addChoice('Abrir', 'abrir')
                .addChoice('Fechar', 'fechar')
                .setRequired(true))),
	async execute(interaction) {
        const member = interaction.member;
        if (member.permissions.has(Permissions.FLAGS.ADMINISTRATOR) || member.roles.cache.find(role => role.id === "741486402859958332")) {
            var channelMural = interaction.guild.channels.cache.find(channel => channel.id === "741305619297861643");
            if (!channelMural) {
                channelMural = interaction.channel;                
            }
            const opts = interaction.options;
            if (opts.getSubcommand() === 'id_mensagem') {
                const msgId = interaction.options.getString('id_mensagem');
                interaction.channel.messages.fetch(msgId).then(msg => msg.react('✅'));
                interaction.reply({ content: `Message with id ${msgId} sucessfully reacted!` });
                interaction.deleteReply();
            }
            if (opts.getSubcommand() === 'opcao') {
                const opcao = interaction.options.getString('opcao');
                switch (opcao) {
                    case 'fechar':
                        interaction.reply({ content: 'Estou fechando o Mural!', ephemeral: true });
                        channelMural.permissionOverwrites.edit(channelMural.guild.roles.everyone, { 
                            "VIEW_CHANNEL": false,
                            "SEND_MESSAGES": false,
                            "ADD_REACTIONS": false,
                            "READ_MESSAGE_HISTORY": false,
                            "ATTACH_FILES":false,
                            });
                        break;
                    case 'abrir':
                        interaction.reply({ content: 'Estou abrindo o Mural!', ephemeral: true });
                        channelMural.permissionOverwrites.edit(channelMural.guild.roles.everyone, { 
                            "VIEW_CHANNEL": true,
                            "SEND_MESSAGES": true,
                            "ADD_REACTIONS": true,
                            "READ_MESSAGE_HISTORY": true,
                            "ATTACH_FILES":true,
                            });
                        break;
                    default:
                        interaction.reply({ content: 'Ocorreu um erro, desculpe!', ephemeral: true });
                        break;
                }
            }
        }
        else { interaction.reply({ content: "Você **não** tem permissão para usar este comando!", ephemeral: true }); }
    }
}
//switch (muralArg[0].toLowerCase()) {
//    case "abrir":
//        message.channel.send("Mural está aberto!").then(msg => msg.delete({timeout: 3000}
//        channelMural.updateOverwrite(channelMural.guild.roles.everyone, { 
//            "VIEW_CHANNEL": true,
//            "SEND_MESSAGES": true,
//            "ADD_REACTIONS": true,
//            "READ_MESSAGE_HISTORY": true,
//            "ATTACH_FILES":true,
//            });
//        break;
//    case "fechar":
//        message.channel.send("Mural está fechado!").then(msg => msg.delete({timeout: 3000
//        channelMural.updateOverwrite(channelMural.guild.roles.everyone, { 
//            "VIEW_CHANNEL": false,
//            "SEND_MESSAGES": false,
//            "ADD_REACTIONS": false,
//            "READ_MESSAGE_HISTORY": false,
//            "ATTACH_FILES":false,
//            });
//        break;