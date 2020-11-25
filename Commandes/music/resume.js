const Discord = require('discord.js');
const config = require('../../config.json');

module.exports.run = (client, message, args) => {

    let server = client.servers[message.guild.id];

    if(!server || !server.queue[0]) {
        const embed = new Discord.MessageEmbed()
            .setColor(config.color)
            .setDescription(message.language.music.error_notplaying())
        return message.channel.send(embed);
    }

    if(message.guild.me.voice.channel){
        if(message.guild.me.voice.channel && message.member.voice.channel === message.guild.me.voice.channel){  
            if(!server.dispatcher.paused) {
                const embed = new Discord.MessageEmbed()
                    .setColor(config.color)
                    .setDescription(message.language.resume.isnt_paused())
                return message.channel.send(embed);
            }
            server.dispatcher.resume();
            const embed = new Discord.MessageEmbed()
                .setColor(config.color)
                .setDescription(message.language.resume.success(server.queue[0].title))
            return message.channel.send(embed);
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