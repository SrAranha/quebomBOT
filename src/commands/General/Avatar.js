const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('avatar')
    .setDescription('Mostra o avatar/ícone do usuário que chamou o comando ou o usuário mencionado.')
    .addUserOption(user => 
        user.setName('user')
        .setDescription('Usuário que deseja ver.')
        ),
    async execute(interaction) {
        const user = interaction.options.getUser('user');
        if (!user) {
            await interaction.reply(interaction.user.displayAvatarURL());
        } else {
            await interaction.reply(user.displayAvatarURL());
        }
    }
}