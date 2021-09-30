const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('convite')
    .setDescription('Envia o link para convite do servidor do QueBom Oficial.'),
    async execute(interaction) {
        const { queBomBOT_ID } = require('../../config.json');
        const id = interaction.client.users.cache.get(queBomBOT_ID);
        const inviteEmbed = {
            color: "#df8edd",
            title: "Convite para o servidor do QueBom Oficial",
            description: "Utilize este link para convidar outras pessoas para o servidor!",
            thumbnail: {
                url: `${id.displayAvatarURL()}`,
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
        interaction.reply({ embeds: [inviteEmbed] });
    }
}