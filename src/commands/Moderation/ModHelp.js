module.exports = { 
    name: "modhelp",
    description: "Show help list with mod\"s commands",
    guildOnly: true,
    execute(message) {
        const modEmbed = {
            color: "#df8edd",
            title: "Comandos para moderadores do QueBomBOT",
            description: "O prefixo para os comandos é `qb`",
            thumbnail: {
                url: "https://i.imgur.com/zYPqM6S.jpg"
            },
            fields: [
                {
                    name: "Argumentos",
                    value: "{} = obrigatório \n () = opcional",
                },
                {
                    name: "Banir {Membro} (Razão)",
                    value: "Bane o membro mencionado.",
                },
                {
                    name: "Canal {Configuração}",
                    value: "Modifica o canal com a configuração disponível.",
                },
                {
                    name: "Cargo {id da Mensagem} {Emoji} {Cargo}",
                    value: "Dá um cargo para quem reagir com os emojis selecionados na mensagem.",
                },
                {
                    name: "Delete {nº de mensagens}",
                    value: "Deleta mensagens que não passam de duas semanas.",
                },
                {
                    name: "Kick {Membro} (Razão)",
                    value: "Expulsa o membro mencionado.",
                },
                {
                    name: "ModHelp",
                    value: "Mostra os comandos disponíveis para moderadores com suas descrições.",
                },
                {
                    name: "Mural {Configuração}",
                    value: "Comando exclusivo para o evento de Desenhos do QueBom.",
                },
                {
                    name: "Poll {Texto da votação}",
                    value: "Cria uma votação com ✅ e ❌.",
                },
                {
                    name: "Punir {Membro} (Razão)",
                    value: "Puni o membro mencionado.",
                },
                {
                    name: "Tag {Usuário} {Cargo}",
                    value: "Dá o cargo especifícado ao usuário mencionado.",
                },
            ],
            timestamp: new Date(),
        };
        message.channel.send({embed: modEmbed});
    }
}