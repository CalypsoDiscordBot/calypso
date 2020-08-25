const Discord = require("discord.js");
const db = require('quick.db');
const config = require('../config.json');

module.exports.run = async (client, message, args) => {
	if(!message.member.hasPermission('ADMINISTRATOR')) {return;}

	const name = args.join(" ")

	if (!name) {
        let content = ["membercount"];
		return client.commands.get("help").run(client, message, content);
	}

	if(name.toLowerCase() === "disable"){
		let channelid = db.fetch(`memberCountChannel_${message.guild.id}`);
		let channel = client.channels.cache.get(channelid);
		if(!channel){
			const embed = new Discord.MessageEmbed()
			.setColor(config.color)
			.setDescription("❌ There is no MemberCount channel on your server.")
			return message.channel.send(embed);
		}
		message.channel.send('The MemberCount channel will be deleted in 5 seconds!').then (function (data){
			data.react('✅');
			db.delete(`memberCountChannel_${message.guild.id}`);
			db.delete(`memberCountName_${message.guild.id}`);
			channel.delete();
			data.delete({ timeout: 5000 });
		});
	}
	else {
		let channelid = db.fetch(`memberCountChannel_${message.guild.id}`);
		let channel = client.channels.cache.get(channelid);
		if(channel){
			const embed = new Discord.MessageEmbed()
			.setColor(config.color)
			.setDescription("❌ You must first disable the previous MemberCount channel.")
			return message.channel.send(embed);
		}
		message.channel.send('The MemberCount channel will be created in 5 seconds!').then (function (data){
			data.react('✅');
			message.guild.members.fetch().then((g) => {
				var count = g.filter(member => !member.user.bot).size;  
				message.guild.channels.create(name.replace(/%count%/g, count), {
					type: 'voice',
					permissionOverwrites: [
						{
							id: message.guild.roles.everyone,
							deny: ['SEND_MESSAGES'],
							allow:['VIEW_CHANNEL'],
						}
					]
				}).then(c => {
					db.set(`memberCountChannel_${message.guild.id}`,c.id);
					db.set(`memberCountName_${message.guild.id}`, name);
				});
			});
			data.delete({ timeout: 5000 });
		});
	}
    
};

module.exports.help = {
    name: 'membercount',
    description: "Display the number of members in a channel.\n\nExemples:\n`%prefix%membercount %count% Members` - Display `142 Members`\n`%prefix%membercount disable` - Disable the membercount.",
    category: "settings",
    usage:"<channelname>",
    accessableby: "Admin", // ?
    aliases: []
};