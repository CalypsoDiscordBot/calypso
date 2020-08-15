const Discord = require('discord.js');
const config = require('../config.json');

module.exports.run = (client, message, args) => {

    let server = client.servers[message.guild.id];

    if(!server || !server.queue[0]) {return message.channel.send("I'm currently not playing music!");}

    let queue = server.queue;
    let nowPlaying = queue[0];

    let resp = `__Now Playing :__\n[${nowPlaying.title}](${nowPlaying.url}) | ${nowPlaying.time} - Requested By : *${nowPlaying.requester}*\n`;

    if(queue[1]){
        resp += `\n__Up Next :__\n`
    }
    for(var i = 1; i < queue.length; i++){
        resp += `${i}. [${queue[i].title}](${queue[i].url}) | ${queue[i].time} - Requested By : *${queue[i].requester}*\n`;
    }

    message.channel.send({
        embed: {
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
