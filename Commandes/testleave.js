const Discord = require('discord.js');
const config = require('../config.json');
const db = require('quick.db');

module.exports.run = async (client, message, args) => {

    if(!message.member.hasPermission("ADMINISTRATOR")) {return;}

	let farewellchannel = db.fetch(`farewell_channel_${message.member.guild.id}`);
    let farewellmessage = db.fetch(`farewell_message_${message.member.guild.id}`);
    
    if(!farewellchannel){
        var embed = new Discord.MessageEmbed()
            .setTitle(':x: Error')
            .setDescription("You didn't configured the leave messages.")
            .setFooter(`Calypso`, client.user.displayAvatarURL())
            .setTimestamp()
        return message.channel.send(embed)
    }
    let memberCount;
	await message.member.guild.members.fetch().then((g) => {
		memberCount = g.filter((member) => !member.user.bot).size;
    });

	var mapObj = {
		"%member_name%": message.member.user.username,
		"%member_tag%": message.member.user.tag,
		"%membercount%": memberCount,
		"%server%": message.member.guild.name
	
	};
	var re = new RegExp(Object.keys(mapObj).join("|"),"gi");
	farewellmessage = farewellmessage.replace(re, function(matched){
	  return mapObj[matched.toLowerCase()];
    });
    
    var embed = new Discord.MessageEmbed()
        .setTitle('Test leave messages.')
        .setDescription(farewellmessage)
        .setFooter(`Calypso`, client.user.displayAvatarURL())
        .setTimestamp()
    message.channel.send(embed)
};

module.exports.help = {
    name: 'testleave',
    description: "Test leave messages.",
    category: "settings",
    usage:"",
    accessableby: "Admin",
    aliases: ['testfarewell']
};