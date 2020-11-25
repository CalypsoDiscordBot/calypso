const Discord = require('discord.js');
const config = require('../../config.json');
const ytdl = require('ytdl-core');
const search = require('yt-search');
const db = require('quick.db');

module.exports.run = async (client, message, args) => {

    function sec2time(timeInSeconds) {
        var pad = function(num, size) { return ('000' + num).slice(size * -1); },
        time = parseFloat(timeInSeconds).toFixed(3),
        hours = Math.floor(time / 60 / 60),
        minutes = Math.floor(time / 60) % 60,
        seconds = Math.floor(time - minutes * 60);
    
        return pad(hours, 2) + ':' + pad(minutes, 2) + ':' + pad(seconds, 2);
    }

    async function playt(connection, message, server){

        server.dispatcher = await connection.play(ytdl(server.queue[0].url, { filter: 'audioonly' }));

        server.dispatcher.once("finish", function(){
            server.queue.shift();
            if(server.queue[0]){
                playt(connection, message, server);
            }else{
                server.dispatcher.destroy();
                // connection.disconnect();
            }

        })
    }


    if(!args[0]){
        let content = ["play"];
        return client.commands.get("help").run(client, message, content);
    }

    if(!message.member.voice.channel){
        const embed = new Discord.MessageEmbed()
            .setColor(config.color)
            .setDescription(message.language.music.error_voicechannel())
        return message.channel.send(embed);
    }

    const permissions = message.member.voice.channel.permissionsFor(client.user);
    if (!permissions.has('CONNECT')) {
        const embed = new Discord.MessageEmbed()
            .setColor(config.color)
            .setDescription(message.language.errors.missingPerms(["CONNECT"]))
        return message.channel.send(embed);
    }
    if (!permissions.has('SPEAK')) {
        const embed = new Discord.MessageEmbed()
            .setColor(config.color)
            .setDescription(message.language.errors.missingPerms(["SPEAK"]))
        return message.channel.send(embed);
    }

    if(!client.servers[message.guild.id]) {
        client.servers[message.guild.id] = {
            queue : []
        }
    }
    
    var server = client.servers[message.guild.id]
    if(args.join(" ").includes("https://youtu")){
        // stats play url
        db.push(`stats_playurl`,new Date());
        let video = args[0];
        let info = await ytdl.getInfo(video).catch((err) => {
            console.log(err);
            return message.channel.send(":x: An unknown error occurred.");
        }); 

        if(!info.videoDetails) return message.channel.send(":x: An unknown error occurred.");

        await server.queue.push({
            title: info.videoDetails.title,
            author: info.videoDetails.author || "None.",
            url: video,
            time: sec2time(info.videoDetails.lengthSeconds),
            requester: message.author.tag,
            thumbnail: info.videoDetails.thumbnail.thumbnails[0].url
        });
        disp(message, server, info);
    }
    else {
        // stats play search
        db.push(`stats_playsearch`,new Date());
        search(args.join(" "), async function (err, res) {
            if(err){return message.channel.send("Search error...")}
            if(!res || !res.videos || !res.videos[0]){return message.channel.send("No video found")}

            let video = res.videos[0].url;

            let info = await ytdl.getInfo(video).catch((err) => {
                console.log(err);
                return message.channel.send(":x: An unknown error occurred.");
            }); 

            if(!info.videoDetails) return message.channel.send(":x: An unknown error occurred.");

            await server.queue.push({
                title: info.videoDetails.title,
                author: info.videoDetails.author || "None.",
                url: video,
                time: sec2time(info.videoDetails.lengthSeconds),
                requester: message.author.tag,
                thumbnail: info.videoDetails.thumbnail.thumbnails[0].url
            });
            disp(message, server, info);
        });
    }
    async function disp(message, server, info){
        if(!server.queue[1]) { // 0 musique dans la queue
            await message.member.voice.channel.join().then( function(connection){
                    message.channel.send({embed: {
                        color:  config.color,
                        author:  server.queue[0].author,
                        title:  server.queue[0].title,
                        url:  server.queue[0].url,
                        thumbnail: {
                            url:  server.queue[0].thumbnail
                        },
                        fields: [
                            {
                                name: message.language.play.duration(),
                                value: server.queue[0].time,
                                inline: true
                            },
                            {
                                name: message.language.play.requested(),
                                value:  server.queue[0].requester,
                                inline: true
                            }]
                    }});
                return playt(connection, message, server);
            })
        }
        else {
            message.channel.send(message.language.play.queue())
            message.channel.send({embed: {
                color: config.color,
                author: info.videoDetails.author,
                title: info.videoDetails.title,
                url: info.videoDetails.url,
                thumbnail: {
                    url: info.videoDetails.thumbnail.thumbnails[0].url
                },
                fields: [
                    {
                        name: message.language.play.duration(),
                        value: sec2time(info.videoDetails.lengthSeconds),
                        inline: true
                    },
                    {
                        name: message.language.play.requested(),
                        value: message.author.tag,
                        inline: true
                    }]
            }});
        }
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