module.exports = {
    name: "talk",
    aliases: ["falar", "fale", "tts"],
    args: "{entrar/sair/texto}",
    description: "Comando para que o bot entre no canal de voz e diga o texto indicado.",
    execute(message, args) {
        if (message.member.voice.channel) {
            message.delete();
            const googleTTS = require('google-tts-api');
            const msg = args[0];
            const channel = message.member.voice.channel;
            
            if (msg == "sair") {
                message.reply(`Saíndo do canal \`${channel.name}\`, até mais!`).then(msg => msg.delete({timeout: 3000}));
                const leaveChl = channel.leave();
            }
            if (msg == "entrar") {
                message.reply(`Entrando no canal \`${channel.name}\`!`).then(msg => msg.delete({timeout: 3000}));
                const enterChl = channel.join();
            }
            if (!msg) {
                message.reply("Você precisa indicar qual ação devo tomar. \`qbtlak {entrar/sair/*texto*}\`");
            }
            if (msg != "sair" && msg != "entrar" && msg != undefined) { 
                channel.join();
                var tts = googleTTS.getAudioUrl(args.slice(0).join(' '), { lang: "pt-BR" });
                async function play(voiceChannel) {
                    const connection = await voiceChannel.join();
                    connection.play(tts);
                }
                play(channel);
            }
        }
        else {
            message.reply("Você não está em um canal de voz.");
        }
    }
}