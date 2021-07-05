module.exports = { 
    name: "modhelp",
    description: "Mostra os comandos disponíveis para moderadores com suas descrições.",
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
                    var cmdUse = `qb${command.name} [argumento]`;
                }
                var cmdAliases = command.aliases;
                if (!cmdAliases) {
                    var cmdAliases = "Este comando não tem aliases/apelidos.";
                }
                var cmdMod = "Não, é um comando de uso público.";
                if (command.modOnly) {
                    var cmdMod = "Sim, é um comando exclusivo de moderadores."
                }
                var cmdArgs = "Não há argumentos para este comando.";
                if (command.listArgs) {
                    var cmdArgs = command.listArgs;
                }
                
                const cmdEmbed = {
                    color: "#df8edd",
                    title: `Descrição do ${command.name}`,
                    description: `${command.description}`,
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