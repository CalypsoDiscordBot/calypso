const Discord = require('discord.js')
const config = require('../config.json');

module.exports.run = async (client, message, args) => {
    if(!message.member.hasPermission('MANAGE_MESSAGES')){ return; }

    if(!args[0]){
        let content = ["embedsay"];
        return client.commands.get("help").run(client, message, content);
    }

    let messageToBot = args.join(' ')
    message.delete().catch()
    
    let embedsay = new Discord.MessageEmbed()
        .setColor(config.color)
        .setDescription(messageToBot)
    message.channel.send(embedsay)

}

module.exports.help = {
    name: 'embedsay',
    description: "Let's the bot say a message.",
    category: "moderation",
    usage:"<message>",
    accessableby: "Admin", // ?
    aliases: []
}