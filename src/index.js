const Discord = require('Discord.js');
const client = new Discord.Client();
const config = require('./config.json');

client.once('ready', () => {
    console.log('Ready!')
})
client.login('config.qbomBOT-token');
