const Discord = require('discord.js');
const config = require('../../config.json');
const db = require('quick.db');

module.exports.run = (client, message, args) => {

    if(!message.guild.me.hasPermission("MANAGE_ROLES")) {
    const embed = new Discord.MessageEmbed()
        .setColor(client.color)
        .setDescription(message.language.errors.missingPerms(["MANAGE_ROLES"]))
    return message.channel.send(embed);
    }
    if(!message.member.hasPermission("ADMINISTRATOR")) {
        const embed = new Discord.MessageEmbed()
            .setColor(client.color)
            .setDescription(message.language.errors.permLevel("ADMINISTRATOR"))
        return message.channel.send(embed);
    }
    let role = message.mentions.roles.first() || message.guild.roles.cache.find((c) => c.name === args[1]);

    if(!args[0]){
        let content = ["autorole"];
        return client.commands.get("help").run(client, message, content);
    }
    if(args[0].toLowerCase() === "list"){
        let msg = '';
        db.all().forEach((element) => {
            const autoroledb = element.ID.startsWith(`autorole_${message.guild.id}`);
            // ${mentionedUser.id}
            if (!autoroledb) {return;}
            if(element.data.toLowerCase() !== `"join"`){
                return db.delete(element.ID);
            }
            const role_id = element.ID.split('_')[2];
            const role = message.guild.roles.cache.find((c) => c.id === role_id);
            if(!role){
                return db.delete(element.ID);
            }
            msg += "- "+role.name+"\n";
        });
        USERINFO_LIST = new Discord.MessageEmbed()
        .setTitle("__Autoroles List__ ")
        .setDescription(`\n\n ${msg}`)
        return message.channel.send(USERINFO_LIST)
    }

    if(args[0].toLowerCase() === "add"){
        if (!role) {
            const embed = new Discord.MessageEmbed()
            .setColor(client.color)
            .setDescription(message.language.errors.role())
            return message.channel.send(embed);
        }

        let rolePosition = role.position;
        let botPosition = message.guild.me.roles.highest.position;

        if(botPosition < rolePosition) {
            const embed = new Discord.MessageEmbed()
                .setColor(client.color)
                .setDescription(message.language.errors.highest())
            return message.channel.send(embed);
        }

        db.set(`autorole_${message.guild.id}_${role.id}`, `join`);
        const embed = new Discord.MessageEmbed()
        .setColor(client.color)
        .setDescription(message.language.autorole.on(role.name))
        return message.channel.send(embed);
    }
    else if(args[0].toLowerCase() === "remove"){
        if (!role) {
            const embed = new Discord.MessageEmbed()
            .setColor(client.color)
            .setDescription(message.language.errors.role())
            return message.channel.send(embed);
        }

        let rolePosition = role.position;
        let botPosition = message.guild.me.roles.highest.position;

        if(botPosition < rolePosition) {
            const embed = new Discord.MessageEmbed()
                .setColor(client.color)
                .setDescription(message.language.errors.highest())
            return message.channel.send(embed);
        }

        db.delete(`autorole_${message.guild.id}_${role.id}`);
        const embed = new Discord.MessageEmbed()
        .setColor(client.color)
        .setDescription(message.language.autorole.off(role.name))
        return message.channel.send(embed);
    }
    else {
        const embed = new Discord.MessageEmbed()
        .setColor(client.color)
        .setDescription(message.language.errors.action())
        return message.channel.send(embed);
    }
};

module.exports.help = {
    name: 'autorole',
    description: "Assigns roles. Ensure the role for me is above the role you want me to give, otherwise I wont have permission.\n\nExemples:\n`%prefix%autorole add Members` - Gives the role `Members` to users on join.\n`%prefix%autorole remove Members` - Remove the autorole for `Members`.\n`%prefix%autorole list` - List all the autoroles",
    category: "settings",
    usage:"<action> [role]",
    accessableby: "Admin",
    aliases: []
};