const Discord = require('discord.js')

module.exports.run = async (client, message, args) => {
    
    if(!message.member.hasPermission('MANAGE_MESSAGES')){ return; }

    if(!args[0]){
        let content = ["say"];
        return client.commands.get("help").run(client, message, content);
    }

    let messageToBot = args.join(' ')
    message.delete().catch()
    message.channel.send(messageToBot)

}

module.exports.help = {
    name: 'say',
    description: "Let's the bot say a message.",
    category: "moderation",
    usage:"<message>",
    accessableby: "Admin", // ?
    aliases: []
}