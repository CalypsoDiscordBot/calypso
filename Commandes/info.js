const Discord = require('discord.js');

exports.run = (client, message, args) => {
    var info = new Discord.MessageEmbed()
        .setTitle('Calypso')
        .setDescription("I'm a multi-purpose discord bot that does music, moderation and other fun and useful things. \n[Add to your Discord server](https://discord.com/api/oauth2/authorize?client_id=740539000615469106&permissions=8&scope=bot)")
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
