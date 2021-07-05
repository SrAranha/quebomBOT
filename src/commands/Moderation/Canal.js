module.exports = {
    name: "canal",
    aliases: ["channel"],
    description: "Modifica o canal com a configuração disponível.",
    guildOnly: true,
    modOnly: true,
    args: "{argumento}",
    listArgs: ["Privado", "Publico", "Lento", "Normal", "+18", "-18", ],
    execute(message, args) {
        if (message.member.hasPermission("ADMINISTRATOR") || message.member.hasPermission("MANAGE_CHANNELS")) { 
            const toDo = args[0];
                switch (toDo.toLowerCase()) {
                    case "privado": // Set channel private to public
                        message.delete();
                        message.reply("Este canal está sendo fechado!").then(msg => msg.delete({timeout: 3000}));
                        message.channel.updateOverwrite(message.channel.guild.roles.everyone, {
                            "VIEW_CHANNEL": false,
                            "SEND_MESSAGES": false,
                            "ADD_REACTIONS": false,
                            "READ_MESSAGE_HISTORY": false,
                            });
                        break;
                    case "publico": // Set channel open to public
                        message.delete();
                        message.reply("Este canal está liberado ao público!").then(msg => msg.delete({timeout: 3000}));
                        message.channel.updateOverwrite(message.channel.guild.roles.everyone, { 
                            "VIEW_CHANNEL": true,
                            "SEND_MESSAGES": true,
                            "ADD_REACTIONS": true,
                            "READ_MESSAGE_HISTORY": true,
                            });
                        break;
                    case "lento": // Set channel in slow mode
                        message.delete();
                        if (isNaN(args[1])) return message.reply("Isso **não** é um número.").then(msg => msg.delete(    {timeout: 5000}));
                        if (args[1] > 21600) return message.reply("Número inválido, deve ser menor que \`21600\`.").then(msg     => msg.delete({timeout: 5000}));
                        message.reply(`Canal está em modo lento de ${args[1]} segundos`).then(msg => msg.delete( {timeout: 3000}));
                        message.channel.setRateLimitPerUser(args[1]);
                        break;
                    case "normal": // Set channel to normal speed
                        message.delete();
                        message.channel.setRateLimitPerUser(0);
                        message.reply("O canal **não** está mais em modo lento").then(msg => msg.delete({timeout: 5000}));
                    case "+18": // Set channel to NSFW
                        message.delete();
                        message.channel.setNSFW(true);
                        message.reply("O canal está em NSFW.").then(msg => msg.delete({timeout: 5000}));
                        break;
                    case "-18": // Set channel to SFW
                        message.delete();
                        message.channel.setNSFW(false);
                        message.reply("O canal **não** está em NSFW.").then(msg => msg.delete({timeout: 5000}));
                        break;
                    default:
                        message.delete();
                        message.reply("comando está incompleto.").then(msg => msg.delete({timeout: 5000}));
                        break;
                }
            }
            else (message.reply("você **não** tem permissão para usar este comando!"));
        }
}