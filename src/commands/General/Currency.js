const puppeteer = require('puppeteer');
module.exports = {
    name: "currency",
    aliases: ["cry"],
    description: "Faz a conversão de algumas moedas para o Real. Favor seguir o padrão para que o comando funcione corretamente!",
    args: "(quantidade) {moeda}",
    listArgs: ["MONEY", "COINS", "MOEDAS", "MOEDA"],
    execute(message, args, client) {
        //currencies infos
        const { queBomBOT_ID } = require("../../config.json");
        const ID = client.users.cache.get(queBomBOT_ID);
        
        const cry = args.slice(1).join(' ').toLowerCase();
        const moneyAmount = parseInt(args.slice(0,1).join(' '));
        
        async function searchWealth(a, b) {
            if (!b) { b = 1 }
            const browser = await puppeteer.launch({ headless: false});
            const page = await browser.newPage();
            const wealthURL = `https://www.google.com.br/search?q=${b}+${a}+para+real`;
            await page.goto(wealthURL);
            
            const resultado = await page.evaluate(() => {
                return document.querySelector('.a61j6.vk_gy.vk_sh.Hg3mWc').value;
            });

            await browser.close();

            if (!moneyAmount || moneyAmount < 2) { // Default embed to show base wealth compared to Real
                var currencyEmbed = {
                    color: '#df8edd',
                    author: {
                        name: `${ID.username}`,
                        icon_url: `${ID.displayAvatarURL()}`,
                    },
                    fields: [
                        {
                            name: `Um(a) ${cry.toUpperCase()} equivale à`,
                            value: `${resultado} real(is) :flag_br:`,
                        },
                    ],
                };
                message.channel.send({embed: currencyEmbed});
            };
    
            if (moneyAmount >= 2) { // Final embed showing the currency and its wealth
    
                var currencyEmbed = {
                    color: '#df8edd',
                    title: `Conversor de Moedas (${cry.toUpperCase()} -> BRL :flag_br:)`,
                    author: {
                        name: `${ID.username}`,
                        icon_url: `${ID.displayAvatarURL()}`,
                    },
                    fields: [
                        {
                            name: `${cry.toUpperCase()} -> BRL :flag_br:`,
                            value: `${moneyAmount} -> ${resultado}`,
                        },
                    ],
                };
                message.channel.send({embed: currencyEmbed});
            };
        }
        searchWealth(cry, moneyAmount);
    }
}