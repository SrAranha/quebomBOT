module.exports = {
    name: 'delete',
    description: 'Deletes an amount of messages',
    execute(message, args) {
        if (message.member.roles.cache.some(role => role.name === 'QueBom' || role.name === 'Moderadores')) { //Checks if user has permissions
            const messagesTarget = args.slice(0).join(' ');
            message.delete()
            message.channel.bulkDelete(messagesTarget);
            message.channel.send(`Deleting ${messagesTarget} messages.`).then(msg => msg.delete({timeout: 3000}))
            console.log('bomdia')
        }
        else (message.channel.send(`${message.author}, você não pode usar este comando!`))
    }
}