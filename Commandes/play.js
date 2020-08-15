const Discord = require('discord.js');
const config = require('../config.json');
const ytdl = require('ytdl-core');
const search = require('yt-search');

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
                connection.disconnect();
            }

        })
    }

    if(!args[0]){return message.channel.send("Vous n'avez pas spécifié de lien !")}
    if(!message.member.voice.channel){return message.channel.send("Vous devez être dans un channel vocal !")}

    if(!client.servers[message.guild.id]) {
        client.servers[message.guild.id] = {
            queue : []
        }
    }
    
    var server = client.servers[message.guild.id]
    if(args.join(" ").includes("https://youtu")){
        let video = args[0];
        console.log('lien')
        let info = await ytdl.getInfo(video);
        await server.queue.push({
            title: info.videoDetails.title,
            author: info.videoDetails.author,
            url: video,
            time: sec2time(info.videoDetails.lengthSeconds),
            requester: message.author.tag,
            thumbnail: info.videoDetails.thumbnail.thumbnails[0].url
        });
        disp(message, server, info);
    }
    else {
        search(args.join(" "), async function (err, res) {
            if(err){return message.channel.send("Erreur lors de la recherche...")}
            if(!res || !res.videos || !res.videos[0]){return message.channel.send("Aucune vidéo correspondante")}

            let video = res.videos[0].url;
            console.log('nope')
            let info = await ytdl.getInfo(video);
            await server.queue.push({
                title: info.videoDetails.title,
                author: info.videoDetails.author,
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
                                name: 'Durée',
                                value: server.queue[0].time,
                                inline: true
                            },
                            {
                                name: 'Demandé par',
                                value:  server.queue[0].requester,
                                inline: true
                            }]
                    }});
                return playt(connection, message, server);
            })
        }
        else {
            message.channel.send("Ajouté à la file d'attente : ")
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
                        name: 'Durée',
                        value: sec2time(info.videoDetails.lengthSeconds),
                        inline: true
                    },
                    {
                        name: 'Demandé par',
                        value: message.author.tag,
                        inline: true
                    }]
            }});
        }
    }
};

module.exports.help = {
    name: 'play',
    description: "",
    category: "music",
    usage:"",
    accessableby: "Members",
    aliases: ['p']
};