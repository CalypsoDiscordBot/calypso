const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {

    // You can define the Player as *client.player* to easly access it.
    if(!args[0]){
        let content = ["play"];
        return client.commands.get("help").run(client, message, content);
    }

    if(!message.member.voice.channel){
        const embed = new Discord.MessageEmbed()
            .setColor(client.color)
            .setDescription(message.language.music.error_voicechannel())
        return message.channel.send(embed);
    }

    const permissions = message.member.voice.channel.permissionsFor(client.user);
    if (!permissions.has('CONNECT')) {
        const embed = new Discord.MessageEmbed()
            .setColor(client.color)
            .setDescription(message.language.errors.missingPerms(["CONNECT"]))
        return message.channel.send(embed);
    }
    if (!permissions.has('SPEAK')) {
        const embed = new Discord.MessageEmbed()
            .setColor(client.color)
            .setDescription(message.language.errors.missingPerms(["SPEAK"]))
        return message.channel.send(embed);
    }

    let isPlaying = client.player.isPlaying(message);
    // If there's already a song playing
    if(isPlaying){
        // Add the song to the queue
        let song = await client.player.addToQueue(message, {search:args.join(' '), requestedBy: message.author.tag});

        message.channel.send(message.language.play.queue(),{embed: {
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
                }]
        }});
        let queue = await client.player.getQueue(message);
        queue.connection.voice.setSelfDeaf(true);
    } else {
        // Else, play the song
        let song = await client.player.play(message, {search:args.join(' '), requestedBy: message.author.tag}).then(async song => {
            if(song.error) throw(song.error);
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
                    }]
            }});
        }).catch(err => {
            console.log(err);
        });
        let queue = await client.player.getQueue(message);
        queue.connection.voice.setSelfDeaf(true);
    }
        
};

module.exports.help = {
    name: 'play',
    description: "Plays a track. A range of sites are supported. \n\nExamples: \n`%prefix%play pnl blanka` - Searches youtube for 'pnl blanka' \n`%prefix%play https://youtu.be/u8bHjdljyLw` - Plays a youtube video, using the direct URL",
    category: "music",
    usage:"<track>",
    accessableby: "Members",
    aliases: ['p']
};