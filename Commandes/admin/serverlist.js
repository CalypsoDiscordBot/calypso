const Discord = require("discord.js");
const config = require('../../config.json');

module.exports.run = (client, message, args) => {
    if (message.author.id !== '216607323035009025' && message.author.id !== '334786552964186123' && message.author.id !== '278608007535919115') { return; }
    else {
        let content = '';
        let nb = 0;
        client.guilds.cache.forEach( async guild => {
            let guildusers = 0;
            guild.members.fetch().then((g) => {
                guildusers = g.filter((member) => !member.user.bot).size;
            });

            nb++;
            content = `${content}${nb}- \`${guild.name} - ${guild.owner.user.tag} - ${guildusers || guild.members.cache.size}\`\n`
        });
        message.channel.send(content, { split: true });
    }
};

module.exports.help = {
    name: 'serverlist',
    description: "",
    category: "admin",
    usage:"",
    accessableby: "Admins",
    aliases: []
};