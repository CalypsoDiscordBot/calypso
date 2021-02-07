const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
    if (message.author.id !== '216607323035009025' && message.author.id !== '334786552964186123' && message.author.id !== '278608007535919115') { return; }
    else {
        const { Player } = require("discord-music-player");
        client.player = new Player(client);

        message.channel.send(`Reload player terminé !`)
    }
};

module.exports.help = {
    name: 'reloadplayer',
    description: "",
    category: "admin",
    usage:"",
    accessableby: "Admins",
    aliases: []
};