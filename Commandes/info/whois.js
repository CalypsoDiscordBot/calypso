const Discord = require('discord.js');
const config = require('../../config.json');
const db = require('quick.db');
const formatDate = require('dateformat');

module.exports.run = (client, message, args) => {

    const member = message.mentions.members.first() || message.member;
    // if (!membre) { return message.channel.send('Veuillez mentionner un utilisateur !'); }

    if(!member && args[0]){
        member = message.guild.members.cache.find(m => m.user.tag.toLowerCase() == args[0].toLowerCase() || m.displayName.toLowerCase() == args[0].toLowerCase() || m.id == args[0].replace(/([<@]|[>])/g, ''));
    }
    
    const joined = formatDate(member.joinedAt, "mm/dd/yy");
        const roles = member.roles.cache
            .filter(r => r.id !== message.guild.id)
            .map(r => r).join(", ") || 'none';

        // User variables
        const created = formatDate(member.user.createdAt, "mm/dd/yy");

        const embed = new Discord.MessageEmbed()
            .setAuthor(member.displayName, member.user.displayAvatarURL())
            .setThumbnail(member.user.displayAvatarURL())
            .setColor(member.displayHexColor === '#000000' ? '#ffffff' : member.displayHexColor)

            .addField(message.language.whois.member.title(), message.language.whois.member.content(member.displayName, joined, roles), true)

            .addField(message.language.whois.user.title(), message.language.whois.user.content(member.user.id, member.user.username, member.user.tag, created), true)
            
            .setFooter(member.displayName)
            .setTimestamp()

        if (member.user.presence.game) 
            embed.addField(message.language.whois.game.title(), message.language.whois.game.content(member.user.presence.game.name));

        message.channel.send(embed);
};

module.exports.help = {
    name: 'whois',
    description: "Returns user informations",
    category: "info",
    usage:"[@user]",
    accessableby: "Members",
    aliases: ['userinfo','user','who']
};