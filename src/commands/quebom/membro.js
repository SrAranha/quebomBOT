const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('membro')
    .setDescription('Informações sobre os membros do QueBom.')
    .addStringOption(option =>
        option.setName('membro')
        .setDescription('Nome do membro que dejesa ver.')
        .setRequired(false)),
    async execute(interaction) {
        const mInfo = require("./members.json");
        const { queBomBOT_ID } = require('../../config.json');
        const id = interaction.client.users.cache.get(queBomBOT_ID);
        
        var member = interaction.options.getString('membro');
        if (!member) {
            var memberListEmbed = {
                color: "#df8edd",
                title: "Lista dos membros do QueBom",
                author: {
                    name: `${id.username}`,
                    icon_url: `${id.displayAvatarURL()}`
                },
                fields: [
                    {
                        name: "Membros atuais do QueBom",
                        value: `\`${mInfo.memberList}\``,
                    },
                ],
                timestamp: new Date(),
            };
            interaction.reply({ embeds: [memberListEmbed] });
        } 
        else {
            member = member.toLowerCase();

            if (!mInfo.memberList.includes(member)) {
            interaction.reply("Este não é um membro do QueBom.");            
            }
        
            if (mInfo.memberList.includes(member)) {
                var ID = interaction.client.users.cache.get(mInfo[member].id);
                if (!ID) { 
                    var ID = interaction.client.users.cache.get(queBomBOT_ID);
                };
                var memberTwitch = mInfo[member].twitch;
                if (!memberTwitch) {
                    var memberTwitch = "Este membro não possuí tal rede.";
                }
                var memberTwitter = mInfo[member].twitter;
                if (!memberTwitter) {
                    var memberTwitter = "Este membro não possuí tal rede.";
                }
                var memberYt = mInfo[member].youtube;
                if (!memberYt) {
                    var memberYt = "Este membro não possuí tal rede.";
                }
                const memberEmbed = {
                    color: `${mInfo[member].color}`,
                    title: `Redes sociais de ${mInfo[member].name}`,
                    author: {
                        name: `${ID.username}`,
                        icon_url: `${ID.displayAvatarURL()}`
                    },
                    fields: [
                        {
                            name: `Twitch ${mInfo.emojis.twitch}`,
                            value: `${memberTwitch}`,
                        },
                        {
                            name: `Twitter ${mInfo.emojis.twitter}`,
                            value:  `${memberTwitter}`,
                        },
                        {
                            name: `Youtube ${mInfo.emojis.youtube}`,
                            value:  `${memberYt}`,
                        },
                    ],
                    timestamp: new Date(),
                };
                interaction.reply({ embeds: [memberEmbed] });
            }
        }   
    }
}