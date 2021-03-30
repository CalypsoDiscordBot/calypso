const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {

    if(!args[0]){
        let content = ["playlist"];
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

    let playlist = await client.player.playlist(message, {search: args.join(' '), maxSongs: -1, requestedBy: message.author.tag});

    console.log(playlist)

    const song = await playlist.videos[0];
    // Send information about adding the Playlist to the Queue  
    if(song){
        return message.channel.send({embed: {
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
    }
    else {
        const embed = new Discord.MessageEmbed()
        .setColor(client.color)
        .setDescription(message.language.playlist.add(playlist.videos.length, playlist.author))
        return message.channel.send(embed);
    }
        
};

module.exports.help = {
    name: 'playlist',
    description: "Add a Playlist to the Server Queue. (Only Youtube supported)",
    category: "music",
    usage:"<playlist>",
    accessableby: "Members",
    aliases: ['pl']
};