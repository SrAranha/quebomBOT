const editJsonFile = require('edit-json-file');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('frases')
    .setDescription('As frases da Forja')
    .addIntegerOption(option =>
        option.setName('fraseid')
        .setDescription('O id da frase que você quer')
        .setRequired(false)),
    async execute(interaction) {
        let id;
        let fList = editJsonFile(`${__dirname}/frases.json`);
        var frasesAmount = fList.get('frasesAmount');

        var hasID = interaction.options.getInteger('fraseid');

        if (hasID != null) { id = hasID }
        else if (hasID == null) { id = Math.floor(Math.random() * frasesAmount + 1) }

        var author = fList.get(`${id}.author`)
        if (!author) { var author = "Anônimo" };
        
        var date = fList.get(`${id}.date`)
        if (!date) { var date = "Em algum momento..." };
        
        var frase = fList.get(`${id}.frase`)
        const frasesEmbed = {
            title: "A frase da vez é:",
            fields: [
                {
                    name: `${frase}`,
                    value: `${author} - ${date}`
                },
            ],
            footer: {
                text: `Essa foi a frase de número: ${id}.`
            }
        };
        interaction.reply({ embeds: [frasesEmbed] });
    }
}
