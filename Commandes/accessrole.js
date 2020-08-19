const Discord = require('discord.js');
const config = require('../config.json');
const db = require('quick.db');

module.exports.run = (client, message, args) => {

    if(!message.member.hasPermission("ADMINISTRATOR")) {return;}

    let role = message.mentions.roles.first() || message.guild.roles.cache.find((c) => c.name === args[0]);

    if(!args[0]){
        let content = ["accessrole"];
        client.commands.get("help").run(client, message, content);
    }
    else if (args[0] === "disable"){
        db.delete(`accessrole_${message.guild.id}`);
        return message.channel.send("Successfully disabled the access role.")
    }
    
    if (role){
        db.set(`accessrole_${message.guild.id}`, role.id);
        return message.channel.send("Successfully set the access role.")
    }
    else{
        return message.channel.send("Unable to resolve the role argument.")
    }
};

module.exports.help = {
    name: 'accessrole',
    description: "Sets a role that people have to have to use the bot. Use `!accessrole disable` to disable",
    category: "settings",
    usage:"<role>",
    accessableby: "Admin",
    aliases: []
};