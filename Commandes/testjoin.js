const Discord = require('discord.js');
const config = require('../config.json');
const db = require('quick.db');

module.exports.run = (client, message, args) => {

    if(!message.member.hasPermission("ADMINISTRATOR")) {return;}

	let greetingchannel = db.fetch(`greeting_channel_${message.member.guild.id}`);
	let greetingmessage = db.fetch(`greeting_message_${message.member.guild.id}`);

    if(!greetingchannel){
        var embed = new Discord.MessageEmbed()
            .setTitle(':x: Error')
            .setDescription("You didn't configured the welcome messages.")
            .setFooter(`Calypso`, client.user.displayAvatarURL())
            .setTimestamp()
        return message.channel.send(embed)
    }
    var mapObj = {
		"%mention%": message.member.user,
		"%username%": message.member.user.username,
		"%tag%": message.member.user.tag,
		"%server%": message.member.guild.name
	  
	 };
	 var re = new RegExp(Object.keys(mapObj).join("|"),"gi");
	 greetingmessage = greetingmessage.replace(re, function(matched){
	   return mapObj[matched.toLowerCase()];
     });
     
    var embed = new Discord.MessageEmbed()
        .setTitle('Test welcome messages.')
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