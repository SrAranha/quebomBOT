module.exports = {
    name: 'cargo',
    description: 'Give a role to an user by reaction',
    guildOnly: true,
    execute(message, args) {
        if (message.member.hasPermission(ADMINISTRATOR) || message.member.hasPermission(MANAGE_ROLES || message.member.hasPermission(MANAGE_MESSAGES))) { 
            const messageId = args.slice(0, 1);
            const roleEmoji = args.slice(1, 2);
            const roleToGive = message.mentions.roles.first();
            function customEmoji(emoji) {
                if (!emoji) return;
                emoji = emoji.toString();
                if (emoji.startsWith('<:')) {
                    emoji = emoji.slice(2);
                    
                    if (emoji.endsWith('>')) {
                        emoji = emoji.slice(0, -20);
                    }
                    return emoji;
                }
            }
            const reactEmoji = message.guild.emojis.cache.find(react => react.name === customEmoji(roleEmoji));

            message.delete();
            //Bot will react the specified message with the given emoji
            console.log('\x1b[35m%s\x1b[0m', 'messageId:', messageId, 'roleEmoji:', roleEmoji, 'reactEmoji:', reactEmoji.id , 'roleToGive:', roleToGive.name); // show each argument on terminal
            message.channel.messages.fetch(`${messageId}`).then(msg => msg.react(`${reactEmoji.id}`));

            //Reaction Collector #3 (thanks to https://stackoverflow.com/users/10046076/daemon-beast i've done it!)
            message.channel.messages.fetch(`${messageId}`)
                .then(msg => {
                    const collector = msg.createReactionCollector((user) => !user.bot);
                
                    collector.on('collect', (reaction, user) => {
                        const member = reaction.message.guild.members.cache.find(member => member.id === user.id);

                            switch (reaction.emoji.name) {
                                case `${reactEmoji.name}`:
                                    member.roles.add(reaction.message.guild.roles.cache.find(role => role.name === `${roleToGive.name}`));
                                break;
                            }
                    });
                });
        }
    }
}