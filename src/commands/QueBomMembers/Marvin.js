module.exports = {
    name: 'marvin',
    description: 'Marvin\'s info',
    execute(message, args, client) {
        const { Marvin_ID, QueBomBOT_ID } = require("../config.json");
        var ID = client.users.cache.get(Marvin_ID);
        if (!ID) { var ID = client.users.cache.get(QueBomBOT_ID); };
        
        const profileEmbed = {
            color: '#1B90C6',
            title: 'Onde encontrar o Marvin',
            author: {
                name: `${ID.username}`,
                icon_url: `${ID.displayAvatarURL()}`
            },
            fields: [
                {
                    name: 'Twitch',
                    value: 'https://bit.ly/3gdxuXs',
                },
                {
                    name: 'Twitter',
                    value: 'https://bit.ly/2Xa0WWT',
                },
                {
                    name: 'Youtube',
                    value: 'https://bit.ly/3373pFr',
                },
            ],
            timestamp: new Date(),
        };
        message.channel.send({ embed: profileEmbed });
    }
}