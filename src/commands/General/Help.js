module.exports = {
    name: "help",
    aliases: ["ajuda"],
    description: "Mostra todos os comandos. Se especificado, mostra a descrição do tal.",
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
                    name: "Por questões de limitação, a lista completa de comandos está no link abaixo.",
                    value: "https://github.com/SrAranha/quebomBOT/blob/master/README.md",
                },
                {
                    name: "Argumentos",
                    value: "{} = obrigatório \n () = opcional",
                },
                {
                    name: "Avatar (Usuário)",
                    value: "Mostra o avatar/ícone do usuário que chamou o comando ou o usuário mencionado.",
                },
                {
                    name: "Convite",
                    value: "Envia o link para convite do servidor do QueBom Oficial.",
                },
                {
                    name: "Currency {Moeda} (Quantidade)",
                    value: "Faz a conversão de algumas moedas para o Real.",
                },
                {
                    name: "Help (Comando)",
                    value: "Mostra todos os comandos. Se especificado, mostra a descrição do tal.",
                },
                {
                    name: "Membro {Membro}",
                    value: "Mostra as redes sociais dos membros do QueBom.",
                },
                {
                    name: "QBomCAST",
                    value: "Mostra o que é o QueBomCAST.",
                },
                {
                    name: "Report {Mensagem}",
                    value: "Comando exclusivo para reportar problemas e outras coisas para o QueBomBOT.",
                },
            ],
            timestamp: new Date(),
        };

        //Dynamical help command

        if (!args[0]) {
            message.channel.send({embed: helpEmbed});
        }
        if (args[0]) {
            const commandName = args[0].toLowerCase();
            const command =
                message.client.commands.get(commandName) ||
                message.client.commands.find(
                    (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
                );
            if (!command) {
                return message.reply(`Não tem comando com o nome \`${commandName}\`.`);
            }
            if (command) {
                var cmdUse = `qb${command.name}`;
                if (command.args) {
                    var cmdUse = `qb${command.name} ${command.args}`;
                }
                var cmdAliases = command.aliases;
                if (!cmdAliases) {
                    var cmdAliases = "Este comando não tem aliases/apelidos.";
                }
                var cmdMod = "Não, é um comando de uso público.";
                if (command.modOnly) {
                    var cmdMod = "Sim, é um comando exclusivo de moderadores."
                }
                var cmdArgs = "Não há argumentos adicionais para este comando.";
                if (command.listArgs) {
                    var cmdArgs = command.listArgs;
                }
                
                const cmdEmbed = {
                    color: "#df8edd",
                    title: `Comando \`${command.name}\``,
                    description: `**${command.description}**`,
                    thumbnail: {
                        url: `${ID.displayAvatarURL()}`
                    },
                    fields: [
                        {
                            name: "Uso do comando:",
                            value: `\`${cmdUse}\``,
                        },
                        {
                            name: "Aliases/apelidos desse comando que pode ser trocado pelo nome:",
                            value: `\`${cmdAliases}\``,
                        },
                        {
                            name: "Possíveis argumentos adicionais do comando:",
                            value: `\`${cmdArgs}\``,
                        },
                        {
                            name: "Comando exclusivo para moderadores?",
                            value: `\`${cmdMod}\``,
                        },
                    ],
                    timestamp: new Date(),
                }
                message.channel.send({embed: cmdEmbed});
            }
        }
    }
}