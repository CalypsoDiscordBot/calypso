const Discord = require("discord.js");
const formatDate = require('dateformat');
const config = require('../../config.json');

module.exports.run = async (client, message, args) => {
    const verlvl = {
        "NONE": "No protection",
        "LOW": "Low",
        "MEDIUM": "Way",
        "HIGH": "High",
        "VERY_HIGH": "Very high"
    }

    let icon = message.guild.iconURL({ format: 'png', dynamic: true, size: 1024 });
    if(icon){
        if(message.guild.iconURL().includes("gif")){
            icon = message.guild.iconURL({ format: 'gif', dynamic: true, size: 1024 });
        }
    }

    let serverembed = new Discord.MessageEmbed()
        .setThumbnail(icon || null)
        .setAuthor(message.guild.name)
        .setColor(config.color)

        .addField(message.language.serverinfo.infos.title(), message.language.serverinfo.infos.content(message.guild.name, message.guild.id, message.guild.owner, formatDate(message.guild.createdAt, "mm/dd/yy")), true)

        .addField(message.language.serverinfo.settings.title(), message.language.serverinfo.settings.content(message.guild.region, verlvl[message.guild.verificationLevel]), true)

        .addField(message.language.serverinfo.stats.title(), message.language.serverinfo.stats.content(message.guild.memberCount, message.guild.channels.cache.size, message.guild.roles.cache.size), false)

        .setFooter(`${message.guild.name}`)
        .setTimestamp();
    
    message.channel.send(serverembed);

}

module.exports.help = {
    name: 'serverinfo',
    description: "Gives all the informations about the server.",
    category: "info",
    usage:"",
    accessableby: "Members",
    aliases: []
}