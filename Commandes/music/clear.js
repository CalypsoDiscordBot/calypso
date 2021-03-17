const Discord = require('discord.js');
const config = require('../../config.json');
const ytdl = require('ytdl-core');

module.exports.run = async (client, message, args) => {

    if(args[0]){
        let content = ["clear"];
        return client.commands.get("help").run(client, message, content);
    }
    let queue = await client.player.getQueue(message);
    
    if(!queue || !queue.songs[0]){
        const embed = new Discord.MessageEmbed()
            .setColor(client.color)
            .setDescription(message.language.music.error_notplaying())
        return message.channel.send(embed);
    }
    
    client.player.clearQueue(message);
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
