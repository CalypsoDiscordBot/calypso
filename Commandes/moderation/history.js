const Discord = require('discord.js');
const config = require('../../config.json');
const db = require('quick.db');
const formatDate = require('dateformat');
const ms = require('ms');

module.exports.run = (client, message, args) => {

    if(!message.guild.me.hasPermission("MANAGE_MESSAGES")) {
    const embed = new Discord.MessageEmbed()
        .setColor(config.color)
        .setDescription(message.language.errors.missingPerms(["MANAGE_MESSAGES"]))
    return message.channel.send(embed);
    }
    if(!message.member.hasPermission("MANAGE_MESSAGES")) {
        const embed = new Discord.MessageEmbed()
            .setColor(config.color)
            .setDescription(message.language.errors.permLevel("MANAGE_MESSAGES"))
        return message.channel.send(embed);
    }

    let mentionedUser;
    if(message.mentions.members.first()){
        mentionedUser = message.mentions.members.first().id;
    }
    else {
        mentionedUser = args[0];
        if(isNaN(mentionedUser) && args[0]) {
            const embed = new Discord.MessageEmbed()
            .setColor(config.color)
            .setDescription(message.language.errors.user())
            return message.channel.send(embed);
        }
    }
    if(args[1]) {
        if(isNaN(args[1])){
            const embed = new Discord.MessageEmbed()
            .setColor(config.color)
            .setDescription(message.language.history.error_sanction())
            return message.channel.send(embed);
        }
    }

    if(!args[0]) {
        let content = ["history"];
        return client.commands.get("help").run(client, message, content);
    }
    
    let count = 0;
    db.all().forEach((element) => {
        const sanctionsdb = element.ID.startsWith(`sanctions_${message.guild.id}_${mentionedUser}`);
        if (!sanctionsdb) {
            return;
        }
        count++;
    });
    let sanction = "";
    for (let i = count; i > 0; i--) {
        sanction += "\n**"+i+".** "+db.fetch(`sanctions_${message.guild.id}_${mentionedUser}_${i}`);
        console.log(sanction);
    }

    if(count == 0) {
        const embed = new Discord.MessageEmbed()
        .setColor(config.color)
        .setDescription(message.language.history.error_nosanction())
        return message.channel.send(embed);
    }

    if(sanction.toString().length < 1800) {
        USERINFO_LIST = new Discord.MessageEmbed()
        .setTitle(message.language.history.title())
        .setColor(config.color)
        .setDescription(message.language.history.description(mentionedUser, sanction))
        return message.channel.send(USERINFO_LIST)
    } else {
        contenu = sanction.toString().split("\n")
        let taille = sanction.toString().length
        let p = 0
        while(taille >= 1800) {
            contenu.pop()
            console.log(contenu);
            taille = contenu.toString().length
            p = p + 1
        }
        if(p != 0) {
            USERINFO_LIST = new Discord.MessageEmbed()
            .setTitle(message.language.history.title())
            .setDescription(message.language.history.description(mentionedUser, contenu.join("\n")))
            .setFooter(message.language.history.footer(p))
            return message.channel.send(USERINFO_LIST)
        } else {
            USERINFO_LIST = new Discord.MessageEmbed()
            .setTitle(message.language.history.title())
            .setDescription(message.language.history.description(mentionedUser, contenu.join("\n")))
            return message.channel.send(USERINFO_LIST)                
        }
    }

};

module.exports.help = {
    name: 'history',
    description: "Shows a user's sanction history.",
    category: "moderation",
    usage:"<user>",
    accessableby: "Admin", // ?
    aliases: []
};