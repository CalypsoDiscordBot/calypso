const Discord = require('discord.js')
const config = require('../../config.json');

module.exports.run = async (client, message, args) => {
    
    if(!message.member.hasPermission("MANAGE_MESSAGES")) {
        const embed = new Discord.MessageEmbed()
            .setColor(client.color)
            .setDescription(message.language.errors.permLevel("MANAGE_MESSAGES"))
        return message.channel.send(embed);
    }

    if(!args[0]){
        let content = ["embedsay"];
        return client.commands.get("help").run(client, message, content);
    }

    let messageToBot = args.join(' ')
    
    let embedsay = new Discord.MessageEmbed()
        .setColor(client.color)
        .setDescription(messageToBot)
    message.channel.send(embedsay)

    if(message.guild.me.hasPermission("MANAGE_MESSAGES")) {
        message.delete().catch()
    }

}

module.exports.help = {
    name: 'embedsay',
    description: "Let's the bot say a message.",
    category: "moderation",
    usage:"<message>",
    accessableby: "Admin", // ?
    aliases: []
}