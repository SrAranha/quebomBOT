module.exports = {
    name: "calc",
    aliases: ["opr"],
    description: "Comando que calcula a operação enviada. Função ainda em construção.",
    args: "{operação}",
    execute(message, args) {
        const { AranhaBoladona_ID } = require("../../config.json");

        function simpleCalc(calcO) {
            var calcO = calcO.toString();
            if (calcO.includes("+")) {
                var oprIn = calcO.indexOf("+");
            }
            else if (calcO.includes("-")) {
                var oprIn = calcO.indexOf("-");
            }
            else if (calcO.includes("*")) {
                var oprIn = calcO.indexOf("*");
            }
            else if (calcO.includes("/")) {
                var oprIn = calcO.indexOf("/");
            }
            var numbFst = calcO.slice(0,oprIn);
            var numbSnd = calcO.slice(oprIn+1);
            var opr = calcO[oprIn];

            switch (opr) {
                case "+":
                    var result = numbFst + numbSnd;
                break;
                case "-":
                    var result = numbFst - numbSnd;
                break;
                case "*":
                    var result = numbFst * numbSnd;
                break;
                case "/":
                    var result = numbFst / numbSnd;
                break;
            }
            return result;
        }
        
        function searchInBetween(calc) {
            if (!calc) { return message.reply("Error 01: No operation received"); }
            calc = calc.toString();
            if (calc.includes("(")) {
                var pFst = calc.indexOf("(");
                var pSnd = calc.indexOf(")");
                var calcPar = calc.slice(pFst+1, pSnd);
                var calcWoPar1 = calc.slice(0, pFst);
                var calcWoPar2 = calc.slice(pSnd+1);
                var intPar = simpleCalc(calcPar);
                console.log("intPar= ", intPar);
                var calcFinal1 = calcWoPar1.toString()+intPar.toString()+calcWoPar2.toString();
                console.log("calcFinal1= ", calcFinal1);
                return calcFinal1;
            }
            if (calc.includes("{")) {
                var pFst = calc.indexOf("{");
                var pSnd = calc.indexOf("}");
                var calcPar = calc.slice(pFst+1, pSnd);
                var calcWoPar1 = calc.slice(0, pFst);
                var calcWoPar2 = calc.slice(pSnd+1);
                var intPar = simpleCalc(calcPar);
                console.log("intPar= ", intPar);
                var calcFinal1 = calcWoPar1.toString()+intPar.toString()+calcWoPar2.toString();
                console.log("calcFinal1= ", calcFinal1);
                return calcFinal1;
            }
            if (calc.includes("[")) {
                var pFst = calc.indexOf("[");
                var pSnd = calc.indexOf("]");
                var calcPar = calc.slice(pFst+1, pSnd);
                var calcWoPar1 = calc.slice(0, pFst);
                var calcWoPar2 = calc.slice(pSnd+1);
                var intPar = simpleCalc(calcPar);
                console.log("intPar= ", intPar);
                var calcFinal1 = calcWoPar1.toString()+intPar.toString()+calcWoPar2.toString();
                console.log("calcFinal1= ", calcFinal1);
                return calcFinal1;
            }
        }

        //if (calcP1.includes("/") || calcP1.includes("*")) {
        //    console.log("opr1= ", calcP1);
        //    var mul = calcP1.indexOf("*");
        //    var div = calcP1.indexOf("/");
        //    console.log(mul, div);
        //    if (mul < div) {
        //    }
        //}
            
        function finalCalculate(calc) {
            if (!calc) { return message.reply("Error 02: No calc received"); }
            calc = calc.toString();
            if (calc.includes("(") || calc.includes("[") || calc.includes("{")) {
                console.log("calc= ", calc);
                calc1 = searchInBetween(calc);
            }
        }

        const jooj = "1+(1-5)*4/41-{10-5}+[10+5]";
        //const jooj = "11+22-33*44/55";
        message.delete();
        finalCalculate(jooj);
        if (message.author.id !== AranhaBoladona_ID) {
            console.log("\x1b[33m%s\x1b[0m",`
            ${message.author.tag} called this command at ${message.channel.name} (${message.channel.id}) in ${message.guild.name}`);
            message.reply("Este comando ainda não está pronto para o uso geral!");
        }
    }
}