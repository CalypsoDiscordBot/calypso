const Discord = require('discord.js');
const config = require('../../config.json');
const db = require('quick.db');

module.exports.run = (client, message, args) => {

    if(!message.guild.me.hasPermission("MANAGE_MESSAGES")) {
    const embed = new Discord.MessageEmbed()
        .setColor(config.color)
        .setDescription(message.language.errors.missingPerms(["MANAGE_MESSAGES"]))
    return message.channel.send(embed);
    }
    if(!message.member.hasPermission("ADMINISTRATOR")) {
        const embed = new Discord.MessageEmbed()
            .setColor(config.color)
            .setDescription(message.language.errors.permLevel("ADMINISTRATOR"))
        return message.channel.send(embed);
    }

    let farewellchannel = db.fetch(`farewell_channel_${message.guild.id}`);
	let farewellmessage = db.fetch(`farewell_message_${message.guild.id}`);
	let farewelltype = db.fetch(`farewell_type_${message.guild.id}`);

    if(!args[0] || (args[0].toLowerCase() !== "message" && args[0].toLowerCase() !== "embed")){
        let content = ["configleave"];
        return client.commands.get("help").run(client, message, content);
    }

    if(args[0].toLowerCase() === "disable"){
        db.delete(`farewell_channel_${message.guild.id}`);
        db.delete(`farewell_message_${message.guild.id}`);
        db.delete(`farewell_type_${message.guild.id}`);
        const embed = new Discord.MessageEmbed()
            .setColor(config.color)
            .setDescription(message.language.configleave.off())
        return message.channel.send(embed);
    }
    else if(args[1].toLowerCase() === "dm" && args[2]){
        db.set(`farewell_channel_${message.guild.id}`, "dm");
        db.set(`farewell_message_${message.guild.id}`, args.slice(2).join(' '));
        db.set(`farewell_type_${message.guild.id}`, args[0].toLowerCase());
        const embed = new Discord.MessageEmbed()
            .setColor(config.color)
            .setDescription(message.language.configleave.on())
        return message.channel.send(embed);
    }
    else if(args[1] && args[2]){
        let farewellchannel = message.mentions.channels.first() || message.guild.channels.cache.find(channel => channel.name === args[1]);
        if(!farewellchannel){
            const embed = new Discord.MessageEmbed()
                .setColor(config.color)
                .setDescription(message.language.errors.channel())
            return message.channel.send(embed);
        }
        db.set(`farewell_channel_${message.guild.id}`, farewellchannel.id);
        db.set(`farewell_message_${message.guild.id}`, args.slice(2).join(' '));
        db.set(`farewell_type_${message.guild.id}`, args[0].toLowerCase());
        const embed = new Discord.MessageEmbed()
            .setColor(config.color)
            .setDescription(message.language.configleave.on())
        return message.channel.send(embed);
    }
};

module.exports.help = {
    name: 'configleave',
    description: "Sets a message for when a user leaves the server. \n\nExamples: \n`%prefix%farewell message #general %member_name% left %server%... bye bye %member_name%...` - Sends `alex left <your server>... bye bye alex...` to #general when alex leaves your server. \n`%prefix%farewell disable` - Disables the farewell",
    category: "settings",
    usage:"<message|embed> <channel|dm> [text]",
    accessableby: "Admin",
    aliases: ['farewell']
};