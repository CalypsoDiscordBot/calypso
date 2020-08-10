const Discord = require('discord.js');
const config = require('../config.json');
const db = require('quick.db');

module.exports.run = (client, message, args) => {

    if(!message.member.hasPermission("ADMINISTRATOR")) {return;}

    let channel = message.mentions.channels.first() || message.guild.channels.cache.find((c) => c.name === args[0]);
    
    if (channel){
        let channeltoggle = db.fetch(`channeltoggle_${message.guild.id}_${channel.id}`);
        if (!channeltoggle || channeltoggle === "Enable"){
            db.set(`channeltoggle_${message.guild.id}_${channel.id}`, "Disable");
            return message.channel.send("Disabled commands in this channel.")
        }
        else {
            db.set(`channeltoggle_${message.guild.id}_${channel.id}`, "Enable");
            return message.channel.send("Enabled commands in this channel.")
        }
    }
    else {
        let channeltoggle = db.fetch(`channeltoggle_${message.guild.id}_${message.channel.id}`);
        if (!channeltoggle || channeltoggle === "Enable"){
            db.set(`channeltoggle_${message.guild.id}_${message.channel.id}`, "Disable");
            return message.channel.send("Disabled commands in this channel.")
        }
        else {
            db.set(`channeltoggle_${message.guild.id}_${message.channel.id}`, "Enable");
            return message.channel.send("Enabled commands in this channel.")
        }
    }
};

module.exports.help = {
    name: 'channeltoggle',
    description: "Disables commands in a channel.",
    category: "settings",
    usage:"",
    accessableby: "Admin",
    aliases: []
};