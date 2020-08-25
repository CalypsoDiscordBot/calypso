const db = require('quick.db');
const config = require('../config.json');

module.exports = async (client, member) => {

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

	// GREETING
	let greetingchannel = db.fetch(`greeting_channel_${member.guild.id}`);
	// const greetingrole = db.fetch(`greeting_role_${member.guild.id}`);
	let greetingmessage = db.fetch(`greeting_message_${member.guild.id}`);

	if (!greetingchannel) { return; }

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
	member.guild.channels.cache.get(greetingchannel).send(greetingmessage);
};
