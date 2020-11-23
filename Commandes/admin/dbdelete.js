const Discord = require("discord.js");
const db = require('quick.db');

module.exports.run = (client, message, args) => {
    if (message.author.id !== '216607323035009025' && message.author.id !== '334786552964186123' && message.author.id !== '278608007535919115') { return; }
    else {
        if(!args[0]){return;}
        const dbname = db.fetch(args[0]);
        if(!dbname){message.channel.send(":x: db not found")}
        db.delete(args[0]);
        message.channel.send("Success")
    }
};

module.exports.help = {
    name: 'dbdelete',
    description: "",
    category: "admin",
    usage:"",
    accessableby: "Admins",
    aliases: []
};