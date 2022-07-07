const voip = require('@discordjs/voice');
const fs = require('fs');
const path = require('path');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('memes')
    .setDescription('Comando de meme.')
    .addSubcommand(subcmd =>
        subcmd.setName('lista')
        .setDescription('Lista com os áudios disponíveis.'))
    .addSubcommand(subcmd =>
        subcmd.setName('audio')
        .setDescription('Meme em áudio. (Se deixar em branco, o bot tocará aleatoriamente.)')
        .addStringOption(meme =>
            meme.setName('nome_audio')
            .setDescription('Nome do áudio.')
            .setRequired(false))),
    async execute(interaction) {
        const soundsFolder = `${__dirname}/../../../assets/sounds/memes`;
        let memesFolder;
            memesPath = fs.readdirSync(path.resolve(soundsFolder));
            memesArray = [];

            for (let i = 0; i < memesPath.length; i++) {
                var newAudio = memesPath[i];            
                const whereDot = newAudio.indexOf('.');
                newAudio = newAudio.slice(0, whereDot);
                memesArray.push(newAudio);
            }
            memesFolder = memesArray;

        if (interaction.options.getSubcommand() === 'lista') {
            var { queBomBOT_ID } = require("../../config.json");
            var id = interaction.client.users.cache.get(queBomBOT_ID);
            var memesEmbed = {
                color: "#df8edd",
                title: "Memes, tipos de carinha são",
                thumbnail: {
                    url: `${id.displayAvatarURL()}`
                },
                fields: [
                    {
                        name: "Lista com os áudios disponíveis:",
                        value: `\`${memesFolder.toString()}\``,
                    },
                ],
                timestamp: new Date(),
                footer: {
                    text: "Alguns são memes internos."
                }
            }
            interaction.reply({ embeds:[memesEmbed] });
        }

        if (interaction.options.getSubcommand() === 'audio') {
            const channel = interaction.member.voice;
            const connection = voip.joinVoiceChannel({ 
                channelId: channel.channelId,
                guildId: channel.guild.id,
                adapterCreator: channel.guild.voiceAdapterCreator,
            })
            var audio = interaction.options.getString('nome_audio');
            const player = voip.createAudioPlayer();
            if (audio) {
                if (audio.endsWith('.mp3')) {
                    audio = audio.slice(0,-4);
                }
                let resource = voip.createAudioResource(`${soundsFolder}/${audio}.mp3`, {inlineVolume: true});
                resource.volume.setVolume(0.3);
                player.play(resource);
                connection.subscribe(player);
                interaction.reply({ content: 'É sobre isso...'});
                interaction.deleteReply();
            }
            else {
                var memesLength = memesFolder.length;

                let randomAudio; 
                    var random = Math.floor(Math.random() * memesLength);
                    randomAudio = memesFolder[random];

                var resource = voip.createAudioResource(`${soundsFolder}/${randomAudio}.mp3`);
                player.play(resource);
                connection.subscribe(player);
                interaction.reply({ content: 'É sobre isso...'});
                interaction.deleteReply();
            }
        }
    }
}