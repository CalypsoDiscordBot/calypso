const Discord = require('discord.js');
const config = require('../config.json');
const db = require('quick.db');

module.exports.run = (client, message, args) => {

    if(!message.member.hasPermission("ADMINISTRATOR")) {return;}

	let greetingchannel = db.fetch(`greeting_channel_${message.guild.id}`);
	let greetingmessage = db.fetch(`greeting_message_${message.guild.id}`);

    if(!args[0]){
        let content = ["greeting"];
        client.commands.get("help").run(client, message, content);
    }
    else if(args[0].toLowerCase() === "disable"){
        db.delete(`greeting_channel_${message.guild.id}`);
        db.delete(`greeting_message_${message.guild.id}`);
        message.channel.send("Successfully disabled the greeting.");
    }
    else if(args[0].toLowerCase() === "dm" && args[1]){
        db.set(`greeting_channel_${message.guild.id}`, "dm");
        db.set(`greeting_message_${message.guild.id}`, args.slice(1).join(' '));
        message.channel.send("Successfully set the greeting.");
    }
    else if(args[0] && args[1]){
        let greetingchannel = message.mentions.channels.first() || message.guild.channels.cache.find(channel => channel.name === args[0]);
        if(!greetingchannel){return message.channel.send("Unable to resolve the channel argument.")}
        db.set(`greeting_channel_${message.guild.id}`, greetingchannel.id);
        db.set(`greeting_message_${message.guild.id}`, args.slice(1).join(' '));
        message.channel.send("Successfully set the greeting.");
    }

};

module.exports.help = {
    name: 'greeting',
    description: "Sets a welcome message for the server.\n\n Examples: \n`%prefix%greeting #general Welcome %mention% to %server%!` - Sends `Welcome @alex to <your server name>!` to #general when alex joins your server. \n`%prefix%greeting dm Welcome %username%!` - Welcomes a user to your server in direct messages. \n`%prefix%greeting disable` - Disables the greeting.",
    category: "settings",
    usage:"<channel> [text]",
    accessableby: "Admin",
    aliases: []
};