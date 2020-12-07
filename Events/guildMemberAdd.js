const db = require('quick.db');
const config = require('../config.json');
const formatDate = require('dateformat');
const Discord = require("discord.js");

module.exports = async (client, member) => {

	// COLOR 
    var color = config.color;
    let colordb = db.fetch(`color_${member.guild.id}`);
    if(colordb){
        var color = colordb;
    }
	client.color = color;
	
	// AUTOROLE
	db.all().forEach((element) => {
		const autoroledb = element.ID.startsWith(`autorole_${member.guild.id}`);
		// ${mentionedUser.id}
		if (!autoroledb) {return;}
		if(element.data.toLowerCase() !== '"join"'){
            return db.delete(element.ID);
		}
		const role_id = element.ID.split('_')[2];
		const role = member.guild.roles.cache.find((c) => c.id === role_id);
		member.roles.add(role);
	});

	// CHECK MUTED ROLE
	db.all().forEach((element) => {
		const sanctionsdb = element.ID.startsWith(`mute_${member.guild.id}`);
		if (!sanctionsdb) {return;}

		let time = new Date().getTime();
		if(parseInt(element.data) > time){
			const user_id = element.ID.split('_')[2];
			if(member.id != user_id) {return;}

			let muted_role = db.fetch(`mutedrole_${member.guild.id}`);

			// CREER LE ROLE MUTE 
			if(!muted_role){
				console.log("create")
				muted_role = member.guild.roles.cache.find(role => role.name.toLowerCase().includes("muted"))
				if(!muted_role) {
					try {
						muted_role = member.guild.roles.create({
							data: {
								name: "Muted",
								color: "#000000",
								permissions:[]
							}
						}).then(role =>{
							db.set(`mutedrole_${member.guild.id}`, role.id)
						})
					} catch (error) {return;}
				} else {
					db.set(`mutedrole_${member.guild.id}`, muted_role.id)
				}
				guild.channels.cache.forEach((channel) => {
					channel.updateOverwrite(muted_role.id, {
						SEND_MESSAGES: false,
						ADD_REACTIONS: false,
						CONNECT: false
					}).catch((error) => {return;});
				});	
			}
			member.roles.add(muted_role);
		}
	});

	// GREETING
	let greetingchannel = db.fetch(`greeting_channel_${member.guild.id}`);
	// const greetingrole = db.fetch(`greeting_role_${member.guild.id}`);
	let greetingmessage = db.fetch(`greeting_message_${member.guild.id}`);
	let greetingtype = db.fetch(`greeting_type_${member.guild.id}`);

	if (!greetingchannel || !greetingmessage) { return; }

	let memberCount;
	await member.guild.members.fetch().then((g) => {
		memberCount = g.filter((member) => !member.user.bot).size;
	});

	var mapObj = {
		"%member%":member.user,
		"%member_name%":member.user.username,
		"%member_tag%":member.user.tag,
		"%membercount%":memberCount,
		"%server%":member.guild.name
	
	};
	var re = new RegExp(Object.keys(mapObj).join("|"),"gi");
	greetingmessage = greetingmessage.replace(re, function(matched){
	return mapObj[matched.toLowerCase()];
	});

	if(greetingchannel.toLowerCase() === "dm"){
		member.user.send(greetingmessage);
	}
	if(!greetingtype || greetingtype == "message"){
		return member.guild.channels.cache.get(greetingchannel).send(greetingmessage);
	}
	else if(greetingtype == "embed"){
		const embed = new Discord.MessageEmbed()
			.setColor(client.color)
            .setThumbnail(member.user.displayAvatarURL())
			.setTitle(`• ${member.guild.name}`)
			.setDescription(greetingmessage)
			.setFooter(member.guild.name)
			.setTimestamp()
		return member.guild.channels.cache.get(greetingchannel).send(embed);
	}
};
