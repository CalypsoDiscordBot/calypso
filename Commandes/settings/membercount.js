const Discord = require("discord.js");
const db = require('quick.db');
const config = require('../../config.json');

module.exports.run = async (client, message, args) => {

    if(!message.guild.me.hasPermission("MANAGE_CHANNELS")) {
    const embed = new Discord.MessageEmbed()
        .setColor(client.color)
        .setDescription(message.language.errors.missingPerms(["MANAGE_CHANNELS"]))
    return message.channel.send(embed);
    }
    if(!message.member.hasPermission("MANAGE_CHANNELS")) {
        const embed = new Discord.MessageEmbed()
            .setColor(client.color)
            .setDescription(message.language.errors.permLevel("MANAGE_CHANNELS"))
        return message.channel.send(embed);
    }

	const name = args.join(" ")

	if (!name) {
        let content = ["membercount"];
		return client.commands.get("help").run(client, message, content);
	}

	// DISABLE MEMBERCOUNT

	if(name.toLowerCase() === "disable"){
		let processed = 0;
		db.all().forEach((element) => {
			let membercount = element.ID.startsWith(`membercount_${message.guild.id}`);
			processed++;
			if (membercount) {
				const channel = client.channels.cache.get(element.ID.split('_')[2]);
				if(!channel){
					db.delete(element.ID);
					const embed = new Discord.MessageEmbed()
					.setColor(client.color)
					.setDescription(message.language.membercount.error_disable())
					return message.channel.send(embed);
				}
				const channelName = db.fetch(`membercount_${message.guild.id}_${channel.id}`);
				if(!channelName){
					channel.delete();
					return;
				}
				db.delete(`membercount_${message.guild.id}_${channel.id}`);
				channel.delete();
				const embed = new Discord.MessageEmbed()
				.setColor(client.color)
				.setDescription(message.language.membercount.off())
				return message.channel.send(embed);
			} 
			else if(processed >= db.all().length){
				if(!membercount){
					const embed = new Discord.MessageEmbed()
					.setColor(client.color)
					.setDescription(message.language.membercount.error_disable())
					return message.channel.send(embed);
				}
			}
		});
	} // ENABLE MEMBERCOUNT
	else {
		let processed = 0;
		db.all().forEach((element) => {
			const membercount = element.ID.startsWith(`membercount_${message.guild.id}`);
			processed++;
			if (membercount) {
				const channel = client.channels.cache.get(element.ID.split('_')[2]);
				if(channel){
					const embed = new Discord.MessageEmbed()
					.setColor(client.color)
					.setDescription(message.language.membercount.error_previous())
					return message.channel.send(embed);
				}
			}
			else if(processed >= db.all().length){
				if(!membercount){
					message.guild.members.fetch().then((g) => {
						var count = g.filter(member => !member.user.bot).size;  
						message.guild.channels.create(name.replace(/%count%/g, count), {
							type: 'voice',
							permissionOverwrites: [
								{
									id: message.guild.roles.everyone,
									deny: ['CONNECT'],
									allow:['VIEW_CHANNEL'],
								}
							]
						}).then(c => {
							db.set(`membercount_${message.guild.id}_${c.id}`, name);
						});
					});
					const embed = new Discord.MessageEmbed()
					.setColor(client.color)
					.setDescription(message.language.membercount.on())
					return message.channel.send(embed);
				}
			}
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