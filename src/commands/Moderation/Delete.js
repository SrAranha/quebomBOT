module.exports = {
    name: "delete",
    aliases: ["deletar", "dlt"],
    description: "Deletes an amount of messages",
    args: true,
    guildOnly: true,
    execute(message, args) {
        if (message.member.hasPermission("ADMINISTRATOR") || message.member.hasPermission("MANAGE_MESSAGES")) { 
            const messagesTarget = parseInt(args.slice(0).join(' '));
            if (!messagesTarget) {
                message.reply("Você **não** proveu argumentos para o comando!");
            }
            if (messagesTarget > 100) {
                message.reply("O máximo de mensagens para serem deletadas é **100**");
            }
            else if (messagesTarget <= 100) { 
                message.delete();
                message.channel.bulkDelete(messagesTarget);
                message.channel.send(`Deletando ${messagesTarget} mensagens.`).then(msg => msg.delete({timeout: 3000}));
            }
        }   
        else (message.reply("você **não** tem permissão para usar este comando!"));
    }
}