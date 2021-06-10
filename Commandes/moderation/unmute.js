const Discord = require('discord.js');
const config = require('../../config.json');
const db = require('quick.db');
const formatDate = require('dateformat');

module.exports.run = (client, message, args) => {

    
    if(!message.guild.me.hasPermission("MANAGE_ROLES")) {
    const embed = new Discord.MessageEmbed()
        .setColor(client.color)
        .setDescription(message.language.errors.missingPerms(["MANAGE_ROLES"]))
    return message.channel.send(embed);
    }
    if(!message.member.hasPermission("MANAGE_MESSAGES")) {
        const embed = new Discord.MessageEmbed()
            .setColor(client.color)
            .setDescription(message.language.errors.permLevel("MANAGE_MESSAGES"))
        return message.channel.send(embed);
    }

    const now = new Date();
    let raison = args.slice(1).join(" ") || "Unspecified";

    let member;
    if(message.mentions.members.first()){
        member = message.mentions.members.first();
    }
    else {
        if(isNaN(args[0]) && args[0]) {
            const embed = new Discord.MessageEmbed()
            .setColor(client.color)
            .setDescription(message.language.errors.user())
            return message.channel.send(embed);
        }
        member = message.guild.members.cache.get(args[0]);
    }
    if(!args[0] || !member) {
        let content = ["unmute"];
        return client.commands.get("help").run(client, message, content);
    }

    if(member.id === message.author.id || (message.member.roles.highest.position <= member.roles.highest.position)) {
        const embed = new Discord.MessageEmbed()
            .setColor(client.color)
            .setDescription(message.language.unmute.error_user())
        return message.channel.send(embed);
    }

    // Check if user have the muted role
    let mutedid = db.fetch(`mutedrole_${message.guild.id}`)
    let muted_role = message.guild.roles.cache.get(mutedid)
    // console.log(member.roles.cache);
    // console.log(member.roles.cache.has(muted_role.id));

    if(!muted_role){
        const embed = new Discord.MessageEmbed()
        .setColor(client.color)
        .setDescription(message.language.unmute.error_role())
        return message.channel.send(embed);
    }
    if(!member.roles.cache.has(muted_role.id)){
        const embed = new Discord.MessageEmbed()
            .setColor(client.color)
            .setDescription(message.language.unmute.error_notmuted())
        return message.channel.send(embed);
    }
    member.roles.remove(muted_role).catch((err) => {
        const embed = new Discord.MessageEmbed()
        .setColor(client.color)
        .setDescription(message.language.unmute.error_role())
        return message.channel.send(embed);
    });

    const embed = new Discord.MessageEmbed()
        .setColor(client.color)
        .setDescription(message.language.unmute.description(member.user.tag))
    message.channel.send(embed);
    let count = 0;
    db.all().forEach((element) => {
        const sanctionsdb = element.ID.startsWith(`sanctions_${message.guild.id}_${member.id}`);
        if (!sanctionsdb) {
            return;
        }
        count++;
    });
    db.set(`sanctions_${message.guild.id}_${member.id}_${count+1}`, `Unmuted by ${message.author.tag} | Reason : ${raison} | Time: ${formatDate(now, "mm/dd/yy HH:MM:ss")}`)

    db.delete(`mute_${message.guild.id}_${member.id}`);

};

module.exports.help = {
    name: 'unmute',
    description: "Unmute a user.",
    category: "Admin",
    usage:"<user> <reason>",
    accessableby: "Moderators, Admins", // ?
    aliases: []
};