module.exports = {
    name: 'cargo',
    description: 'Give a role to an user by reaction',
    execute(message, args) {
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

        //Reaction Collector filter
        const filter = (reaction, user) => { return reaction.emoji.name === `${roleEmoji}` /*&& user.id === message.author.id*/; };

        //Reaction Collector
        message.channel.messages.fetch(`${messageId}`)
            .then(msg => msg.awaitReactions(filter, { max: 4, time: 20000, errors: ['time'] })
                .then(collected => console.log(collected.size))
	            .catch(collected => {
	            	console.log(`After a minute, only ${collected.size} out of 4 reacted. [ReactionCollector#2]`);
	            }));
    }
}