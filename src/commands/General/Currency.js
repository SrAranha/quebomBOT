module.exports = {
    name: 'currency',
    aliases: ['cry'],
    description: 'Show the wealth for some currencies of the world.',
    execute(message, args, client) {
        //currencies infos
        const cInfo = require("./currencies.json");
        const { queBomBOT_ID } = require("../../config.json");
        const ID = client.users.cache.get(queBomBOT_ID);
        
        const currencies = cInfo.accepted;
        const listOf = cInfo.addParams;
        
        const choosenCurrency = args.slice(0,1).join(' ').toUpperCase();
        const moneyAmount = parseInt(args.slice(1).join(' '));
        const cry = choosenCurrency.toLowerCase();
        
        const result = moneyAmount * cInfo[cry].wealth;
        const currencyColor = cInfo[cry].color;
        const emojiFlag = cInfo[cry].flag;
        
        if (!choosenCurrency) { // Error 01: no specified currency
            message.reply(`Error 01: Moeda não específicada! Aceita-se \`${currencies}\``);
        }
        
        if (listOf.includes(choosenCurrency) && !moneyAmount) { // Embed showing accepted currencies
            var currencyEmbed = {
                color: "#df8edd",
                title: "Moedas suportadas pelo QueBomBOT.",
                author: {
                    name: `${ID.username}`,
                    icon_url: `${ID.displayAvatarURL()}`,
                },
                fields: [
                    {
                        name: "Atualmente, temos estas moedas",
                        value: `\`${currencies}\``,
                    },
                ],
                timestamp: new Date(),
            };
            message.channel.send({embed: currencyEmbed});
        }

        if (!choosenCurrency && !moneyAmount) { // Error 02: missing params to use
            message.reply("Error 02: Está faltando paramêtros para o comando, tente `qbCurrency {moeda} (quantidade)`!");
        }
        
        if (currencies.includes(choosenCurrency) && !moneyAmount) { // Default embed to show base wealth compared to Real
            var currencyEmbed = {
                color: `${cInfo[cry].color}`,
                author: {
                    name: `${ID.username}`,
                    icon_url: `${ID.displayAvatarURL()}`,
                },
                fields: [
                    {
                        name: `Um(a) ${cInfo[cry].name} ${cInfo[cry].flag} equivale à`,
                        value: `${cInfo[cry].wealth} real(is) :flag_br:`,
                    },
                ],
                footer: { text: `Última atualização em ${cInfo.last_updated}`}
            };
            message.channel.send({embed: currencyEmbed});
        }

        if (!currencies.includes(choosenCurrency) && !listOf.includes(choosenCurrency)) { // Error 03: currency not suported
            message.reply(`Error 03: Moeda não suportada! Aceita-se \`${currencies}\``);
        }

        else if (currencies.includes(choosenCurrency) && moneyAmount >= 1) { // Final embed showing the currency and its wealth
            
            var currencyEmbed = {
                color: `${currencyColor}`,
                title: `Conversor de Moedas (${choosenCurrency} ${emojiFlag}  -> BRL :flag_br:)`,
                author: {
                    name: `${ID.username}`,
                    icon_url: `${ID.displayAvatarURL()}`,
                },
                fields: [
                    {
                        name: `${choosenCurrency} ${emojiFlag} -> BRL :flag_br:`,
                        value: `${moneyAmount} -> ${result}`,
                    },
                ],
                footer: { text: `Última atualização em ${cInfo.last_updated}`}
            };
            message.channel.send({embed: currencyEmbed});
        }
    }
}