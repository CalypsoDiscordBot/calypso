const Discord = require("discord.js");
const config = require('../../config.json');

module.exports.run = (client, message, args) => {
    
    if(!message.guild.me.hasPermission("MANAGE_MESSAGES")) {
        const embed = new Discord.MessageEmbed()
            .setColor(client.color)
            .setDescription(message.language.errors.missingPerms(["MANAGE_MESSAGES"]))
        return message.channel.send(embed);
    }
    if(!message.member.hasPermission("MANAGE_MESSAGES")) {
        const embed = new Discord.MessageEmbed()
            .setColor(client.color)
            .setDescription(message.language.errors.permLevel("MANAGE_MESSAGES"))
        return message.channel.send(embed);
    }
    
    if (!args[0]) {
        let content = ["clean"];
        return client.commands.get("help").run(client, message, content);
    }
    else if (isNaN(args[0])) {
        let content = ["clean"];
        return client.commands.get("help").run(client, message, content);
    }    
        nb = parseInt(args[0])+1;  
        if(nb > 100){
            const embed = new Discord.MessageEmbed()
                .setColor(client.color)
                .setDescription(message.language.clean.error_limit())
            return message.channel.send(embed);
        }
        try {                           
            message.channel.bulkDelete(nb).then((messages) => {
                const embed = new Discord.MessageEmbed()
                    .setColor(client.color)
                    .setDescription(message.language.clean.success(messages.size-1))
                return message.channel.send(embed);
            });
        } catch (error) {
            const embed = new Discord.MessageEmbed()
                .setColor(client.color)
                .setDescription(message.language.clean.error_date())
            return message.channel.send(embed);
        }
};

module.exports.help = {
    name: 'clean',
    description: "Cleans messages from a channel.",
    category: "moderation",
    usage:"[amount<100]",
    accessableby: "Admin",
    aliases: []
};
