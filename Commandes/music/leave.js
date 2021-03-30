const Discord = require('discord.js');
const config = require('../../config.json');
const ytdl = require('ytdl-core');

module.exports.run = (client, message, args) => {

    if(!message.member.voice.channel){
        const embed = new Discord.MessageEmbed()
            .setColor(client.color)
            .setDescription(message.language.music.error_voicechannel())
        return message.channel.send(embed);
    }

    if(message.guild.me.voice.channel){
        if(message.member.voice.channel === message.guild.me.voice.channel){
            client.player.stop(message);
            message.guild.me.voice.channel.leave();
            message.react('✅');
        }
    } else {
        const embed = new Discord.MessageEmbed()
            .setColor(client.color)
            .setDescription(message.language.music.error_notplaying())
        return message.channel.send(embed);
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
