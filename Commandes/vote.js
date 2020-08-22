const Discord = require('discord.js');

exports.run = (client, message, args) => {
    var info = new Discord.MessageEmbed()
        .setTitle('Calypso | Vote')
        .setDescription(`[Vote on discordbotlist.com !](https://discordbotlist.com/bots/calypso-3856/upvote)
        [Vote on Discord Boats !](https://discord.boats/bot/740539000615469106/vote)
        [Vote on discord-botlist.eu !](https://www.discord-botlist.eu/bots/740539000615469106/vote)
        [Vote on Wonder Bot List !](https://wonderbotlist.com/fr/bot/740539000615469106/vote)`)
        .setFooter(`Calypso`)
        .setImage("")
        .setTimestamp()
    message.channel.send(info)
}

module.exports.help = {
    name: "info",
    description: "",
    category: "info",
    usage:"",
    accessableby: "Members",
    aliases: []
}
