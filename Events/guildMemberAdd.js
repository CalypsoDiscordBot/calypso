const db = require('quick.db');
const config = require('../config.json');

module.exports = async (client, member) => {
	let greetingchannel = db.fetch(`greeting_channel_${member.guild.id}`);
	// const greetingrole = db.fetch(`greeting_role_${member.guild.id}`);
	let greetingmessage = db.fetch(`greeting_message_${member.guild.id}`);

	if (!greetingchannel) { return; }

	// if (greetingrole) {
	// 	const role = member.guild.roles.cache.find((c) => c.id === greetingrole);
	// 	member.roles.add(role);
	// }
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
