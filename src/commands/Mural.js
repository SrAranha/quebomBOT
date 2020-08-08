module.exports = {
    name: 'mural',
    description: 'Specific command for #Mural',
    execute(message, args) {
        message.delete() //deletes message calling the command

        if (message.author.roles.cache.some(role => role.name === 'Moderadores' || role.name === 'QueBom')) { //Check if the author has autorization
            const messageId = args.slice(0, 1); //save the message id for react
            message.channel.messages.fetch(`${messageId}`).then(msg => msg.react('✅')); //react the message with ✅
        } 
        else if (message.author.id === '219502603275468810') { //Check is the author is @Fanto
            const messageId = args.slice(0, 1); //save the message id for react
            message.channel.messages.fetch(`${messageId}`).then(msg => msg.react('✅')); //react the message with ✅
        } 
        else {
            message.channel.send(`${message.author}, você não tem permissão para usar esse comando!`)
        }
    }
}