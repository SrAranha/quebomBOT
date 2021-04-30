module.exports = {
    name: 'currency',
    description: 'Show the wealth for some currencies of the world.',
    execute(message, args, client) {
        //currencies
        const currencyUSD = 5.34;
        const currencyEUR = 6.48;
        const currencyGBP = 7.45;
        const currencyJPY = 0.049;
        const currencyCHF = 5.87;
        const currencyARS = 0.057;

        const currencies = ['USD', 'DOLAR', 'EUR', 'EURO', 'GBP', 'LIBRA', 'JPY', 'YENE', 'CHF', 'FRANCO', 'ARS', 'PESOARG'];
        
        const choosenCurrency = args.slice(0,1).join(' ').toUpperCase();
        const moneyAmount = parseInt(args.slice(1).join(' '));

        if (!choosenCurrency || !moneyAmount) {
        message.reply("Está faltando paramêtros para o comando, tente `qbCurrency {moeda} {quantidade}`!");
        }
        else {
            switch (choosenCurrency) {
                case 'EURO': // Euro currency
                case 'EUR':
                    var result = moneyAmount * currencyEUR;
                    var currencyColor = '#003399';
                    var emojiFlag = ":flag_eu:"
                    break;
                case 'DOLAR': // Dollar currency
                case 'USD':
                    var result = moneyAmount * currencyUSD;
                    var currencyColor = '#3c3b6e';
                    var emojiFlag = ":flag_us:"
                    break;
                case 'LIBRA': // Pounds currency
                case 'GBP':
                    var result = moneyAmount * currencyGBP;
                    var currencyColor = '#c8102e';
                    var emojiFlag = ":flag_gb:"
                    break;
                case 'YENE': // Yen currency
                case 'JPY':
                    var result = moneyAmount * currencyJPY;
                    var currencyColor = '#bc002d';
                    var emojiFlag = ":flag_jp:"
                    break;
                case 'FRANCO': // Franc currency
                case 'CHF':
                    var result = moneyAmount * currencyCHF;
                    var currencyColor = '#002395';
                    var emojiFlag = ":flag_ch:"
                    break;
                case 'PESOARG': // Peso currency
                case 'ARS':
                    var result = moneyAmount * currencyARS;
                    var currencyColor = '#74acdf';
                    var emojiFlag = ":flag_ar:"
                    break;
                default:
                    message.reply(`Esse não é uma moeda suportada pelo bot. As moedas suportadas são \`${currencies}\`!`);
                    break;
            }
            const { QueBomBOT_ID } = require("../config.json");
            const ID = client.users.cache.get(QueBomBOT_ID);
            const currencyEmbed = {
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
                timestamp: new Date(),
            };
            message.channel.send({embed: currencyEmbed});
        }
    }
}