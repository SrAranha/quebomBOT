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
            message.reply(`Você precisa indicar qual membro quer: \`${mInfo.memberList}\``);
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
                const memberEmbed = {
                    color: `${mInfo[member].color}`,
                    title: `Redes sociais de ${mInfo[member].name}`,
                    author: {
                        name: `${ID.username}`,
                        icon_url: `${ID.displayAvatarURL()}`
                    },
                    fields: [
                        {
                            name: "Twitch",
                            value: `${mInfo[member].twitch}`,
                        },
                        {
                            name: "Twitter",
                            value:  `${mInfo[member].twitter}`,
                        },
                        {
                            name: "Youtube",
                            value:  `${mInfo[member].youtube}`,
                        },
                    ],
                    timestamp: new Date(),
                };
                message.channel.send({embed: memberEmbed});
            }
        }
    }
}