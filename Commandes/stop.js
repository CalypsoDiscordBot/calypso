const Discord = require("discord.js");

module.exports.run = (client, message, args) => {
    if (message.author.id !== '216607323035009025' && message.author.id !== '334786552964186123') { return; }
    else {
        message.author.send('Arrêt du bot...')
            .then(() => process.exit(0));
    }
};

module.exports.help = {
    name: 'stop',
    description: "",
    category: "admin",
    usage:"",
    accessableby: "Admins",
    aliases: []
};