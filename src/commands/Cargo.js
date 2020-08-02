module.exports = {
    name: 'cargo',
    description: 'Give a role to an user by reaction',
    execute(message, args) {
        const messageId = args.slice(0, 1);
        const roleEmoji = args.slice(1);
        const fetchMessage = message.channel.fetch(`${messageId}`)
        //const roleGive = MessageMentions.roles;
        console.log('\x1b[35m%s\x1b[0m','messageId:', messageId,'roleEmoji:', roleEmoji)
        message.channel.messages.fetch(`${messageId}`).then(() => message.react(`${roleEmoji}`));
        message.channel.send(`${messageId}, ${roleEmoji}`);
    }
}