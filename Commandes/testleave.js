const Discord = require('discord.js');
const config = require('../config.json');
const db = require('quick.db');

module.exports.run = (client, message, args) => {

    if(!message.member.hasPermission("ADMINISTRATOR")) {return;}

	let farewellmessage = db.fetch(`farewell_message_${member.guild.id}`);

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