const Discord = require('discord.js');
const config = require('../../config.json');

module.exports.run = (client, message, args) => {

    let server = client.servers[message.guild.id];

    if(!server || !server.queue[0]) {
        const embed = new Discord.MessageEmbed()
            .setColor(client.color)
            .setDescription(message.language.music.error_notplaying())
        return message.channel.send(embed);
    }

    let queue = server.queue;
    let nowPlaying = queue[0];

    let resp = message.language.queue.nowplaying(nowPlaying.title, nowPlaying.url, nowPlaying.time, nowPlaying.requester);

    if(queue[1]){
        resp += message.language.queue.upnext();
    }
    for(var i = 1; i < queue.length; i++){
        resp += message.language.queue.list(i, queue[i].title, queue[i].url, queue[i].time, queue[i].requester);
    }

    message.channel.send({
        embed: {
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
