const fs = require('fs');
const path = require('path');
const editJsonFile = require('edit-json-file');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('frases')
		.setDescription('Comando para que o bot entre no canal de voz e diga o texto indicado.')
        .addSubcommand(opt =>
            opt.setName('adicionar')
            .setDescription('Adicione uma nova frase.')
            .addStringOption(text =>
                text.setName('nova_frase')
                .setDescription('Frase para adicionar.')
                .setRequired(true)))
        .addSubcommand(idOpt =>
            idOpt.setName('id_frase')
            .setDescription('Id da frase que queira ver, ou deixe em branco para aleatorizar.')
            .addNumberOption(id =>
                id.setName('id_frase')
                .setDescription('Id da frase.')
                .setRequired(false))),
	async execute(interaction) {
        const cfg = fs.readFileSync(path.resolve(__dirname, 'frases.json'));
        const phrases = JSON.parse(cfg); // json with server infos
        const server = "server_" + interaction.guildId;
        const idPhrase = interaction.options.getNumber('id_frase');
        const newPhrase = interaction.options.getString('nova_frase');
        const id = 1;

        interaction.reply({ content: server });
        interaction.deleteReply();

        if (interaction.options.getSubcommand() === 'adicionar') {
            let file = editJsonFile(`${__dirname}/frases.json`);
            var lastId = file.get('lastId');
            if (!lastId) {
                lastId = 0;
            }
            file.set(`${server}.lastId`, 'lastId++');
            file.set(`${server}.${id}`, newPhrase);
            file.save();
            file = editJsonFile(`${__dirname}/tinfo.json`, {
                autosave: true
            });
        }

        if (interaction.options.getSubcommand() === 'id_frase') {
            
        }
    }
}