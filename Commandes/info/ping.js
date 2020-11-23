const Discord = require('discord.js');
const config = require('../../config.json');

module.exports.run = async (client, message, args) => {

    const msg = await message.channel.send('Pinging...');

    const latency = msg.createdTimestamp - message.createdTimestamp;
    
    msg.edit(`- Bot Latency: \`${latency}ms\`\n- API Latency: \`${Math.round(client.ws.ping)}ms\``);

};

module.exports.help = {
    name: 'ping',
    description: "Pong!",
    category: "info",
    usage:"",
    accessableby: "Members",
    aliases: []
};