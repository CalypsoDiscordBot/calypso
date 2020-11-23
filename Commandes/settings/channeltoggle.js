const Discord = require('discord.js');
const config = require('../../config.json');
const db = require('quick.db');

module.exports.run = (client, message, args) => {


    if(!message.guild.me.hasPermission("MANAGE_MESSAGES")) {
    const embed = new Discord.MessageEmbed()
        .setColor(config.color)
        .setDescription(message.language.errors.missingPerms(["MANAGE_MESSAGES"]))
    return message.channel.send(embed);
    }
    if(!message.member.hasPermission("ADMINISTRATOR")) {
        const embed = new Discord.MessageEmbed()
            .setColor(config.color)
            .setDescription(message.language.errors.permLevel("ADMINISTRATOR"))
        return message.channel.send(embed);
    }

    let channel = message.mentions.channels.first() || message.guild.channels.cache.find((c) => c.name === args[0]);
    
    if (channel){
        let channeltoggle = db.fetch(`channeltoggle_${message.guild.id}_${channel.id}`);
        if (!channeltoggle || channeltoggle === "Enable"){ // channeltoggle === "Enable" : ancienne version de db
            db.set(`channeltoggle_${message.guild.id}_${channel.id}`, "Disable");
            const embed = new Discord.MessageEmbed()
                .setColor(config.color)
                .setDescription(message.language.channeltoggle.offchannel(channel))
            return message.channel.send(embed);
        }
        else {
            db.delete(`channeltoggle_${message.guild.id}_${channel.id}`);
            const embed = new Discord.MessageEmbed()
                .setColor(config.color)
                .setDescription(message.language.channeltoggle.onchannel(channel))
            return message.channel.send(embed);
        }
    }
    else {
        let channeltoggle = db.fetch(`channeltoggle_${message.guild.id}_${message.channel.id}`);
        if (!channeltoggle || channeltoggle === "Enable"){ // channeltoggle === "Enable" : ancienne version de db
            db.set(`channeltoggle_${message.guild.id}_${message.channel.id}`, "Disable");
            const embed = new Discord.MessageEmbed()
                .setColor(config.color)
                .setDescription(message.language.channeltoggle.off())
            return message.channel.send(embed);
        }
        else {
            db.delete(`channeltoggle_${message.guild.id}_${message.channel.id}`);
            const embed = new Discord.MessageEmbed()
                .setColor(config.color)
                .setDescription(message.language.channeltoggle.on())
            return message.channel.send(embed);
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