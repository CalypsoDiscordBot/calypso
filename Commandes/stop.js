const Discord = require('discord.js');
const config = require('../config.json');
const ytdl = require('ytdl-core');

module.exports.run = (client, message, args) => {

    var server = client.servers[message.guild.id];
    if(message.guild.me.voice.channel){
        for(var i = server.queue.length -1; i>= 0; i--){
            server.queue.splice(i, 1);
        }

        server.dispatcher.emit("finish");
        message.react('✅');
        if(message.guild.connection) message.guild.me.voice.channel.disconnect();
    }

    
};

module.exports.help = {
    name: 'stop',
    description: "",
    category: "music",
    usage:"",
    accessableby: "Members",
    aliases: ['leave']
};
