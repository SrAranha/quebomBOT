module.exports = {
    name: 'mural',
    description: 'Specific command for #Mural',
    guildOnly: true,
    execute(message, args) {
        if (message.member.roles.cache.some(role => role.name === 'QueBom' || role.name === 'Moderadores')) { //Checks if user has permissions
            message.delete() //deletes message calling the command
            const messageId = args.slice(0, 1); //save the message id for react
            message.channel.messages.fetch(`${messageId}`).then(msg => msg.react('✅')); //react the message with ✅
        }
        else (message.channel.send(`${message.author}, você não tem permissão!`));
    }
}