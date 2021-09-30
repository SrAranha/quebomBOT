const puppeteer = require('puppeteer');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = { 
    data: new SlashCommandBuilder()
    .setName('currency')
    .setDescription('Faz a conversão de algumas moedas para o Real.')
    .addStringOption(option => 
        option.setName('moeda').setDescription('A moeda que deseja converter.').setRequired(true))
    .addIntegerOption(option => 
        option.setName('quantidade').setDescription('A quantidade que deseja converter.').setRequired(false)),
    async execute(interaction) {      
        const { queBomBOT_ID } = require('../../config.json');
        const id = interaction.client.users.cache.get(queBomBOT_ID);

        var wealth = interaction.options.getString("moeda");
        var qnt = interaction.options.getInteger("quantidade");

        if (!qnt) {
            qnt = 1;
        }
        else qnt = qnt;

        async function searchWealth(qnt, cry) {
            if (!qnt) { qnt = 1 }
            cry = cry.toString();
            await interaction.deferReply();
            var browser = await puppeteer.launch();
            var page = await browser.newPage();
            var wealthURL = `https://www.google.com.br/search?q=${qnt}+${cry}+para+real`;
            await page.goto(wealthURL);

            try {
                var resultado = await page.evaluate(() => {
                    return document.querySelector('.a61j6.vk_gy.vk_sh.Hg3mWc').value;
                });
    
                await browser.close();
                
                if (!qnt || qnt < 2) { // Default embed to show base wealth compared to Real
                    var currencyEmbed = {
                        color: '#df8edd',
                        author: {
                            name: `${id.username}`,
                            icon_url: `${id.displayAvatarURL()}`,
                        },
                        fields: [
                            {
                                name: `Um(a) ${cry.toUpperCase()} equivale à`,
                                value: `${resultado} real(is) :flag_br:`,
                            },
                        ],
                    };
                    await interaction.editReply({ embeds: [currencyEmbed] });
                };
                if (qnt >= 2) { // Final embed showing the currency and its wealth
                    var currencyEmbed = {
                        color: '#df8edd',
                        title: `Conversor de Moedas (${cry.toUpperCase()} -> BRL :flag_br:)`,
                        author: {
                            name: `${id.username}`,
                            icon_url: `${id.displayAvatarURL()}`,
                        },
                        fields: [
                            {
                                name: `${cry.toUpperCase()} -> BRL :flag_br:`,
                                value: `${qnt} -> ${resultado}`,
                            },
                        ],
                    };
                    await interaction.editReply({ embeds: [currencyEmbed] });
                }
            } catch (error) {
                interaction.reply("Desculpe, mas não foi possível pegar o resultado.");
            }
        }
        searchWealth(qnt, wealth);
    }
}