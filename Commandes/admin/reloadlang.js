const Discord = require("discord.js");

module.exports.run = (client, message, args) => {
    if (message.author.id !== '216607323035009025' && message.author.id !== '334786552964186123' && message.author.id !== '278608007535919115') { return; }
    else {
        try{
            delete require.cache[require.resolve(`../../languages/${client.language}.js`)];
            message.language = require("../../languages/"+client.language);
            message.channel.send(`Reload du fichier lang : ../../languages/${client.language}.js`)
        } catch (e) {
            message.channel.send(`Echec du reload : ../../languages/${client.language}.js`)
        }
    }
};

module.exports.help = {
    name: 'reloadlang',
    description: "",
    category: "admin",
    usage:"",
    accessableby: "Admins",
    aliases: []
};
