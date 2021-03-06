module.exports = {
    name: "convite",
    aliases: ["invite"],
    description: "Envia o link para convite do servidor do QueBom Oficial.",
    execute(message) {
        const inviteEmbed = {
            color: "#df8edd",
            title: "Convite para o servidor do QueBom Oficial",
            description: "Utilize este link para convidar outras pessoas para o servidor!",
            thumbnail: {
                url: "https://i.imgur.com/zYPqM6S.jpg",
            },            
            fields: [
                {
                    name: "Convite: ",
                    value: "https://discord.gg/rgY93qR",
                },
            ],
            timestamp: new Date(),
            footer: {
                text: "Chama todo mundo ai namoral!"
            }
        };
        message.channel.send({embed: inviteEmbed});
    }
}