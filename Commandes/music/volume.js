const Discord = require('discord.js');
const config = require('../../config.json');

module.exports.run = (client, message, args) => {

    if(message.member.voice.channel !== message.guild.me.voice.channel){
        const embed = new Discord.MessageEmbed()
            .setColor(client.color)
            .setDescription(message.language.music.error_voicechannel())
        return message.channel.send(embed);
    }

    if(isNaN(args[0]) || args[0] > 200 || args[0] <0) {
        const embed = new Discord.MessageEmbed()
            .setColor(client.color)
            .setDescription(message.language.volume.error_volume())
        return message.channel.send(embed);
    }

    client.player.setVolume(message.guild.id, parseInt(args[0]));

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
