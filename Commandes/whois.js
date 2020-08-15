const Discord = require('discord.js');
const config = require('../config.json');
const db = require('quick.db');

module.exports.run = (client, message, args) => {

    const member = message.mentions.members.first() || message.member;
    // if (!membre) { return message.channel.send('Veuillez mentionner un utilisateur !'); }

    const joined = formatDate(member.joinedAt);
        const roles = member.roles
            .filter(r => r.id !== message.guild.id)
            .map(r => r).join(", ") || 'none';

        // User variables
        const created = formatDate(member.user.createdAt);

        const embed = new RichEmbed()
            .setFooter(member.displayName, member.user.displayAvatarURL)
            .setThumbnail(member.user.displayAvatarURL())
            .setColor(member.displayHexColor === '#000000' ? '#ffffff' : member.displayHexColor)

            .addField('Member information:', stripIndents`**> Display name:** ${member.displayName}
            **> Joined at:** ${joined}
            **> Roles:** ${roles}`, true)

            .addField('User information:', stripIndents`**> ID:** ${member.user.id}
            **> Username**: ${member.user.username}
            **> Tag**: ${member.user.tag}
            **> Created at**: ${created}`, true)
            
            .setTimestamp()

        if (member.user.presence.game) 
            embed.addField('Currently playing', stripIndents`**> Name:** ${member.user.presence.game.name}`);

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