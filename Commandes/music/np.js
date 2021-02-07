const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {

    let isPlaying = client.player.isPlaying(message.guild.id);
    if(!isPlaying){
        const embed = new Discord.MessageEmbed()
            .setColor(client.color)
            .setDescription(message.language.music.error_notplaying())
        return message.channel.send(embed);
    }
    else {
        const song = await client.player.nowPlaying(message.guild.id);

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
                    name: message.language.play.duration(),
                    value: song.duration,
                    inline: true
                },
                {
                    name: message.language.play.requested(),
                    value: song.requestedBy,
                    inline: true
                },
                {
                    name: 'Progression',
                    value: client.player.createProgressBar(message.guild.id,20,'>','='),
                    inline: false
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