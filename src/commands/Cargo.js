module.exports = {
    name: 'cargo',
    description: 'Give a role to an user by reaction',
    guildOnly: true,
    execute(message, args) {
        if (message.member.roles.cache.some(role => role.name === 'QueBom' || role.name === 'Moderadores')) { //Checks if user has permissions
            const messageId = args.slice(0, 1);
            const roleEmoji = args.slice(1, 2);
            const roleToGive = message.mentions.roles.first();

            message.delete();
            //Bot will react the specified message with the given emoji
            console.log('\x1b[35m%s\x1b[0m', 'messageId:', messageId, 'roleEmoji:', roleEmoji, 'roleToGive:', roleToGive.name); // show each argument on terminal
            message.channel.messages.fetch(`${messageId}`).then(msg => msg.react(`${roleEmoji}`));

            //Reaction Collector #3 (thanks to https://stackoverflow.com/users/10046076/daemon-beast i've done it!)
            message.channel.messages.fetch(`${messageId}`)
                .then(msg => {
                    const collector = msg.createReactionCollector((user) => !user.bot);
                
                    collector.on('collect', (reaction, user) => {
                        const member = reaction.message.guild.members.cache.find(member => member.id === user.id);

                            switch (reaction.emoji.name) {
                                case `${roleEmoji}`:
                                    member.roles.add(reaction.message.guild.roles.cache.find(role => role.name === `${roleToGive.name}`));
                                break;
                            }
                    });
                });
        }
    }
}