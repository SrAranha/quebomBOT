module.exports = {
    name: "help",
    aliases: ["ajuda"],
    description: "Show all commands",
    execute(message, args, client) {
		const { queBomBOT_ID } = require("../../config.json");
        const ID = client.users.cache.get(queBomBOT_ID);
        const helpEmbed = {
            color: "#df8edd",
            title: "Comandos do QueBomBOT",
            description: "O prefixo para os comandos é `qb`",
            thumbnail: {
                url: `${ID.displayAvatarURL()}`
            },
            fields: [
                {
                    name: "Argumentos",
                    value: "{} = obrigatório \n () = opcional",
                },
                {
                    name: "Aranha, Kuro, Marvin, Pepinow, Pirao, Poleza",
                    value: "Mostra as redes sociais dos membros do QueBom.",
                },
                {
                    name: "Avatar (Usuário)",
                    value: "Mostra o avatar do usuário que chamou o comando ou o usuário mencionado.",
                },
                {
                    name: "Calc {Operação}",
                    value: "Comando que calcula a operação enviada. Função ainda em construção.",
                },
                {
                    name: "Convite",
                    value: "Envia o link para convite do servidor do QueBom Oficial.",
                },
                {
                    name: "Currency {Moeda} {Quantidade}",
                    value: "Faz a conversão de algumas moedas para o Real.",
                },
                {
                    name: "Help",
                    value: "Mostra os comandos disponíveis com suas descrições.",
                },
                {
                    name: "Ping",
                    value: "Pong!",
                },
                {
                    name: "QBomCAST",
                    value: "Mostra o que é o QueBomCAST.",
                },
                {
                    name: "Report",
                    value: "Comando exclusivo para reportar problemas e outras coisas para o QueBomBOT.",
                },
            ],
            timestamp: new Date(),
        };
        message.channel.send({embed: helpEmbed});
    }
}