const Discord = require('discord.js');
const config = require('../config.json');
const ytdl = require('ytdl-core');

module.exports.run = (client, message, args) => {

    var server = client.servers[message.guild.id];
    if(!message.member.voice.channel){
        const embed = new Discord.MessageEmbed()
            .setColor(config.color)
            .setDescription("❌ You are not in a voice channel!")
        return message.channel.send(embed);
    }

    if(message.guild.me.voice.channel){
        if(message.author.voice.channel === message.guild.me.voice.channel){
            for(var i = server.queue.length -1; i>= 0; i--){
                server.queue.splice(i, 1);
            }

            server.dispatcher.emit("finish");
            message.react('✅');
            if(message.guild.connection) message.guild.me.voice.channel.disconnect();
        }
    }

    
};

module.exports.help = {
    name: 'leave',
    description: "Leaves the voice channel.",
    category: "music",
    usage:"",
    accessableby: "Members",
    aliases: ['stop']
};
