const Discord = require('discord.js');
const config = require('../../config.json');

module.exports.run = async (client, message, args) => {

    let isPlaying = client.player.isPlaying(message.guild.id);
    if(!isPlaying){
        const embed = new Discord.MessageEmbed()
            .setColor(client.color)
            .setDescription(message.language.music.error_notplaying())
        return message.channel.send(embed);
    }
    else {
        if(message.guild.me.voice.channel){
            if(message.guild.me.voice.channel && message.member.voice.channel === message.guild.me.voice.channel){  
                let queue = await client.player.getQueue(message.guild.id);
                if(!queue.dispatcher.paused) {
                    const embed = new Discord.MessageEmbed()
                        .setColor(client.color)
                        .setDescription(message.language.resume.isnt_paused())
                    return message.channel.send(embed);
                }
                let song = await client.player.resume(message.guild.id);
                const embed = new Discord.MessageEmbed()
                    .setColor(client.color)
                    .setDescription(message.language.resume.success(song.name))
                return message.channel.send(embed);
            }
        } 
    } 

};

module.exports.help = {
    name: 'resume',
    description: "",
    category: "music",
    usage:"",
    accessableby: "Members",
    aliases: []
};
