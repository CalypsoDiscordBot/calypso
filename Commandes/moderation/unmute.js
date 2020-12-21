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

    let mentionedUser;
    if(message.mentions.members.first()){
        mentionedUser = message.mentions.members.first();
    }
    else {
        mentionedUser = args[0];
        if(isNaN(mentionedUser) && args[0]) {
            const embed = new Discord.MessageEmbed()
            .setColor(client.color)
            .setDescription(message.language.errors.user())
            return message.channel.send(embed);
        }
        mentionedUser = message.guild.members.resolve(args[0]);
    }
    if(!args[0] || !mentionedUser) {
        let content = ["unmute"];
        return client.commands.get("help").run(client, message, content);
    }
    
    const memberPosition = mentionedUser.roles.highest.position;
    const moderationPosition = message.member.roles.highest.position;

    if(mentionedUser.id === message.author.id || (moderationPosition < memberPosition)) {
        const embed = new Discord.MessageEmbed()
            .setColor(client.color)
            .setDescription(message.language.unmute.error_user())
        return message.channel.send(embed);
    }

    // Check if user have the muted role
    if(!mentionedUser.roles.cache.has(role => role.name.toLowerCase().includes("muted"))){
        const embed = new Discord.MessageEmbed()
            .setColor(client.color)
            .setDescription(message.language.unmute.error_notmuted())
        return message.channel.send(embed);
    }

    // delete the muted time in db
    db.delete(`mute_${message.guild.id}_${mentionedUser.id}`);
    let muted_role = db.fetch(`mutedrole_${message.guild.id}`);

    if(!muted_role){
        muted_role = message.guild.roles.cache.find(role => role.name.toLowerCase().includes("muted"));
        // const embed = new Discord.MessageEmbed()
        // .setColor(client.color)
        // .setDescription(message.language.unmute.error_role())
        // return message.channel.send(embed);
    }
    mentionedUser.roles.remove(muted_role).catch((err) => {
        const embed = new Discord.MessageEmbed()
        .setColor(client.color)
        .setDescription(message.language.unmute.error_role())
        return message.channel.send(embed);
    });

    const embed = new Discord.MessageEmbed()
        .setColor(client.color)
        .setDescription(message.language.unmute.description(mentionedUser.user.tag))
    message.channel.send(embed);
    let count = 0;
    db.all().forEach((element) => {
        const sanctionsdb = element.ID.startsWith(`sanctions_${message.guild.id}_${mentionedUser.id}`);
        if (!sanctionsdb) {
            return;
        }
        count++;
    });
    db.set(`sanctions_${message.guild.id}_${mentionedUser.id}_${count+1}`, `Unmuted by ${message.author.tag} | Reason : ${raison} | Time: ${formatDate(now, "mm/dd/yy HH:MM:ss")}`)

    db.delete(`mute_${message.guild.id}_${mentionedUser.id}`);

};

module.exports.help = {
    name: 'unmute',
    description: "Unmute a user.",
    category: "Admin",
    usage:"<user> <reason>",
    accessableby: "Moderators, Admins", // ?
    aliases: []
};