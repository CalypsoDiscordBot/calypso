const Discord = require('discord.js');
const config = require('../config.json');

module.exports.run = (client, message, args) => {

    let server = client.servers[message.guild.id];

    if(!server) {return message.channel.send("Actuellement aucune musique en lecture...");}
    if(message.member.voice.channel !== message.guild.me.voice.channel){return message.channel.send("Vous n'êtes pas dans le même channel vocal !")}

    if(isNaN(args[0]) || args[0] > 200 || args[0] <0) return message.channel.send("Vous devez entrez un nombre entre 0 et 200.");

    server.dispatcher.setVolume(args[0]/100);

    message.react('✅');
};

module.exports.help = {
    name: 'volume',
    description: "",
    category: "music",
    usage:"",
    accessableby: "Members",
    aliases: ['v','vol']
};
