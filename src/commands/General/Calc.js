module.exports = {
    name: 'calc',
    aliases: ['opr'],
    description: 'command that calculates (LOL)',
    execute(message, args) {
        const { AranhaBoladona_ID } = require('../../config.json');

        function calculate(calcO) {
            var calcO = calcO.toString();
            if (calcO.includes('+')) {
                var oprIn = calcO.indexOf('+');
            }
            else if (calcO.includes('-')) {
                var oprIn = calcO.indexOf('-');
            }
            else if (calcO.includes('*')) {
                var oprIn = calcO.indexOf('*');
            }
            else if (calcO.includes('/')) {
                var oprIn = calcO.indexOf('/');
            }
            var numbFst = calcO.slice(0,oprIn);
            var numbSnd = calcO.slice(oprIn+1);
            var opr = calcO[oprIn];

            switch (opr) {
                case '+':
                    var result = numbFst + numbSnd;
                break;
                case '-':
                    var result = numbFst - numbSnd;
                break;
                case '*':
                    var result = numbFst * numbSnd;
                break;
                case '/':
                    var result = numbFst / numbSnd;
                break;
            }
            return result;
        }
        
        function searchOperations(calc) {
            if (!calc) { return; }
            calc = calc.toString();
            if (calc.includes('(')) {
                console.log('opr= ', calc);
                var pFst = calc.indexOf('(');
                var pSnd = calc.indexOf(')');
                var calcPar = calc.slice(pFst+1, pSnd);
                var calcWoPar1 = calc.slice(0, pFst);
                var calcWoPar2 = calc.slice(pSnd+1);
                var intPar = calculate(calcPar);
                var calcP1 = calcWoPar1.toString()+intPar.toString()+calcWoPar2.toString();
                console.log('intPar= ', intPar);
                console.log('calcP1= ', calcP1);
            }
        }
        const jooj = "1+(1-5)*4/41";
        message.delete();
        searchOperations(jooj);
        if (message.author.id != AranhaBoladona_ID) {
            console.log("\x1b[33m%s\x1b[0m",` ${message.author.tag} called this command at ${message.channel.id} in ${message.channel.name} at ${message.guild.name}`);
        }
    }
}