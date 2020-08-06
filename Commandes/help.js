const Discord = require('discord.js');
const config = require('../config.json');

module.exports.run = (client, message, args) => {

    if(!message.member.hasPermission("ADMINISTRATOR")) {return;}
    message.channel.send("Check your direct messages for a list of commands!")

    message.author.send({
            embed: {
               description: "I'm a multi-purpose discord bot that does music, moderation and other fun and useful things. \nDo `!help <command>` for extended information on a command.",
               color: config.color,
               timestamp: new Date(),
               footer: {
                    icon_url: client.user.displayAvatarURL,
                    text: "Calypso Bot"
               },
               author: {
                 name: "Calypso",
                 icon_url: client.user.displayAvatarURL
               },
               fields: [
                 {
                   name: ":hammer: Admin",
                   value: "`!ban`, `!clear`"
                 },
                 {
                   name: ":notes: Music",
                   value: "`!play`, `!stop`"
                 },
                 {
                   name: ":100: Meme",
                   value: "t"
                 },
                 {
                   name: ":tada: Fun",
                   value: "t"
                 }
               ]
             }
    });
};

module.exports.help = {
    name: 'help',
    description: "",
    category: "",
    aliases: []
};
