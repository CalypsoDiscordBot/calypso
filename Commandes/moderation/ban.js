const Discord = require('discord.js');
const config = require('../../config.json');
const db = require('quick.db');
const formatDate = require('dateformat');
const ms = require('ms');

module.exports.run = (client, message, args) => {

    if(!message.guild.me.hasPermission("BAN_MEMBERS")) {
        const embed = new Discord.MessageEmbed()
            .setColor(config.color)
            .setDescription(message.language.errors.missingPerms(["BAN_MEMBERS"]))
        return message.channel.send(embed);
    }
    if(!message.member.hasPermission("BAN_MEMBERS")) {
        const embed = new Discord.MessageEmbed()
            .setColor(config.color)
            .setDescription(message.language.errors.permLevel("BAN_MEMBERS"))
        return message.channel.send(embed);
    }

    const now = new Date();

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
        let content = ["ban"];
        return client.commands.get("help").run(client, message, content);
    }

    // check perms
    if(mentionedUser.id === message.author.id || !mentionedUser.bannable) {
        const embed = new Discord.MessageEmbed()
            .setColor(config.color)
            .setDescription(message.language.ban.error_user())
        message.channel.send(embed);
    } else {
        
        let raison = 'Unspecified'
        let temps = 'Forever'
        if(args[1] && ms(args[1])) {
            if(ms(args[1])< 120000 || ms(args[1])> 63070000000){
                const embed = new Discord.MessageEmbed()
                    .setColor(config.color)
                    .setDescription(message.language.ban.error_time())
                return message.channel.send(embed);
            }
            time = ms(args[1]) + now.getTime() 
            raison = args.slice(2).join(" ") || "Unspecified";
            temps = ms(ms(args[1]), { long: true })
            db.set(`ban_${message.guild.id}_${mentionedUser.id}`, time)
        } else if(args[1]) {
            raison = args.slice(1).join(" ") || "Unspecified";
        }

        const ban_embed = new Discord.MessageEmbed()
            .setColor(config.color)
            .setTitle(message.language.ban.dm.title(message.guild.name, message.author.tag))
            .setDescription(message.language.ban.dm.description(temps, raison))
        mentionedUser.send(ban_embed)

        let count = 0;
        db.all().forEach((element) => {
            const sanctionsdb = element.ID.startsWith(`sanctions_${message.guild.id}_${mentionedUser.id}`);
            if (!sanctionsdb) {
                return;
            }
            count++;
        });
        db.set(`sanctions_${message.guild.id}_${mentionedUser.id}_${count+1}`, `Banned by ${message.author.tag} | Reason: ${raison} | Duration: ${temps} | Time: ${formatDate(now, "mm/dd/yy HH:MM:ss")}`);
        
        const embed = new Discord.MessageEmbed()
            .setColor(config.color)
            .setTitle(message.language.ban.title(mentionedUser, message.author.tag))
            .setDescription(message.language.ban.description(temps, raison))
        message.channel.send(embed)

        setTimeout(() => {
            mentionedUser.ban({reason: `Banned by ${message.author.tag} | Reason: ${raison} | Duration: ${temps}`})
        }, 1500)
    } 
};

module.exports.help = {
    name: 'ban',
    description: "Bans a user.",
    category: "moderation",
    usage:"<user> <reason> or <user> <time(m,h,d,w,y)> <reason>",
    accessableby: "Admin", // ?
    aliases: ['tempban']
};