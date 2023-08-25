const { SlashCommandBuilder } = require('@discordjs/builders');
const editJsonFile = require('edit-json-file');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('frases')
    .setDescription('As frases da Forja')
    .addSubcommand(add =>
        add.setName('adicionar')
        .setDescription('Adicione uma frase ao bot.')
        .addStringOption(addFrase =>
            addFrase.setName('add_frase')
            .setDescription('Frase para adicionar ao bot.')
            .setRequired(true))
        .addStringOption(addAuthor =>
            addAuthor.setName('add_autor')
            .setDescription('Autor da frase')
            .setRequired(false))
        .addIntegerOption(addDate =>
            addDate.setName('add_ano')
            .setDescription('Ano da frase dita')
            .setRequired(false)))
    .addSubcommand(frase =>
        frase.setName('frase')
        .setDescription('Tire uma frase icônica!')
        .addIntegerOption(option =>
            option.setName('fraseid')
            .setDescription('O id da frase que você quer.')
            .setRequired(false))),
    async execute(interaction) {
        let id;
        let fList = editJsonFile(`${__dirname}/frases.json`);
        var frasesAmount = fList.get('frasesAmount');
        var frasesEmbed;

        if (interaction.options.getSubcommand() === 'frase') {
            var hasID = interaction.options.getInteger('fraseid');
            if (hasID != null) { id = hasID }
            else if (hasID == null) { id = Math.floor(Math.random() * frasesAmount + 1) }
            
            var author = fList.get(`${id}.author`)
            if (!author) { var author = "Anônimo" };
            
            var date = fList.get(`${id}.date`)
            if (!date) { var date = "Em algum momento..." };
            
            var frase = fList.get(`${id}.frase`)

            frasesEmbed = {
                title: "A frase da vez é:",
                fields: [
                    {
                        name: `${frase}`,
                        value: `${author} - ${date}`
                    }, 
                ],
            footer: { text: `Essa foi a frase de número: ${id}.` }
            }
        };
        if (interaction.options.getSubcommand() === 'adicionar') {
            var addFrase = interaction.options.getString('add_frase');
            var addAuthor = interaction.options.getString('add_autor');
            var addDate = interaction.options.getInteger('add_ano');
            
            id = frasesAmount + 1;
            // Adicionar frase.
            fList.set(`${id}.frase`, addFrase);

            if (addAuthor) { fList.set(`${id}.author`, addAuthor); }
            else if (!addAuthor) { addAuthor = "Anônimo" };

            if (addDate) { fList.set(`${id}.date`, addDate); }
            else if (!addDate) { addDate = "Em algum momento..." };

            fList.set('frasesAmount', id);
            fList.save();
            fList = editJsonFile(`${__dirname}/frases.json`, { autosave: true });
            // Retornar um embed mostrando a frase adicionada
            frasesEmbed = {
                color: "#00ff00",
                title: "Nova frase adicionada!",
                author: {
                    name: `${interaction.user.username}`,
                    icon_url: `${interaction.user.avatarURL()}`,
                },
                fields: [
                    {
                        name: `${addFrase}`,
                        value: `${addAuthor} - ${addDate}`
                    }, 
                ],
                footer: { text: `Frase de número: ${id}`}
            }
        };
        interaction.reply({ embeds: [frasesEmbed] });
    }
}
