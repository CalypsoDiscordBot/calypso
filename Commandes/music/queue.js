const Discord = require('discord.js');
const config = require('../../config.json');

module.exports.run = async (client, message, args) => {

    const queueLength = 10;

    let queue = await client.player.getQueue(message);
    if(!queue || !queue.songs[0]) {
        const embed = new Discord.MessageEmbed()
            .setColor(client.color)
            .setDescription(message.language.music.error_notplaying())
        return message.channel.send(embed);
    }
    const [current, ...next] = queue.songs;

    const string1 = message.language.queue.nowplaying(queue.songs[0].name, queue.songs[0].url, queue.songs[0].duration, queue.songs[0].requestedBy);
        const string12 = next.length && message.language.queue.upnext();
        /** Queue */
        const string2 = next.length && next.slice(0,queueLength).map((song,i) => message.language.queue.list(i+1, song.name, song.url, song.duration, song.requestedBy)).join('');
        /** Longer than queue... */
        const string3 = next.length > queueLength && `and other ${next.length-queueLength} songs...`;    
   
    message.channel.send({
        embed: {
            title: message.language.queue.title(message.guild.name),
            color: client.color,
            description: [string1,string12,string2,string3].filter(s=>s).join('')
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
