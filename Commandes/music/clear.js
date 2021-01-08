const Discord = require('discord.js');
const config = require('../../config.json');
const ytdl = require('ytdl-core');

module.exports.run = (client, message, args) => {

    if(args[0]){
        let content = ["clear"];
        return client.commands.get("help").run(client, message, content);
    }

    var server = client.servers[message.guild.id];
    if(!server){
        const embed = new Discord.MessageEmbed()
            .setColor(client.color)
            .setDescription(message.language.music.error_notplaying())
        return message.channel.send(embed);
    }
    if(!server.queue){
        const embed = new Discord.MessageEmbed()
            .setColor(client.color)
            .setDescription(message.language.music.error_notplaying())
        return message.channel.send(embed);
    }
    
    for(var i = server.queue.length -1; i>= 0; i--){
        server.queue.splice(i, 1);
    }
    message.react('✅');

    
};

module.exports.help = {
    name: 'clear',
    description: "Clear the queue.",
    category: "music",
    usage:"",
    accessableby: "Members",
    aliases: ['clearqueue']
};
