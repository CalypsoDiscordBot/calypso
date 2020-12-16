const Discord = require('discord.js');
const config = require('../../config.json');
const ytdl = require('ytdl-core');

module.exports.run = (client, message, args) => {

    var server = client.servers[message.guild.id];
    if(!message.member.voice.channel){
        const embed = new Discord.MessageEmbed()
            .setColor(client.color)
            .setDescription(message.language.music.error_voicechannel())
        return message.channel.send(embed);
    }

    if(message.guild.me.voice.channel){
        if(message.guild.me.voice.channel && message.member.voice.channel === message.guild.me.voice.channel){
            if(server){
                for(var i = server.queue.length -1; i>= 0; i--){
                    server.queue.splice(i, 1);
                }
                server.dispatcher.emit("finish");
            }

            message.react('✅');
            // client.leaveVoiceChannel(message.member.voice.channel.id);
            message.guild.me.voice.channel.leave();
        }
    }

    
};

module.exports.help = {
    name: 'leave',
    description: "Leaves the voice channel.",
    category: "music",
    usage:"",
    accessableby: "Members",
    aliases: []
};
