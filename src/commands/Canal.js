module.exports = {
    name: 'canal',
    description: 'Change settings from channel',
    guildOnly: true,
    execute(message, args) {
        if (message.member.roles.cache.some(role => role.name === 'QueBom' || role.name === 'Moderadores')) { //Checks if user has permissions
            const toDo = args.slice(0);

            if (toDo === String) {
                switch (toDo[0].toLowerCase()) {
                    case 'privado': // Set channel private to public
                        message.delete();
                        message.channel.send('Canal está sendo fechado!').then(msg => msg.delete({timeout: 3000}));
                        message.channel.updateOverwrite(message.channel.guild.roles.everyone, {
                            'VIEW_CHANNEL': false,
                            'SEND_MESSAGES': false,
                            'ADD_REACTIONS': false,
                            'READ_MESSAGE_HISTORY': false,
                            });
                        break;
                    case 'publico': // Set channel open to public
                        message.delete();
                        message.channel.send('Canal está liberado ao público!').then(msg => msg.delete({timeout: 3000}));
                        message.channel.updateOverwrite(message.channel.guild.roles.everyone, { 
                            'VIEW_CHANNEL': true,
                            'SEND_MESSAGES': true,
                            'ADD_REACTIONS': true,
                            'READ_MESSAGE_HISTORY': true,
                            });
                        break;
                    case 'lento': // Set channel in slow mode
                        message.delete();
                        if (isNaN(args[1])) return message.channel.send('Isso não é um número.').then(msg => msg.delete(    {timeout: 5000}));
                        if (args[1] > 21600) return message.channel.send('Número inválido, deve ser menor que 21600.').then(msg     => msg.delete({timeout: 5000}));
                        message.channel.send(`Canal está em modo lento de ${args[1]} segundos`).then(msg => msg.delete( {timeout: 3000}));
                        message.channel.setRateLimitPerUser(args[1]);
                        break;
                    case 'normal': // Set channel to normal speed
                        message.delete();
                        message.channel.setRateLimitPerUser(0);
                        message.channel.send('O canal não está mais em modo lento').then(msg => msg.delete({timeout: 5000}));
                    case '+18': // Set channel to NSFW
                        message.delete();
                        message.channel.setNSFW(true);
                        break;
                    case '-18': // Set channel to SFW
                        message.delete();
                        message.channel.setNSFW(false);
                        break;
                    default:
                        message.delete();
                        message.reply('comando está incompleto.').then(msg => msg.delete({timeout: 5000}));
                        break;
                }
            }
            else message.delete(); message.reply('comando está incompleto ou errado.').then(msg => msg.delete({timeout: 5000}));
        }
        else (message.channel.send(`${message.author}, você não tem permissão!`));
    }
}