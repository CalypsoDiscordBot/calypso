const Discord = require('discord.js');
const config = require('../config.json');
const db = require("quick.db");
const { MessageButton, MessageActionRow } = require('discord-buttons');

module.exports = async (client, button) => {

    // console.log(button)
    // console.log(button.clicker.user)
    await button.defer();

    let user = button.clicker.user;
    // let message = button.channel;

    let message = await client.channels.cache.get(button.channel.id).messages.fetch(button.message.id)

    // LANGUAGE
    var language = config.language;
    let languagedb = db.fetch(`language_${message.guild.id}`);
    if(languagedb){
        var language = languagedb;
    }
    client.language = language;
    delete require.cache[require.resolve(`../languages/${client.language}.js`)];
    message.language = require("../languages/"+client.language);
    message.author = user;

    if(button.id.startsWith('music_')){

        let isPlaying = client.player.isPlaying(message);
        let queue = await client.player.getQueue(message);

        if(!isPlaying){return}
        if(!message.guild.me.voice.channel){return;}
        if(message.guild.me.voice.channel && message.member.voice.channel !== message.guild.me.voice.channel){return;}

        if(button.id == 'music_resume'){
                
            if(queue.dispatcher.paused) {
                client.player.resume(message);
            }
            else {
                client.player.pause(message);
            }
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
    
            message.edit(message.content, {component: buttonRow, embed: message.embeds[0]});
        }
        if(button.id == 'music_skip'){
            
            await client.player.skip(message);

            setTimeout(async function()
            {
                let song = await client.player.nowPlaying(message);
                if(!song){return;}
                
            },50);
        }
        if(button.id == 'music_volumedown'){
            volume = await client.player.getVolume(message)-25;
            if(parseInt(volume) < 0){return;}
            setTimeout(async function()
            {
                let song = await client.player.nowPlaying(message);
                
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
                message.edit({
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
                        }]
                }});
            },50);
            return client.player.setVolume(message, parseInt(volume));
        }
        if(button.id == 'music_volumeup'){
            volume = await client.player.getVolume(message)+25;
            if(parseInt(volume) > 200){return;}
            setTimeout(async function()
            {
                let song = await client.player.nowPlaying(message);
                
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
                message.edit({
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
                        }]
                }});
            },50);
            return client.player.setVolume(message, parseInt(volume));
        }
        if(button.id == 'music_loop'){
            await client.player.toggleLoop(message);
            setTimeout(async function(){
                
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
                
                message.edit({component: buttonRow, embed: message.embeds[0]});
            },50);
        }
        if(button.id == 'music_stop'){
            return client.commands.get("stop").run(client, message);
        }
    }
    

};
// Alexmdz77 | 22/03/2021