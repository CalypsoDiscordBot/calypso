const Discord = require("discord.js");
const db = require('quick.db');

module.exports.run = (client, message, args) => {
    if (message.author.id !== '216607323035009025' && message.author.id !== '334786552964186123' && message.author.id !== '278608007535919115') { return; }
    else {
        let msg = '';
		db.all().forEach((element) => {
            msg += element.ID+" : "+element.data+"\n";
        })
        console.log(msg);
    }
};

module.exports.help = {
    name: 'dbshow',
    description: "",
    category: "admin",
    usage:"",
    accessableby: "Admins",
    aliases: []
};