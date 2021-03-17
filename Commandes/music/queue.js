const Discord = require('discord.js');
const config = require('../../config.json');

module.exports.run = async (client, message, args) => {


    let queue = await client.player.getQueue(message);
    let length = queue.songs.length;
    if(queue.songs.length > 10){
        length = 10;
    }
    if(!queue || !queue.songs[0]) {
        const embed = new Discord.MessageEmbed()
            .setColor(client.color)
            .setDescription(message.language.music.error_notplaying())
        return message.channel.send(embed);
    }

    let resp = message.language.queue.nowplaying(queue.songs[0].name, queue.songs[0].url, queue.songs[0].duration, queue.songs[0].requestedBy);

    if(queue.songs[1]){
        resp += message.language.queue.upnext();
    }
    for(var i = 1; i <= length; i++){
        resp += message.language.queue.list(i, queue.songs[i].name, queue.songs[i].url, queue.songs[i].duration, queue.songs[i].requestedBy);
    }

    message.channel.send({
        embed: {
            title: message.language.queue.title(message.guild.name),
            color: client.color,
            description: resp
        }}
    );
};

module.exports.help = {
    name: 'queue',
    description: "Shows the current track queue.",
    category: "music",
    usage:"",
    accessableby: "Members",
    aliases: ['q']
};
