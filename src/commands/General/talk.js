const editJsonFile = require('edit-json-file');
const fs = require('fs');
const path = require('path');
const googleTTS = require('google-tts-api');

module.exports = {
    name: "talk",
    aliases: ["falar", "fale", "tts"],
    args: "{entrar/sair/lang/texto/set {idioma}}",
    description: "Comando para que o bot entre no canal de voz e diga o texto indicado.",
    execute(message, args, client) {
        if (message.member.voice.channel) {
            message.delete();
            
            const msg = args[0];
            if (!msg) { // If no text/args return error
                message.reply("Você precisa indicar qual ação devo tomar. \`qbtlak {entrar/sair/*texto*}\`");
            }
            const cfg = fs.readFileSync(path.resolve(__dirname, 'tinfo.json'));
            const tInfo = JSON.parse(cfg);

            const addArgs = ["sair", "entrar", "lang", "set"];
            const server = "server_" + message.guild.id;

            const channel = message.member.voice.channel;
            if (msg) {   
                if (msg == "sair") { // Leaves voice channel
                    message.reply(`Saíndo do canal \`${channel.name}\`, até mais!`).then(msg => msg.delete({timeout: 3000}));
                    const leaveChl = channel.leave();
                }
                if (msg == "entrar") { // Enters voice channel
                    message.reply(`Entrando no canal \`${channel.name}\`!`).then(msg => msg.delete({timeout: 3000}));
                    const enterChl = channel.join();
                }
                if (msg == "lang") { // Link to availiable languages
                    var { queBomBOT_ID } = require("../../config.json");
                    var ID = client.users.cache.get(queBomBOT_ID);
                    var langTTS = tInfo[server].lang;
                    if (!langTTS) {
                        var langTTS = "pt-BR";                        
                    }
                    var langEmbed = {
                        color: "#df8edd",
                        title: "Idiomas do TTS",
                        thumbnail: {
                            url: `${ID.displayAvatarURL()}`
                        },
                        fields: [
                            {
                                name: "O idioma atual desse servidor é:",
                                value: langTTS,
                            },
                            {
                                name: "Para saber quais os idiomas suportados pelo bot, entre no link abaixo: ",
                                value: "https://cloud.google.com/speech-to-text/docs/languages",
                            }
                        ]
                    }
                    message.channel.send({embed: langEmbed})
                }
                if (msg.length >= 201) { // Text limit = 200 characters
                    message.reply("O texto pode ter no máximo 200 caracteres.");
                }
                if (msg == "set") {
                    if (!args[1]) {
                        message.reply("Você precisa indicar uma língua.");                        
                    }
                    if (args[1]) {
                        let file = editJsonFile(`${__dirname}/tinfo.json`);
                        file.set(`server_${message.guild.id}.name`, `${message.guild.name}`);
                        file.set(`server_${message.guild.id}.lang`, `${args[1]}`);
                        file.save();
                        file = editJsonFile(`${__dirname}/tinfo.json`, {
                            autosave: true
                        });
                    }
                }
                else if (!addArgs.includes(msg) && msg != undefined) { 
                    channel.join();
                    var langTTS = "pt-BR";
                    if (tInfo[server]) {
                        var langTTS = tInfo[server].lang;
                    }
                    var tts = googleTTS.getAudioUrl(args.slice(0).join(' '), { lang: langTTS });
                    async function play(voiceChannel) {
                        const connection = await voiceChannel.join();
                        connection.play(tts);
                    }
                    play(channel);
                }
            }
        }
        else { message.reply("Você não está em um canal de voz."); }
    }
}