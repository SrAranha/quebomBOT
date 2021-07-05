module.exports = {
    name: "poll",
    aliases: ["enquete"],
    description: "Cria uma votação com ✅ e ❌",
    guildOnly: true,
    modOnly: true,
    args: "{Texto da Votação}",
    execute(message, args) {
        message.delete();
        if (message.member.hasPermission("ADMINISTRATOR") || message.member.hasPermission("MANAGE_MESSAGES")) { 
            const pollText = args.slice(0).join(" ");
            const pollAuthor = message.author;
            const pollEmbed = {
                color: "#df8edd",
                title: `${pollText}`,
                author: {
                    name: `Criado por: ${pollAuthor.username}`,
                    icon_url: `${pollAuthor.avatarURL()}`,
                },
                timestamp: new Date(),
            };
            if (!pollText) {
                message.channel.send("Por favor, coloque o que está em votação após o comando!")
            }
            else if (
            message.channel.send({embed: pollEmbed}).then(message => message.react("✅").then(() => message.react("❌"))));
        }
        else (message.reply("você **não** tem permissão para usar este comando!"));
    }
}