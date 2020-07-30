module.exports = {
    name: 'marvin',
    description: 'Marvin\'s info',
    execute(message, args) {
        const profileEmbed = {
            color: '#1B90C6',
            title: 'Onde encontrar o Marvin',
            author: {
                name: 'Marvin',
                icon_url: 'https://cdn.discordapp.com/avatars/242419392204242955/3d07cc2d85c990c50baef3aba9263a03.webp',
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
                    name: 'Instagram',
                    value: 'https://bit.ly/30dwaP4',
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
/*Discord.MessageEmbed()
.setColor('#1B90C6')
.setTitle('Marvin')
.setAuthor('QueBomBOT', '../assets/qbomBOT_Logo')
.setDescription('Onde encontrar o Marvin')
.setThumbnail('')
.addFields(
    { name: 'Twitch', value: 'https://bit.ly/3gdxuXs'},
    { name: 'Twitter', value: 'https://bit.ly/2Xa0WWT'},
    { name: 'Instagram', value: 'https://bit.ly/30dwaP4'},
    { name: 'Youtube', value: 'https://bit.ly/3373pFr'},
)*/