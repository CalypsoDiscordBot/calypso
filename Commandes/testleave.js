const Discord = require('discord.js');
const config = require('../config.json');
const db = require('quick.db');

module.exports.run = (client, message, args) => {

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
    var mapObj = {
		"%mention%": message.member.user,
		"%username%": message.member.user.username,
		"%tag%": message.member.user.tag,
		"%server%": message.member.guild.name
	  
	 };
	 var re = new RegExp(Object.keys(mapObj).join("|"),"gi");
	 farewellmessage = farewellmessage.replace(re, function(matched){
	   return mapObj[matched.toLowerCase()];
     });
     
     var embed = new Discord.MessageEmbed()
         .setTitle('Test leave messages.')
         .setDescription(greetingmessage)
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