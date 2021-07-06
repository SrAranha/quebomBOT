module.exports = {
    name: "membro",
    aliases: ["member"],
    description: "Informações sobre os membros do QueBom",
    args: "{membro}",
    execute(message, args, client) {
        message.delete();
        const { queBomBOT_ID } = require("../../config.json");
        const mInfo = require("./members.json");
        const getMember = args[0];

        if (!getMember) {
            var ID = client.users.cache.get(queBomBOT_ID);
            var memberList = {
                color: "#df8edd",
                title: "Lista dos membros do QueBom",
                author: {
                    name: `${ID.username}`,
                    icon_url: `${ID.displayAvatarURL()}`
                },
                fields: [
                    {
                        name: "Membros atuais do QueBom",
                        value: `\`${mInfo.memberList}\``,
                    },
                ],
                timestamp: new Date(),
            };
            message.channel.send({embed: memberList});
        }
        else {
            var member = getMember.toLowerCase();
            if (!mInfo.memberList.includes(member)) {
                message.reply("Este não é um membro do QueBom!");
            }
            else {
                var ID = client.users.cache.get(mInfo[member].id);
                if (!ID) { 
                    var ID = client.users.cache.get(queBomBOT_ID);
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
                message.channel.send({embed: memberEmbed});
            }
        }
    }
}