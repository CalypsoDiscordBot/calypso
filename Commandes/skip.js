const Discord = require('discord.js');
const config = require('../config.json');
const ytdl = require('ytdl-core');

module.exports.run = (client, message, args) => {

    var server = client.servers[message.guild.id];

    if(server.dispatcher) server.dispatcher.emit("finish");
    message.channel.send("Skipping...")

};

module.exports.help = {
    name: 'skip',
    description: "",
    category: "music",
    usage:"",
    accessableby: "Members",
    aliases: ['s']
};
