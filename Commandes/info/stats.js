const Discord = require('discord.js');

exports.run = (client, message, args) => {

    totaltickets = db.fetch('stats_ticketcreate').length;
    playurl = db.fetch('stats_playurl').length;
    playsearch = db.fetch('stats_playsearch').length;

    var stats = new Discord.MessageEmbed()
        .setTitle('Calypso | Statistiques')
        .setDescription(`Statistiques d'utilisation du bot :
        - Tickets : ${totaltickets}
        - Play URL : ${playurl}
        - Play Search : ${playsearch}
        `)
        .setFooter(`Calypso`)
        .setImage("")
        .setTimestamp()
    message.channel.send(stats)
}

module.exports.help = {
    name: "stats",
    description: "",
    category: "info",
    usage:"",
    accessableby: "Members",
    aliases: []
}
