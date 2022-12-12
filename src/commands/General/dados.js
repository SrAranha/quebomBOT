const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('dados')
		.setDescription('Faça a sua rolagem dados!')
        .addStringOption(dices =>
            dices.setName('dados')
            .setDescription('Qual e quantos dados serão rolados com espaço entre eles.')
            .setRequired(true)),
	async execute(interaction) {

        const inputDices = interaction.options.getString('dados');

        function rollDices(input) {
            let results = [];
            const whereD = inputDices.indexOf('d');
            const faces = input.slice(whereD + 1);
            for (let roll = 0; roll < input.slice(0, whereD); roll++) {
                const randomResult = Math.floor(Math.random() * faces) + 1;
                results.push(randomResult);
            }
            return results;
        }

        function sumRolls(input) {
            let rolls = [];
            let sum = 0;
            input = input.split(' ');
            console.log(input);
            for (let i = 0; i < input.length; i++) {
                // Rolling the dices
                if (input[i].includes('d')) {
                    let rolledDices = rollDices(input[i])
                    for (let j = 0; j < rolledDices.length; j++) {
                        rolls.push(rolledDices[j]);
                    }
                }
                // The rest
                else {
                    console.log(input[i]);
                    if (!isNaN(input[i])) {
                        rolls.push(parseInt(input[i]));
                    }
                    else rolls.push(input[i]);
                }
            }
            console.log(rolls);
            let minus = false;
            for (let i = 0; i < rolls.length; i++) {
                console.log(minus);
                if (isNaN(rolls[i]) && rolls[i] == '-') {
                    console.log(`oldRolls=>${rolls}`);
                    minus = true;
                    rolls.splice(i, 1);
                    console.log(`newRolls=>${rolls}`);
                }
                if (isNaN(rolls[i]) && rolls[i] == '+') {
                    console.log(`oldRolls=>${rolls}`);
                    minus = false;
                    rolls.splice(i, 1);
                    console.log(`newRolls=>${rolls}`);
                }
                if (!isNaN(rolls[i])) {
                    if (minus == false) {
                        console.log(`sum=>${sum} + ${rolls[i]}`);
                        sum += rolls[i];
                    }
                    else if (minus == true) {
                        console.log(`sum=>${sum} - ${rolls[i]}`);
                        sum -= rolls[i];
                    }
                }
            }
            return [ sum, rolls ];
        }

        if (inputDices.includes('d')) {
            var funcao = sumRolls(inputDices);
            var content = `> **${inputDices}:** ${funcao[0]} \n \`${funcao[1]}\``;
            interaction.reply({ content: content });
        }
        else {
            interaction.reply({ content: 'Não encontrei um dado nessa bagaça.' });
        }
    }
}