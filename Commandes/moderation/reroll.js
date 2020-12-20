const Discord = require('discord.js');
const config = require('../../config.json');

module.exports.run = (client, message, args) => {

    if(!message.member.hasPermission("ADMINISTRATOR")) {
        const embed = new Discord.MessageEmbed()
            .setColor(client.color)
            .setDescription(message.language.errors.permLevel("ADMINISTRATOR"))
        return message.channel.send(embed);
    }

	if(!args[0]) {
        let content = ["reroll"];
        client.commands.get("help").run(client, message, content);
    }
    else {
        client.giveawaysManager.reroll(args[0], {
            messages: {
                congrat: message.language.reroll.messages.congrat(),
                error: message.language.reroll.messages.error()
            }
        }).catch((err) => {
            const embed = new Discord.MessageEmbed()
                .setColor(client.color)
                .setDescription(message.language.reroll.error(args[0]))
            return message.channel.send(embed);
        });
    }

    if(message.guild.me.hasPermission("MANAGE_MESSAGES")) {
        message.delete().catch()
    }
    
};

module.exports.help = {
    name: 'reroll',
    description: "Randomly picks a member that reacted to the giveaway message.",
    category: "moderation",
    usage:"<message's ID>",
    accessableby: "Admin",
    aliases: ['greroll']
};