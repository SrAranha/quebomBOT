module.exports = {
    name: 'forja',
    description: "Exclusive command for Dracma's Forja",
    execute(message) {
        const { serverForja_ID, serverTestes_ID } = require("../config.json")
        if (message.guild.id === serverForja_ID || message.guild.id === serverTestes_ID ) {
            const { SoroKingu_ID, AranhaBoladona_ID, TexugoFurioso_ID, jreginna_ID, ilustraGra_ID } = require('../config.json');
            const names = ['SoroKingu', 'AranhaBoladona', 'TexugoFurioso', 'jreginna', 'ilustraGra'];
            let chance = names[Math.floor(Math.random() * names.length)];

            switch (message.author.id) {

                case SoroKingu_ID:
                    const Sphrases = ["VAGABUNDO!", "Iih, o ilustrador chegou...", "Grande Dracma!", ];
                    message.reply(`${Sphrases[Math.floor(Math.random() * Sphrases.length)]} Hoje é a vez d@ ${chance}!`);
                    break;

                case AranhaBoladona_ID:
                    const Aphrases = ["Olá melhor batateiro do mundo.", "Bode meu bom homem.", ];
                    message.reply(`${Aphrases[Math.floor(Math.random() * Aphrases.length)]} Hoje é a vez d@ ${chance}!`);
                    break;

                case TexugoFurioso_ID:
                    const Tphrases = ["\"Não existem fatos, apenas interpretações.\"", "Tá comendo as fibras direitinho?"];
                    message.reply(`${Tphrases[Math.floor(Math.random() * Tphrases.length)]} Hoje é a vez d@ ${chance}!`);
                    break;

                case jreginna_ID:
                    const Jphrases = ["Olá minha cientista florense favorita!", "Oie Jurega.",];
                    message.reply(`${Jphrases[Math.floor(Math.random() * Jphrases.length)]} Hoje é a vez d@ ${chance}!`);
                    break;

                case ilustraGra_ID:
                    const Gphrases = ["Olá Gra, quer tomar um café? :Kappa:", "Olha se não é a 28cm!",];
                    message.reply(`${Gphrases[Math.floor(Math.random() * Gphrases.length)]} Hoje é a vez d@ ${chance}!`);
                    break;

                default:
                    message.reply('você não pode usar este comando!')
                    break;
            }
        }
        else message.reply("Esse não é um servidor autorizado a utilizar este comando!");
    }
}