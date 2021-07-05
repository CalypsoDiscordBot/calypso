const Discord = require('discord.js');
const { emojis } = require("../../config");
const { MessageButton, MessageActionRow } = require('discord-buttons');
const db = require("quick.db");

module.exports.run = async (client, message, args) => {

    let queue = await client.player.getQueue(message);
    let isPlaying = client.player.isPlaying(message);
    if(!isPlaying){
        const embed = new Discord.MessageEmbed()
            .setColor(client.color)
            .setDescription(message.language.music.error_notplaying())
        return message.channel.send(embed);
    }
    else {
        let player_id = await db.fetch(`musicplayer_${message.guild.id}_${message.channel.id}`);
        if(player_id){
            let player_message = await message.channel.messages.fetch(player_id)
            if(player_message){
                player_message.edit({embed: player_message.embeds[0]});
            }
        }

        const song = await client.player.nowPlaying(message);
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

        if(queue.dispatcher.paused) {
            await button_resume.setEmoji("852290408825356298")
        }
        if(queue.repeatMode){
            await button_loop.setEmoji("852320829232381972")
        }

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
    }
        
};

module.exports.help = {
    name: 'np',
    description: "Gives you the name of the song!",
    category: "music",
    usage:"<track>",
    accessableby: "Members",
    aliases: ['now','nowplaying']
};