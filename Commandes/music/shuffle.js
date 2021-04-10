const Discord = require('discord.js');
const config = require('../../config.json');

module.exports.run = async (client, message, args) => {

    let isPlaying = client.player.isPlaying(message);
    if(!isPlaying){
        const embed = new Discord.MessageEmbed()
            .setColor(client.color)
            .setDescription(message.language.music.error_notplaying())
        return message.channel.send(embed);
    }
    else {
        client.player.shuffle(message);

        const embed = new Discord.MessageEmbed()
            .setColor(client.color)
            .setDescription(message.language.shuffle.yes())
        return message.channel.send(embed);
    }

};

module.exports.help = {
    name: 'shuffle',
    description: "Shuffles the queue!",
    category: "music",
    usage:"",
    accessableby: "Members",
    aliases: ['shuff']
};
