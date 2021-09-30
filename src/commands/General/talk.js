const fs = require('fs');
const path = require('path');
const voip = require('@discordjs/voice');
const googleTTS = require('google-tts-api');
const editJsonFile = require('edit-json-file');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('talk')
		.setDescription('Comando para que o bot entre no canal de voz e diga o texto indicado.')
        .addSubcommand(idioma =>
            idioma.setName('idioma')
            .setDescription('Veja qual o idioma atual ou modifique-o.')
            .addStringOption(option => 
                option.setName('idioma')
                .setDescription('Idioma que queira colocar.')
                .setRequired(false)))
        .addSubcommand(texto =>
            texto.setName('texto')
            .setDescription('O texto que irei falar no canal de voz.')
            .addStringOption(option => 
                option.setName('texto')
                .setDescription('Texto que irei falar no canal de voz')
                .setRequired(true))),
	async execute(interaction) {
        const channel = interaction.member.voice;
        //console.log('channel=> ', channel);

        if (!channel) {// By some reason it aint working.
            interaction.reply({ content: "Você precisa estar em um canal de voz para utilizar este comando", ephemeral: true });
        }
        else {
            const cfg = fs.readFileSync(path.resolve(__dirname, 'tinfo.json'));
            const tInfo = JSON.parse(cfg); // json with server infos
            const server = "server_" + interaction.guild.id;

            if (interaction.options.getSubcommand() === 'idioma') {
                if (!tInfo[server]) {
                    interaction.reply('Este servidor está com o idioma padrão. \`pt-BR\`');
                    let file = editJsonFile(`${__dirname}/tinfo.json`);
                    file.set(`server_${interaction.guildId}.name`, `${interaction.guild.name}`);
                    file.set(`server_${interaction.guildId}.lang`, 'pt-BR');
                    file.save();
                    file = editJsonFile(`${__dirname}/tinfo.json`, {
                        autosave: true
                    });
                }
                var langTTS = tInfo[server].lang;
                if (!langTTS) {
                    var langTTS = "pt-BR";
                }
                const lang = interaction.options.getString('idioma');
                if (lang) {
                    let file = editJsonFile(`${__dirname}/tinfo.json`);
                    file.set(`server_${interaction.guildId}.name`, `${interaction.guild.name}`);
                    file.set(`server_${interaction.guildId}.lang`, `${lang}`);
                    file.save();
                    file = editJsonFile(`${__dirname}/tinfo.json`, {
                        autosave: true
                    });
                    interaction.reply({ content: `O novo idioma *(${lang})* foi salvo com sucesso! ` });
                } else {
                    var { queBomBOT_ID } = require("../../config.json");
                    var id = interaction.client.users.cache.get(queBomBOT_ID);
                    var langEmbed = {
                        color: "#df8edd",
                        title: "Idiomas do TTS",
                        thumbnail: {
                            url: `${id.displayAvatarURL()}`
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
                    interaction.reply({ embeds: [langEmbed] });
                }
            }
            if (interaction.options.getSubcommand() === 'texto') {
                const connection = voip.joinVoiceChannel({ 
                    channelId: channel.channelId,
                    guildId: channel.guild.id,
                    adapterCreator: channel.guild.voiceAdapterCreator,
                })
                var input = interaction.options.getString('texto');
                if (input > 200) {
                    interaction.reply({ content: "O texto não pode ter mais que 200 caractéres.", ephemeral: true });                
                } else {
                    var langTTS = "pt-BR";
                    if (tInfo[server]) {
                        var langTTS = tInfo[server].lang;
                    }
                    var tts = googleTTS.getAudioUrl(input, { lang: langTTS });
                    const player = voip.createAudioPlayer();
                    const resource = voip.createAudioResource(tts);
                    player.play(resource);
                    connection.subscribe(player);
                    interaction.reply({ content: `${input}`})
                    interaction.deleteReply();
                    
                    const cyan = "\x1b[36m%s\x1b[0m";
                    connection.on('stateChange', (oldState, newState) => {
                        console.log(cyan, `Connection transitioned from '${oldState.status}' to '${newState.status}'`);
                    });
                    player.on('stateChange', (oldState, newState) => {
                        console.log(cyan, `Audio player transitioned from '${oldState.status}' to '${newState.status}'`);
                    });

                    //var leaveChannel;
                    //function timedOutChannel() {
                    //    leaveChannel = setTimeout(() => {
                    //        connection.destroy()
                    //    }, 10000);
                    //}
                    //player.on(voip.AudioPlayerStatus.Idle, () => {
                    //    console.log("Entering Idle mode, i'll be leaving soon.");
                    //    timedOutChannel();
                    //})
                    //player.on(voip.AudioPlayerStatus.Playing, () => {
                    //    console.log("Leaving Idle mode, i'll stay in voice channel.");
                    //    clearTimeout(leaveChannel);
                    //})
                }
            }
        }
    },
};