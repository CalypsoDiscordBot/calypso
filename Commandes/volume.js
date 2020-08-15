const Discord = require('discord.js');
const config = require('../config.json');

module.exports.run = (client, message, args) => {

    let server = client.servers[message.guild.id];

    if(!server) {return message.channel.send("I'm currently not playing music!");}
    if(message.member.voice.channel !== message.guild.me.voice.channel){return message.channel.send("You are not in a voice channel!")}

    if(isNaN(args[0]) || args[0] > 200 || args[0] <0) return message.channel.send("You must enter a number between 0 and 200.");

    server.dispatcher.setVolume(args[0]/100);

    message.react('✅');
};

module.exports.help = {
    name: 'volume',
    description: "Sets the volume of the music playing.",
    category: "music",
    usage:"<volume>",
    accessableby: "Members",
    aliases: ['v','vol']
};
