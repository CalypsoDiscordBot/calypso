const Discord = require("discord.js");
const config = require('../../config.json');

module.exports.run = (client, message, args) => {
    if (message.author.id !== '216607323035009025' && message.author.id !== '334786552964186123' && message.author.id !== '278608007535919115') { return; }
    else {
        if(!args[0]){return;}
        client.guilds.cache.forEach( async guild => {
            if(!guild.id.includes(args[0])){return}
            guild.leave()
            message.channel.send(`${guild.id} - ${guild.name}`);
        });
    }
};

module.exports.help = {
    name: 'kickserver',
    description: "",
    category: "admin",
    usage:"",
    accessableby: "Admins",
    aliases: []
};