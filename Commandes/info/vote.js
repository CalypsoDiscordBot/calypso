const Discord = require('discord.js');

module.exports.run = (client, message, args) => {
    var info = new Discord.MessageEmbed()
        .setTitle('Calypso | Vote')
        .setDescription(`[Vote on Top.gg !](https://top.gg/bot/740539000615469106/vote)\n[Vote on Discord Boats !](https://discord.boats/bot/740539000615469106/vote)\n[Vote on discord-botlist.eu !](https://www.discord-botlist.eu/bots/740539000615469106/vote)\n[Vote on Wonder Bot List !](https://wonderbotlist.com/fr/bot/740539000615469106/vote)`)
        .setFooter(`Calypso`)
        .setImage("")
        .setTimestamp()
    message.channel.send(info)
}

module.exports.help = {
    name: "vote",
    description: "",
    category: "info",
    usage:"",
    accessableby: "Members",
    aliases: []
}
