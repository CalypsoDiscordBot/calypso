const Discord = require("discord.js");
const config = require('../../config.json');

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
    
    if (!args[0]) {
        let content = ["clean"];
        client.commands.get("help").run(client, message, content);
    }
    else if (isNaN(args[0])) {
        let content = ["clean"];
        client.commands.get("help").run(client, message, content);
    }    
        nb = parseInt(args[0])+1;                             
        message.channel.bulkDelete(nb).then((messages) => {
            const embed = new Discord.MessageEmbed()
                .setColor(config.color)
                .setDescription(message.language.clean.success(messages.size-1))
            return message.channel.send(embed);
        });
};

module.exports.help = {
    name: 'clean',
    description: "Cleans messages from a channel.",
    category: "moderation",
    usage:"[amount<100]",
    accessableby: "Admin",
    aliases: []
};
