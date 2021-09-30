const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('quebomcast')
    .setDescription('Mostra o que é o QueBomCAST'),
    async execute(interaction) {
        const { queBomBOT_ID } = require('../../config.json');
        const id = interaction.client.users.cache.get(queBomBOT_ID);
        const qbCastEmbed = {
            color: "#df8edd",
            title: "QueBomCAST",
            description: "Informações sobre o QueBomCAST.",
            thumbnail: {
                url: `${id.displayAvatarURL()}`,
            },
            fields: [
                {
                    name: "O que é o QueBomCAST?",
                    value: "O QueBomCAST é o podcast do Quebom, onde quase nunca se tem tema, ou o tema é decido em cima da hora, sempre com um papo bem divertido.",
                },
                {
                    name: "Youtube",
                    value: "Se inscreva no canal no youtube do QueBomCAST para poder assitir as gravações dos episódios! >https://bit.ly/2GCMotx<",
                },
                {
                    name: "Transmissões ao vivo",
                    value: "Geralmente os episódios são transmitidos nos canais da twitch dos membros do QueBom. Sigam lá!",
                },
            ],
            timestamp: new Date(),
        };
        interaction.reply({ embeds: [qbCastEmbed] });
    }
}