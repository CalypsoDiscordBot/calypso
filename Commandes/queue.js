const Discord = require('discord.js');
const config = require('../config.json');

module.exports.run = (client, message, args) => {

    let server = client.servers[message.guild.id];

    if(!server || !server.queue[0]) {return message.channel.send("Aucune file d'attente n'a été créée.");}

    let queue = server.queue;
    let nowPlaying = queue[0];

    let resp = `__Lecture en cours :__\n[${nowPlaying.title}](${nowPlaying.url}) | ${nowPlaying.time} - Demandé par : *${nowPlaying.requester}*\n`;

    if(queue[1]){
        resp += `\n__File d'attente :__\n`
    }
    for(var i = 1; i < queue.length; i++){
        resp += `${i}. [${queue[i].title}](${queue[i].url}) | ${queue[i].time} - Demandé par : *${queue[i].requester}*\n`;
    }

    message.channel.send({
        embed: {
            description: resp
        }}
    );
};

module.exports.help = {
    name: 'queue',
    description: "",
    category: "music",
    usage:"",
    accessableby: "Members",
    aliases: ['q']
};
