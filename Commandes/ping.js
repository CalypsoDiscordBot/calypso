const Discord = require('discord.js');
const config = require('../config.json');

module.exports.run = async (client, message, args) => {

    const msg = await message.channel.send('Pinging...');

    const latency = msg.createdTimestamp - message.createdTimestamp;
    const choices = ['Is this really my ping?', 'Is this okay? I can\'t look!', 'I hope it isn\'t bad!'];
    const response = choices[Math.floor(Math.random() * choices.length)];
    
    msg.edit(`${response} - Bot Latency: \`${latency}ms\`, API Latency: \`${Math.round(client.ws.ping)}ms\``);

};

module.exports.help = {
    name: 'ping',
    description: "Pong!",
    category: "settings",
    usage:"",
    accessableby: "Members",
    aliases: []
};