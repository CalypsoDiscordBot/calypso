const Discord = require('discord.js');
const config = require('../config.json');
const db = require('quick.db');

module.exports.run = (client, message, args) => {

    if(!message.member.hasPermission("ADMINISTRATOR")) {return;}

    let farewellchannel = db.fetch(`farewell_channel_${message.guild.id}`);
	let farewellmessage = db.fetch(`farewell_message_${message.guild.id}`);

    if(!args[0]){
        let content = ["farewell"];
        client.commands.get("help").run(client, message, content);
    }
    else if(args[0].toLowerCase() === "disable"){
        db.delete(`farewell_channel_${message.guild.id}`);
        db.delete(`farewell_message_${message.guild.id}`);
        message.channel.send("Successfully disabled the farewell.");
    }
    else if(args[0].toLowerCase() === "dm" && args[1]){
        db.set(`farewell_channel_${message.guild.id}`, "dm");
        db.set(`farewell_message_${message.guild.id}`, args.slice(1).join(' '));
        message.channel.send("Successfully set the farewell.");
    }
    else if(args[0] && args[1]){
        let farewellchannel = message.mentions.channels.first() || message.guild.channels.cache.find(channel => channel.name === args[0]);
        if(!farewellchannel){return message.channel.send("Unable to resolve the channel argument.")}
        db.set(`farewell_channel_${message.guild.id}`, farewellchannel.id);
        db.set(`farewell_message_${message.guild.id}`, args.slice(1).join(' '));
        message.channel.send("Successfully set the farewell.");
    }
};

module.exports.help = {
    name: 'farewell',
    description: "Sets a message for when a user leaves the server. \n\nExamples: \n`%prefix%farewell #general %username% left %server%... bye bye %username%...` - Sends `alex left <your server>... bye bye alex...` to #general when alex leaves your server. \n`%prefix%farewell disable` - Disables the farewell",
    category: "settings",
    usage:"<channel> [text]",
    accessableby: "Admin",
    aliases: []
};