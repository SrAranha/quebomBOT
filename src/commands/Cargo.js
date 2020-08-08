module.exports = {
    name: 'cargo',
    description: 'Give a role to an user by reaction',
    execute(message, args) {

        if (message.author.roles.cache.some(role => role.name === 'Moderadores' || role.name === 'QueBom' || message.author.id === '227887537102782464')) { //Checks if user has permissions
            function getRoleFromMention(mention) {
                if (!mention)
                    console.log('No role was passed');

                if (mention.startsWith('<@&') && mention.endsWith('>')) {
                    mention = mention.slice(3, -1);
                    return message.guild.roles.cache.get(mention);
                }
            }

            const messageId = args.slice(0, 1);
            const roleEmoji = args.slice(1, 2);
            const roleMention = args.slice(2, 3);
            const roleToGive = getRoleFromMention(`${roleMention}`);

            //Bot will react the specified message with the given emoji
            console.log('\x1b[35m%s\x1b[0m', 'messageId:', messageId, 'roleEmoji:', roleEmoji, 'roleMention', roleMention); // show each argument on terminal
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