const Discord = require('discord.js');
const config = require('../../config.json');
const db = require('quick.db');

module.exports.run = (client, message, args) => {

    console.log(db.fetch('stats_ticketcreate'));
    let dbtotaltickets = db.fetch('stats_ticketcreate');
    let totaltickets = ((dbtotaltickets === null) ? 0 : dbtotaltickets.length);
    let dbplayurl = db.fetch('stats_playurl');
    let playurl = ((dbplayurl === null) ? 0 : dbplayurl.length);
    let dbplaysearch = db.fetch('stats_playsearch');
    let playsearch = ((dbplaysearch === null) ? 0 : dbplaysearch.length);
    
    const stats = new Discord.MessageEmbed()
        .setTitle('Calypso | Statistiques')
        .setDescription(`Statistiques d'utilisation du bot :
        - Tickets : ${totaltickets}
        - Play URL : ${playurl}
        - Play Search : ${playsearch}
        `)
        .setFooter(`Calypso`)
        .setColor(config.color)
        .setTimestamp()
    return message.channel.send(stats);
};

module.exports.help = {
    name: "stats",
    description: "",
    category: "info",
    usage:"",
    accessableby: "Members",
    aliases: []
};
//
//
//