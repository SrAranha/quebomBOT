const cInfo = require("./currencies.json");
module.exports = {
    name: "currency",
    aliases: ["cry"],
    description: "Faz a conversão de algumas moedas para o Real.",
    args: "{moeda} (quantidade)",
    listArgs: ["MONEY", "COINS", "MOEDAS", "MOEDA"],
    execute(message, args, client) {
        //currencies infos
        const { queBomBOT_ID } = require("../../config.json");
        const ID = client.users.cache.get(queBomBOT_ID);
        
        const currencies = cInfo.accepted;
        
        const cry = args.slice(0,1).join(' ').toLowerCase();
        const moneyAmount = parseInt(args.slice(1).join(' '));

        if (currencies.includes(cry)) {
            var result = moneyAmount * cInfo[cry].wealth;
            var currencyColor = cInfo[cry].color;
            var emojiFlag = cInfo[cry].flag;;
        };

        if (!args[0]) { // Embed showing accepted currencies
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
        };
        
        if (currencies.includes(cry) && !moneyAmount) { // Default embed to show base wealth compared to Real
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
        };

        if (currencies.includes(cry) && moneyAmount >= 2) { // Final embed showing the currency and its wealth

            var currencyEmbed = {
                color: `${currencyColor}`,
                title: `Conversor de Moedas (${cry.toUpperCase()} ${emojiFlag}  -> BRL :flag_br:)`,
                author: {
                    name: `${ID.username}`,
                    icon_url: `${ID.displayAvatarURL()}`,
                },
                fields: [
                    {
                        name: `${cry.toUpperCase()} ${emojiFlag} -> BRL :flag_br:`,
                        value: `${moneyAmount} -> ${result}`,
                    },
                ],
                footer: { text: `Última atualização em ${cInfo.last_updated}`}
            };
            message.channel.send({embed: currencyEmbed});
        };
    }
}