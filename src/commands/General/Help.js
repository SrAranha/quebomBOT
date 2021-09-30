const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Mostra todos os comandos. Se especificado, mostra a descrição do tal.')
        .addStringOption(option =>
            option.setName('comando')
            .setDescription('Comando o qual deseja ver os detalhes.')
            .setRequired(false)),
	async execute(interaction) {
        const { queBomBOT_ID } = require("../../config.json");
        const id = interaction.client.users.cache.get(queBomBOT_ID);
        const helpEmbed = {
            color: "#df8edd",
            title: "Comandos do QueBomBOT",
            description: "Agora o bot funciona normalmente com \`/{nome do comando}\`",
            thumbnail: {
                url: `${id.displayAvatarURL()}`
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
                    name: "Membro (Membro)",
                    value: "Mostra as redes sociais dos membros do QueBom.",
                },
                {
                    name: "QueBomCAST",
                    value: "Mostra o que é o QueBomCAST.",
                },
                {
                    name: "Report {Mensagem}",
                    value: "Comando exclusivo para reportar problemas e outras coisas para o QueBomBOT.",
                },
            ],
            timestamp: new Date(),
        };

        const input = interaction.options.getString('comando');
        if (!input) {
            interaction.reply({ embeds: [helpEmbed] });            
        }
        else {
            const commandName = input.toLowerCase();
            const command = interaction.client.commands.get(commandName);

            if (!command) {
                interaction.reply({ content: `Desculpe, mas não tem um comando com o nome de ${commandName}` });
            } else {
                const cmdEmbed = {
                    color: "#df8edd",
                    title: `Comando \`${command.data.name}\``,
                    description: `**${command.data.description}**`,
                    thumbnail: {
                        url: `${id.displayAvatarURL()}`
                    },
                    fields: [
                        {
                            name: "No momento não tem mais detalhes para mostrar para este comando",
                            value: "Desculpe 😓",
                        },
                    ],
                    timestamp: new Date(),
                }
                interaction.reply({ embeds: [cmdEmbed] });
            }
        }
	},
};