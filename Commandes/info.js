const Discord = require('discord.js');

exports.run = (client, message, args) => {
    var info = new Discord.MessageEmbed()
        .setColor('#ffce00')
        .setTitle('Informations de Calypso')
        .setDescription("> `Calypso est un bot discord qui fais pas mal de truc` \n > `Comme de la musique de la modération et bien plus`")
        .setFooter(`Calypso BOT`)
        .setImage("")
        .setTimestamp()
    message.channel.send(info)
}

module.exports.help = {
    name: "info",
    aliases: []
}
