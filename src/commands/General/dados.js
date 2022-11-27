const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('dados')
		.setDescription('Faça a sua rolagem dados!')
        .addStringOption(dices =>
            dices.setName('dados')
            .setDescription('Qual e quantos dados serão rolados.')
            .setRequired(true)),
	async execute(interaction) {

        const inputDices = interaction.options.getString('dados');
        const whereD = inputDices.indexOf('d');
        function separateRollMod(input) {
            if (input.includes('+')) {
                whereP = input.indexOf('+');
                withoutMod = input.slice(0, whereP);
                isolatedMod = input.slice(whereP);
                array = [withoutMod, isolatedMod]
                return array;
            }
            if (input.includes('-')) {
                whereM = input.indexOf('-');
                withoutMod = input.slice(0, whereM);
                isolatedMod = input.slice(whereM);
                array = [withoutMod, isolatedMod]
                return array;
            }
        }

        function rollDice(input) {
            if (input.includes('+') || input.includes('-')) {
                var withoutMod = separateRollMod(input)[0];
            } else {
                var withoutMod = input;
            }
            const faces = withoutMod.slice(whereD + 1);
            const randomResult = Math.floor(Math.random() * faces) + 1;
            return randomResult;
        }
        
        function finalDice(input) {
            if (input.includes('+') || input.includes('-')) {
                var withoutMod = separateRollMod(input)[0];
                var isolatedMod = separateRollMod(input)[1];
            } else {
                var withoutMod = input;
            }
            if (input.startsWith('d')) {
                var timesToRoll = 1;
            } else {
                var timesToRoll = withoutMod.slice(0, whereD);
            }
            
            var rolls = [];
            for (let i = 0; i < parseInt(timesToRoll); i++) {
                var rollResult = rollDice(input);
                rolls.push(rollResult);
            }
            var sumDice = 0;
            for (let index = 0; index < rolls.length; index++) {
                const roll = rolls[index];
                var sumDice = sumDice + roll;
            }
            var response = [rolls.sort(), input];
            if (isolatedMod) {
                if (isolatedMod.startsWith('-')) {
                    var index = isolatedMod.indexOf('-')
                    isolatedMod = isolatedMod.slice(index + 1);
                    var moddedDice = sumDice - parseInt(isolatedMod);
                    response.push(moddedDice);
                    return response
                }
                if (isolatedMod.startsWith('+')) {
                    var index = isolatedMod.indexOf('+')
                    isolatedMod = isolatedMod.slice(index + 1);
                    var moddedDice = sumDice + parseInt(isolatedMod);
                    response.push(moddedDice);
                    return response
                }
            }
            else {
                response.push(sumDice);
                return response;
            }
        }

        if (inputDices.includes('d')) {
            var funcao = finalDice(inputDices);
            var content = `> **${funcao[1]}:** ${funcao[2]} \n \`${funcao[0]}\`  `;
            interaction.reply({ content: content });
        }
        else {
            interaction.reply({ content: 'Não encontrei um dado nessa bagaça.' });
        }
    }
}