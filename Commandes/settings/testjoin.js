const Discord = require('discord.js');
const config = require('../../config.json');
const db = require('quick.db');

module.exports.run = async (client, message, args) => {
    
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

	let greetingchannel = db.fetch(`greeting_channel_${message.member.guild.id}`);
	let greetingmessage = db.fetch(`greeting_message_${message.member.guild.id}`);

    if(!greetingchannel){
        const embed = new Discord.MessageEmbed()
            .setColor(config.color)
            .setDescription(message.language.testjoin.error())
        return message.channel.send(embed);
    }
    let memberCount;
	await message.member.guild.members.fetch().then((g) => {
		memberCount = g.filter((member) => !member.user.bot).size;
	});

	var mapObj = {
		"%member%": message.member.user,
		"%member_name%": message.member.user.username,
		"%member_tag%": message.member.user.tag,
		"%membercount%": memberCount,
		"%server%": message.member.guild.name
	
	};
    var re = new RegExp(Object.keys(mapObj).join("|"),"gi");
    greetingmessage = greetingmessage.replace(re, function(matched){
    return mapObj[matched.toLowerCase()];
    });
    
    var embed = new Discord.MessageEmbed()
        .setTitle(message.language.testjoin.title())
        .setDescription(greetingmessage)
        .setFooter(`Calypso`, client.user.displayAvatarURL())
        .setTimestamp()
    message.channel.send(embed)
};

module.exports.help = {
    name: 'testjoin',
    description: "Test welcome messages.",
    category: "settings",
    usage:"",
    accessableby: "Admin",
    aliases: ['testfarewell']
};