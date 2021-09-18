const puppeteer = require('puppeteer');
module.exports = {
    name: "currency",
    aliases: ["cry"],
    description: "Faz a conversão de algumas moedas para o Real.",
    args: "{moeda} (quantidade)",
    execute(message, args, client) {
        //currencies infos
        const { queBomBOT_ID } = require("../../config.json");
        const ID = client.users.cache.get(queBomBOT_ID);

        var input = args;
        var nbr = input.find(nbr => nbr >= 1);
        var nbrIndex = input.indexOf(nbr);

        if (nbrIndex+1 == input.length) {
            var currency = input.splice(nbrIndex-1, 1);
        }
        else var currency = input.splice(nbrIndex+1);

        async function searchWealth(qnt, cry) {
            if (!qnt) { qnt = 1 }
            cry = cry.toString();
            var loading = "<a:qbloading:885334786254708796>";
            message.channel.send(`${loading} Pegando as informações ${loading}`).then(msg => msg.delete({timeout: 2400}));
            var browser = await puppeteer.launch();
            var page = await browser.newPage();
            var wealthURL = `https://www.google.com.br/search?q=${qnt}+${cry}+para+real`;
            await page.goto(wealthURL);

            try {
                var resultado = await page.evaluate(() => {
                    return document.querySelector('.a61j6.vk_gy.vk_sh.Hg3mWc').value;
                });
    
                await browser.close();
                
                if (!nbr || nbr < 2) { // Default embed to show base wealth compared to Real
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
                if (nbr >= 2) { // Final embed showing the currency and its wealth
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
                                value: `${nbr} -> ${resultado}`,
                            },
                        ],
                    };
                    message.channel.send({embed: currencyEmbed});
                }
            } catch (error) {
                message.reply("Desculpe, mas não foi possível pegar o resultado.");
            }
        }
        if (!input) {
            message.reply("Você não me deu o que fazer.");            
        }
        else { searchWealth(nbr, currency); };
    }
}