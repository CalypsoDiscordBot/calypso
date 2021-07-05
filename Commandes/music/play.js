const Discord = require('discord.js');
const { MessageButton, MessageActionRow } = require('discord-buttons');
const db = require("quick.db");

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

    // message.delete();
    
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
        let player_id = await db.fetch(`musicplayer_${message.guild.id}_${message.channel.id}`);
        if(player_id){
            let player_message = await message.channel.messages.fetch(player_id)
            if(player_message){
                player_message.edit({embed: player_message.embeds[0]});
            }
        }

        let song = await client.player.play(message, {search:args.join(' '), requestedBy: message.author.tag}).then(async song => {
            if(song.error) throw(song.error);

            let button_resume = new MessageButton()
                .setStyle("blurple")
                .setEmoji("852294253659815936")
                .setID("music_resume")
            let button_skip = new MessageButton()
                .setStyle("blurple")
                .setEmoji("852294265803243561")
                .setID("music_skip")
            let button_volumedown = new MessageButton()
                .setStyle("blurple")
                .setEmoji("852311672650727494")
                .setID("music_volumedown")
            let button_volumeup = new MessageButton()
                .setStyle("blurple")
                .setEmoji("852311661497942087")
                .setID("music_volumeup")
            let button_loop = new MessageButton()
                .setStyle("blurple")
                .setEmoji("852294329375916052")
                .setID("music_loop")

            let buttonRow = new MessageActionRow()
                .addComponent(button_resume)
                .addComponent(button_skip)
                .addComponent(button_volumedown)
                .addComponent(button_volumeup)
                .addComponent(button_loop)

            message.channel.send({
                component: buttonRow,
                embed: {
                    color: client.color,
                    author: song.author || "None.",
                    title: song.name,
                    url: song.url,
                    thumbnail: {
                        url: song.thumbnail
                    },
                    fields: [
                        {
                            name: 'Progression',
                            value: client.player.createProgressBar(message,{
                                size: 15,
                                block: '▬',
                                arrow: '🔵'
                            }),
                            inline: false
                        },
                        {
                            name: message.language.play.requested(),
                            value: song.requestedBy,
                            inline: true
                        },
                        {
                            name: 'Volume',
                            value: client.player.getVolume(message),
                            inline: true
                        }
                    ]
                }
            }).then (function (data){
                db.set(`musicplayer_${message.guild.id}_${message.channel.id}`, data.id);
            });
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