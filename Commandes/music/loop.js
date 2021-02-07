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
        let toggle = client.player.toggleLoop(message.guild.id);

        // Send a message with the toggle information
        if (toggle) {
            const embed = new Discord.MessageEmbed()
                .setColor(client.color)
                .setDescription(message.language.loop.yes())
            return message.channel.send(embed);
        }
        else {
            const embed = new Discord.MessageEmbed()
                .setColor(client.color)
                .setDescription(message.language.loop.no())
            return message.channel.send(embed);
        }
    }

};

module.exports.help = {
    name: 'loop',
    description: "Loops the current playing song!",
    category: "music",
    usage:"",
    accessableby: "Members",
    aliases: []
};
