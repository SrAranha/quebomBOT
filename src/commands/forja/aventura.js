const voip = require('@discordjs/voice');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('aventura')
    .setDescription('Rpg do Texugão'),
    async execute(interaction) {

        const buttons = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('becos')
                    .setLabel('Becos')
                    .setStyle('PRIMARY'),
                new MessageButton()
                    .setCustomId('cidade')
                    .setLabel('Cidade')
                    .setStyle('PRIMARY'),
                new MessageButton()
                    .setCustomId('taverna')
                    .setLabel('Taverna')
                    .setStyle('PRIMARY'),
                new MessageButton()
                    .setCustomId('tensao')
                    .setLabel('Tensão')
                    .setStyle('PRIMARY'),
                new MessageButton()
                    .setCustomId('sair')
                    .setLabel('Sair')
                    .setStyle('DANGER'),
            )
        
        // sounds for Tex's RPG
        const songsFolder = `${__dirname}/../../../assets/sounds/aventura/ambient_sounds`;

        const channel = interaction.member.voice;
        const connection = voip.joinVoiceChannel({ 
            channelId: channel.channelId,
            guildId: channel.guild.id,
            adapterCreator: channel.guild.voiceAdapterCreator,
        })
        const player = voip.createAudioPlayer();

        const collector = interaction.channel.createMessageComponentCollector({ time: 60000 });
        collector.on('collect', async i => {

            if (i.customId == 'sair') {
                connection.destroy();
                interaction.editReply({ content: 'Até depois!' });
            } else {
                const resource = voip.createAudioResource(`${songsFolder}/${i.customId}.mp3`);
                player.play(resource);
                connection.subscribe(player);
                
            }
        })
        // Later i'll implement Audio loop.
        //player.on(voip.AudioPlayerStatus.Idle, () => {
        //    player.play(resource);
        //});
        //const cyan = "\x1b[36m%s\x1b[0m";
        //connection.on('stateChange', (oldState, newState) => {
        //    console.log(cyan, `Connection transitioned from '${oldState.status}' to '${newState.status}'`);
        //});
        //player.on('stateChange', (oldState, newState) => {
        //    console.log(cyan, `Audio player transitioned from '${oldState.status}' to '${newState.status}'`);
        //});

        interaction.reply({ content: "O que devo fazer agora? (Após 1 minuto deverá usar o comando novamente)", components: [buttons], ephemeral: true});
    }
}