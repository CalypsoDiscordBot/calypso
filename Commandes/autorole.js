const Discord = require('discord.js');
const config = require('../config.json');
const db = require('quick.db');

module.exports.run = (client, message, args) => {

    if(!message.member.hasPermission("ADMINISTRATOR")) {return;}

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
        message.channel.send(USERINFO_LIST)
    }
    else if(args[0].toLowerCase() === "add"){
        if (!role) {
            const embed = new Discord.MessageEmbed()
            .setColor(config.color)
            .setDescription("❌ Unable to resolve the `role` argument.")
            return message.channel.send(embed);
        }
        db.set(`autorole_${message.guild.id}_${role.id}`, `join`);
        return message.channel.send(`Successfully added \`${role.name}\`.`)
    }
    else if(args[0].toLowerCase() === "remove"){
        if (!role) {
            const embed = new Discord.MessageEmbed()
            .setColor(config.color)
            .setDescription("❌ Unable to resolve the `role` argument.")
            return message.channel.send(embed);
        }
        db.delete(`autorole_${message.guild.id}_${role.id}`);
        return message.channel.send(`Successfully removed \`${role.name}\`.`)
    }
    else {
        const embed = new Discord.MessageEmbed()
        .setColor(config.color)
        .setDescription("❌ Unable to resolve the `action` argument.")
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