const db = require('quick.db');
const config = require('../config.json');

module.exports = (client, member) => {
	let greetingchannel = db.fetch(`greeting_channel_${member.guild.id}`);
	// const greetingrole = db.fetch(`greeting_role_${member.guild.id}`);
	let greetingmessage = db.fetch(`greeting_message_${member.guild.id}`);

	if (!greetingchannel) { return; }

	const guild = client.guilds.cache.get(member.guild.id); // ID serveur
	const userCount = guild.memberCount;

	// if (greetingrole) {
	// 	const role = member.guild.roles.cache.find((c) => c.id === greetingrole);
	// 	member.roles.add(role);
	// }

	var mapObj = {
		"%mention%":member.user,
		"%username%":member.user.username,
		"%tag%":member.user.tag,
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
