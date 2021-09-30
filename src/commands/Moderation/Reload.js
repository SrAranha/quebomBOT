const fs = require('fs');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('reload')
    .setDescription('Reload a certain command')
    .addStringOption(option =>
        option.setName('commandname')
        .setDescription('Command to reload.')
        .setRequired(true)),
    async execute(interaction) {
        const { AranhaBoladona_ID } = require("../../config.json");
        //Checks if its me (Sr_Aranha) who passes the command
        if (!interaction.user.id === AranhaBoladona_ID) {
            interaction.reply("Você não tem permissão para utilizar este comando");
        }
        
        const commandName = interaction.options.getString("commandname");
        const command = interaction.client.commands.get(commandName);
        
        await interaction.reply({ content: `Reloading \`${command}\`` });
        if (!command) {
            interaction.reply(`Não tem comando com o nome \`${commandName}\`.`);
        }

        if (command) {
            const commandFolders = fs.readdirSync('./commands');
            
            let folderName;
            
            commandFolders.map((folder) => {
                fs.readdirSync(`${__dirname}/../${folder}/`).find((element) => {
                    if (element === `${command.data.name}.js`) {
                        delete require.cache[
                            require.resolve(`../${folder}/${command.data.name}.js`)
                        ];
                        
                        folderName = folder;
                    }
                });
            });
            
            try {
                const newCommand = require(`../${folderName}/${command.data.name}.js`);
                interaction.client.commands.set(newCommand.data.name, newCommand);
                console.log("\x1b[35m%s\x1b[0m", `Command ${newCommand.data.name} was reloaded!`);
                await interaction.deleteReply();
            } catch (error) {
                console.error(error);
                interaction.reply(
                    `There was an error while reloading a command \`${command.data.name}\`:\n\`${error.message}\``
                    );
            }
        }
    },
};