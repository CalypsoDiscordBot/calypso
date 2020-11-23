const Discord = require('discord.js');
const config = require('../../config.json');
const db = require('quick.db');
const formatDate = require('dateformat');
const ms = require('ms');

module.exports.run = (client, message, args) => {

    if(!message.guild.me.hasPermission("KICK_MEMBERS")) {
        const embed = new Discord.MessageEmbed()
            .setColor(config.color)
            .setDescription(message.language.errors.missingPerms(["KICK_MEMBERS"]))
        return message.channel.send(embed);
    }
    if(!message.member.hasPermission("KICK_MEMBERS")) {
        const embed = new Discord.MessageEmbed()
            .setColor(config.color)
            .setDescription(message.language.errors.permLevel("KICK_MEMBERS"))
        return message.channel.send(embed);
    }

    // RESOLVE MEMBER
    let mentionedUser;
    if(message.mentions.members.first()){
        mentionedUser = message.mentions.members.first();
    }
    else {
        mentionedUser = args[0];
        if(isNaN(mentionedUser) && args[0]) {
            const embed = new Discord.MessageEmbed()
            .setColor(config.color)
            .setDescription(message.language.errors.user())
            return message.channel.send(embed);
        }
        mentionedUser = message.guild.members.resolve(args[0]);
    }
    if(!args[0] || !mentionedUser) {
        let content = ["mute"];
        return client.commands.get("help").run(client, message, content);
    }
    const now = new Date();

    // Check auth
    if(mentionedUser.id === message.author.id || !mentionedUser.kickable) {
        const embed = new Discord.MessageEmbed()
        .setColor(config.color)
        .setDescription(message.language.kick.error_user())
        message.channel.send(embed);
    } else {
        let count = 0;
        db.all().forEach((element) => {
            const sanctionsdb = element.ID.startsWith(`sanctions_${message.guild.id}_${mentionedUser.id}`);
            if (!sanctionsdb) {
                return;
            }
            count++;
        });
        let raison = args.slice(1).join(" ") || "Unspecified";
        db.set(`sanctions_${message.guild.id}_${mentionedUser.id}_${count+1}`, `Kicked by ${message.author.tag} | Reason: ${raison} | Time: ${formatDate(now, "mm/dd/yy HH:MM:ss")}`);

        const embed = new Discord.MessageEmbed()
        .setColor(config.color)
        .setDescription(message.language.kick.description(mentionedUser, message.author.tag, raison))
        message.channel.send(embed)

        const kick_embed = new Discord.MessageEmbed()
        .setColor(config.color)
        .setTitle(message.language.kick.dm.title(message.guild.name, message.author.tag))
        .setDescription(message.language.kick.dm.description(raison))
        mentionedUser.send(kick_embed)
        
        setTimeout(() => {
            mentionedUser.kick(`Kicked by ${message.author.tag} | Reason: ${raison}`)
        }, 1500)
    } 
};

module.exports.help = {
    name: 'kick',
    description: "Kicks a user.",
    category: "Admin",
    usage:"<user> <raison>",
    accessableby: "Moderators, Admins", // ?
    aliases: []
};