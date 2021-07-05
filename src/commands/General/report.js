module.exports = {
    name: "report",
    aliases: ["reportar"],
    description: "Comando exclusivo para reportar problemas e outras coisas para o QueBomBOT.",
    args: "{mensagem}",
    execute(message, args, client) {
        const { queBomBOT_ID } = require("../../config.json");
        const ID = client.users.cache.get(queBomBOT_ID);
        const rptMessage = args.slice(0).join(' ');
        const reportChannel = client.channels.cache.find(channel => channel.id === "855534581951365161");
 
        const reportEmbed = {
            author: {
                name: `${message.author.username}`,
                icon_url: `${message.author.displayAvatarURL()}`,
            },
            fields: [
                {
                    name: `Report received from \`${message.guild.name} (${message.guild.id})\``,
                    value: `${rptMessage}`,
                },
            ],
            timestamp: new Date(),
            footer: {
                icon_url: `${ID.displayAvatarURL()}`,
            }
        }

        message.delete();
        reportChannel.send({embed: reportEmbed});
    },
}