module.exports = {
    name: 'delete',
    aliases: ['deletar'],
    description: 'Deletes an amount of messages',
    args: true,
    guildOnly: true,
    execute(message, args) {
        //const roleMaxDel;
        if (message.member.hasPermission("ADMINISTRATOR") || message.member.hasPermission("MANAGE_MESSAGES")) { 
            const messagesTarget = parseInt(args.slice(0).join(' '));
            if (messagesTarget > 100) {
                message.reply("O máximo de mensagens para serem deletadas é 100");
            }
            else if (messagesTarget <= 100) { 
                message.delete()
                message.channel.bulkDelete(messagesTarget);
                message.channel.send(`Deleting ${messagesTarget} messages.`).then(msg => msg.delete({timeout: 3000}));
            }
        }   
        else (message.reply('você **não** tem permissão para usar este comando!'));
    }
}