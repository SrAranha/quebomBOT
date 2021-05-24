module.exports = {
    name: 'delete',
    description: 'Deletes an amount of messages',
    guildOnly: true,
    execute(message, args) {
        //const roleMaxDel;
        if (message.member.hasPermission(ADMINISTRATOR) || message.member.hasPermission(MANAGE_MESSAGES)) { 
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
        else (message.reply('você não pode usar este comando!'))
    }
}