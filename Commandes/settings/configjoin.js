const Discord = require('discord.js');
const config = require('../../config.json');
const db = require('quick.db');

module.exports.run = (client, message, args) => {

    if(!message.guild.me.hasPermission("MANAGE_MESSAGES")) {
    const embed = new Discord.MessageEmbed()
        .setColor(client.color)
        .setDescription(message.language.errors.missingPerms(["MANAGE_MESSAGES"]))
    return message.channel.send(embed);
    }
    if(!message.member.hasPermission("ADMINISTRATOR")) {
        const embed = new Discord.MessageEmbed()
            .setColor(client.color)
            .setDescription(message.language.errors.permLevel("ADMINISTRATOR"))
        return message.channel.send(embed);
    }

	let greetingchannel = db.fetch(`greeting_channel_${message.guild.id}`);
	let greetingtype = db.fetch(`greeting_type_${message.guild.id}`);
	let greetingmessage = db.fetch(`greeting_message_${message.guild.id}`);

    if(!args[0] || (args[0].toLowerCase() !== "message" && args[0].toLowerCase() !== "embed" && args[0].toLowerCase() !== "disable")){
        let content = ["configjoin"];
        return client.commands.get("help").run(client, message, content);
    }

    if(args[0].toLowerCase() === "disable"){
        db.delete(`greeting_channel_${message.guild.id}`);
        db.delete(`greeting_message_${message.guild.id}`);
        db.delete(`greeting_type_${message.guild.id}`);
        const embed = new Discord.MessageEmbed()
            .setColor(client.color)
            .setDescription(message.language.configjoin.off())
        return message.channel.send(embed);
    }
    else if(args[1].toLowerCase() === "dm" && args[2]){
        db.set(`greeting_channel_${message.guild.id}`, "dm");
        db.set(`greeting_message_${message.guild.id}`, args.slice(2).join(' '));
        db.set(`greeting_type_${message.guild.id}`, args[0].toLowerCase());
        const embed = new Discord.MessageEmbed()
            .setColor(client.color)
            .setDescription(message.language.configjoin.on())
        return message.channel.send(embed);
    }
    else if(args[1] && args[2]){
        let greetingchannel = message.mentions.channels.first() || message.guild.channels.cache.find(channel => channel.name === args[1]);
        if(!greetingchannel){
            const embed = new Discord.MessageEmbed()
                .setColor(client.color)
                .setDescription(message.language.errors.channel())
            return message.channel.send(embed);
        }
        db.set(`greeting_channel_${message.guild.id}`, greetingchannel.id);
        db.set(`greeting_message_${message.guild.id}`, args.slice(2).join(' '));
        db.set(`greeting_type_${message.guild.id}`, args[0].toLowerCase());
        const embed = new Discord.MessageEmbed()
            .setColor(client.color)
            .setDescription(message.language.configjoin.on())
        return message.channel.send(embed);
    }

};

module.exports.help = {
    name: 'configjoin',
    description: "Sets a welcome message for the server.\n\n Examples: \n`%prefix%configjoin message #general Welcome %member% to %server%!` - Sends `Welcome @alex to <your server name>!` to #general when alex joins your server. \n`%prefix%greeting dm Welcome %username%!` - Welcomes a user to your server in direct messages. \n`%prefix%greeting disable` - Disables the greeting.",
    category: "settings",
    usage:"<message|embed> <channel|dm> [text]",
    accessableby: "Admin",
    aliases: ['greeting']
};