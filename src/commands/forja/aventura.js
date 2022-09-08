const voice = require('@discordjs/voice');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('aventura')
    .setDescription('Rpg do Texugão'),
    async execute(interaction) {

        const buttonsPrincipal = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('ambiente')
                    .setLabel('Ambiente')
                    .setStyle('PRIMARY'),
                new MessageButton()
                    .setCustomId('batalha')
                    .setLabel('Batalha')
                    .setStyle('PRIMARY'),
                new MessageButton()
                    .setCustomId('lugares')
                    .setLabel('Lugares')
                    .setStyle('PRIMARY'),
                new MessageButton()
                    .setCustomId('sair')
                    .setLabel('Sair')
                    .setStyle('DANGER'),
            );
        const buttonsAmbient = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('altomar')
                    .setLabel('Alto mar')
                    .setStyle('PRIMARY'),
                new MessageButton()
                    .setCustomId('cidade')
                    .setLabel('Cidade')
                    .setStyle('PRIMARY'),
                new MessageButton()
                    .setCustomId('deserto')
                    .setLabel('Deserto')
                    .setStyle('PRIMARY'),
                new MessageButton()
                    .setCustomId('voltar')
                    .setLabel('Voltar')
                    .setStyle('SECONDARY'),
                new MessageButton()
                    .setCustomId('sair')
                    .setLabel('Sair')
                    .setStyle('DANGER'),
            );
        const buttonsBattle = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('tensao')
                    .setLabel('Tensão')
                    .setStyle('PRIMARY'),
                new MessageButton()
                    .setCustomId('voltar')
                    .setLabel('Voltar')
                    .setStyle('SECONDARY'),
                new MessageButton()
                    .setCustomId('sair')
                    .setLabel('Sair')
                    .setStyle('DANGER'),
            );
        const buttonsPlaces = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('becos')
                    .setLabel('Becos')
                    .setStyle('PRIMARY'),
                new MessageButton()
                    .setCustomId('voltar')
                    .setLabel('Voltar')
                    .setStyle('SECONDARY'),
                new MessageButton()
                    .setCustomId('sair')
                    .setLabel('Sair')
                    .setStyle('DANGER'),
            );
        
        // sounds for Tex's RPG
        const songsFolder = `${__dirname}/../../../assets/sounds/aventura`;

        const channel = interaction.member.voice;
        const connection = voice.joinVoiceChannel({ 
            channelId: channel.channelId,
            guildId: channel.guild.id,
            adapterCreator: channel.guild.voiceAdapterCreator,
        })
        const player = voice.createAudioPlayer();

        const collector = interaction.channel.createMessageComponentCollector({ time: 60000 }); // 10 minutos
        collector.on('collect', async i => {

            switch (i.customId) {
                case 'voltar':
                    interaction.editReply({ 
                        content: 'Escolha a categoria da música: ',
                        components: [buttonsPrincipal] });
                    break;
                case 'sair':
                    connection.destroy();
                    interaction.editReply({ content: 'Até depois!' });
                    break;
                case 'ambiente':
                    interaction.editReply({ 
                        content: `Aqui está as músicas da categoria \`${i.customId}\``, 
                        components: [buttonsAmbient] })
                    break;
                case 'batalha':
                    interaction.editReply({ 
                        content: `Aqui está as músicas da categoria \`${i.customId}\``, 
                        components: [buttonsBattle] })
                    break;
                case 'lugares':
                    interaction.editReply({ 
                        content: `Aqui está as músicas da categoria \`${i.customId}\``, 
                        components: [buttonsPlaces] })
                    break;
                default:
                    const resource = voice.createAudioResource(`${songsFolder}/${i.customId}.mp3`, {inlineVolume: true});
                    resource.volume.setVolume(0.3);
                    player.play(resource);
                    connection.subscribe(player);
                    interaction.editReply({ content: `Tocando \`${i.customId}\`` });
                    break;
            }
        })
        interaction.reply({ 
            content: 'Escolha a categoria da música: ', 
            components: [buttonsPrincipal], 
            ephemeral: true});
    }
}