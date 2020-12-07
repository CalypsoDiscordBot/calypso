const Discord = require('discord.js');
const config = require('../../config.json');
const db = require('quick.db');

module.exports.run = (client, message, args) => {

    if(!message.guild.me.hasPermission("MANAGE_MESSAGES") || !message.guild.me.hasPermission("MANAGE_ROLES")) {
    const embed = new Discord.MessageEmbed()
        .setColor(client.color)
        .setDescription(message.language.errors.missingPerms(["MANAGE_MESSAGES","MANAGE_ROLES"]))
    return message.channel.send(embed);
    }
    if(!message.member.hasPermission("ADMINISTRATOR")) {
        const embed = new Discord.MessageEmbed()
            .setColor(client.color)
            .setDescription(message.language.errors.permLevel("ADMINISTRATOR"))
        return message.channel.send(embed);
    }

    let role = message.mentions.roles.first() || message.guild.roles.cache.find((c) => c.name === args[0]);

    if(!args[0]){
        let content = ["accessrole"];
        return client.commands.get("help").run(client, message, content);
    }
    else if (args[0] === "disable"){
        db.delete(`accessrole_${message.guild.id}`);
        const embed = new Discord.MessageEmbed()
        .setColor(client.color)
        .setDescription(message.language.accessrole.off())
        return message.channel.send(embed);
    }
    
    if (role){
        db.set(`accessrole_${message.guild.id}`, role.id);
        const embed = new Discord.MessageEmbed()
        .setColor(client.color)
        .setDescription(message.language.accessrole.on())
        return message.channel.send(embed);
    }
    else{
        const embed = new Discord.MessageEmbed()
        .setColor(client.color)
        .setDescription(message.language.errors.role())
        return message.channel.send(embed);
    }
};

module.exports.help = {
    name: 'accessrole',
    description: "Sets a role that people have to have to use the bot. Use `!accessrole disable` to disable",
    category: "settings",
    usage:"<role>",
    accessableby: "Admin",
    aliases: []
};