const Discord = require('discord.js');
const { emojis } = require("../../config");

module.exports.run = async (client, message, args) => {

    let isPlaying = client.player.isPlaying(message);
    if(!isPlaying){
        const embed = new Discord.MessageEmbed()
            .setColor(client.color)
            .setDescription(message.language.music.error_notplaying())
        return message.channel.send(embed);
    }
    else {
        const song = await client.player.nowPlaying(message);

        message.channel.send({embed: {
            color: client.color,
            author: song.author || "None.",
            title: song.name,
            url: song.url,
            thumbnail: {
                url: song.thumbnail
            },
            fields: [
                {
                    name: 'Progression',
                    value: client.player.createProgressBar(message,{
                        size: 15,
                        block: '▬',
                        arrow: '🔵'
                    }),
                    inline: false
                },
                {
                    name: message.language.play.requested(),
                    value: song.requestedBy,
                    inline: true
                }]
        }});
    }
        
};

module.exports.help = {
    name: 'np',
    description: "Gives you the name of the song!",
    category: "music",
    usage:"<track>",
    accessableby: "Members",
    aliases: ['now','nowplaying']
};