module.exports = { 
    name: 'modhelp',
    description: 'Show help list with mod\'s commands',
    guildOnly: true,
    execute(message) {
        if (message.member.roles.cache.some(role => role.name === 'QueBom' || role.name === 'Moderadores')) { //Checks if user has permissions
            const modEmbed = {
                color: '#df8edd',
                title: 'Comandos para moderadores do QueBomBOT',
                description: 'O prefixo para os comandos é `qb`',
                thumbnail: {
                    url: 'https://i.imgur.com/zYPqM6S.jpg'
                },
                fields: [
                    {
                        name: 'Argumentos',
                        value: '{} = obrigatório \n () = opcional',
                    },
                    {
                        name: 'ModHelp',
                        value: 'Mostra os comandos disponíveis para moderadores com suas descrições.',
                    },
                    {
                        name: 'Banir {Membro} (Razão)',
                        value: 'Bane o membro mencionado.',
                    },
                    {
                        name: 'Kick {Membro} (Razão)',
                        value: 'Expulsa o membro mencionado.',
                    },
                    {
                        name: 'Punir {Membro} (Razão)',
                        value: 'Puni o membro mencionado.',
                    },
                    {
                        name: 'Poll {Texto da votação}',
                        value: 'Cria uma votação com ✅ e ❌.',
                    },
                    {
                        name: 'Tag {Usuário} {Cargo}',
                        value: 'Dá o cargo especifícado ao usuário mencionado.',
                    },
                    {
                        name: 'Delete {nº de mensagens}',
                        value: 'Deleta mensagens que não passam de duas semanas.',
                    },
                    {
                        name: 'Canal {Configuração}',
                        value: 'Modifica o canal com a configuração disponível.',
                    },
                    {
                        name: 'Mural {Configuração}',
                        value: 'Comando exclusivo para o evento de Desenhos do QueBom.',
                    },
                    {
                        name: 'Cargo {id da Mensagem} {Emoji} {Cargo}',
                        value: 'Dá um cargo para quem reagir com os emojis selecionados na mensagem.',
                    },
                    {
                        name: 'Tag {Membro} {Cargo}',
                        value: 'Dá um cargo para o usuário mencionado.',
                    },
                ],
                timestamp: new Date(),
            };
            message.channel.send({embed: modEmbed});
            }
        else (message.channel.send(`${message.author}, você não pode usar este comando!`));
    }
}