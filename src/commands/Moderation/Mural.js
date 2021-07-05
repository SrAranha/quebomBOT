module.exports = {
    name: "mural",
    description: "Comando exclusivo para o evento de Desenhos do QueBom.",
    guildOnly: true,
    modOnly: true,
    args: "{argumento}",
    listArgs: ["[ID da mensagem]", "Abrir", "Fechar"],
    execute(message, args) {
        if (message.member.hasPermission("ADMINISTRATOR") || message.member.roles.cache.some(role => role.id === "741486402859958332")) { 
            message.delete() //Deletes message calling the command
            const muralArg = args.slice(0, 1); //Catch what to do
            const channelMural = message.guild.channels.cache.find(channel => channel.id === "741305619297861643"); //ChannelMural
                        
            switch (muralArg[0].toLowerCase()) {
                case "abrir":
                    message.channel.send("Mural está aberto!").then(msg => msg.delete({timeout: 3000}));
                    channelMural.updateOverwrite(channelMural.guild.roles.everyone, { 
                        "VIEW_CHANNEL": true,
                        "SEND_MESSAGES": true,
                        "ADD_REACTIONS": true,
                        "READ_MESSAGE_HISTORY": true,
                        "ATTACH_FILES":true,
                        });
                    break;
                case "fechar":
                    message.channel.send("Mural está fechado!").then(msg => msg.delete({timeout: 3000}));
                    channelMural.updateOverwrite(channelMural.guild.roles.everyone, { 
                        "VIEW_CHANNEL": false,
                        "SEND_MESSAGES": false,
                        "ADD_REACTIONS": false,
                        "READ_MESSAGE_HISTORY": false,
                        "ATTACH_FILES":false,
                        });
                    break;
                default: 
                    message.channel.messages.fetch(`${muralArg}`).then(msg => msg.react("✅")); // React message with "✅"
                    break;
            }
        }
        else (message.reply("você **não** tem permissão para usar este comando!"));
    }
}