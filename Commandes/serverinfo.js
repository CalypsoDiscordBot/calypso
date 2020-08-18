const Discord = require("discord.js");
const formatDate = require('dateformat');

module.exports.run = async (client, message, args) => {
    const verlvl = {
        "NONE": "No protection",
        "LOW": "Low",
        "MEDIUM": "Way",
        "HIGH": "High",
        "VERY_HIGH": "Very high"
    }

    let icon = message.guild.iconURL({ format: 'png', dynamic: true, size: 1024 });
    if(message.guild.iconURL().includes("gif")){
        icon = message.guild.iconURL({ format: 'gif', dynamic: true, size: 1024 });
    }

    let serverembed = new Discord.MessageEmbed()
        .setThumbnail(icon)
        .setAuthor(message.guild.name)

        .addField('Server informations:', `
            **▫️ Name: ** ${message.guild.name}
            **▫️ ID: ** ${message.guild.id}
            **▫️ Owner:** ${message.guild.owner}
            **▫️ Created on:** ${formatDate(message.guild.createdAt, "mm/dd/yy")}`, true)

        .addField('Server Settings:', `
            **▫️ Region:** ${message.guild.region}
            **▫️ Verification level:** ${verlvl[message.guild.verificationLevel]}`, true)

        .addField('Server Stats:', `
            **▫️ Members:** ${message.guild.memberCount}
            **▫️ Channels:** ${message.guild.channels.cache.size}
            **▫️ Roles :** ${message.guild.roles.cache.size}`, false)

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