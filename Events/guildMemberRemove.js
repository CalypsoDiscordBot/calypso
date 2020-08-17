const db = require('quick.db');
const config = require('../config.json');

module.exports = (client, member) => {
	let farewellchannel = db.fetch(`farewell_channel_${member.guild.id}`);
	// const farewellrole = db.fetch(`farewell_role_${member.guild.id}`);
	let farewellmessage = db.fetch(`farewell_message_${member.guild.id}`);

	if (!farewellchannel) { return; }

	const guild = client.guilds.cache.get(member.guild.id); // ID serveur
	const userCount = guild.memberCount;

	// if (farewellrole) {
	// 	const role = member.guild.roles.cache.find((c) => c.id === farewellrole);
	// 	member.roles.add(role);
	// }

	var mapObj = {
		"%mention%":member.user,
		"%username%":member.user.username,
		"%tag%":member.user.tag,
		"%server%":member.guild.name
	 
	 };
	 var re = new RegExp(Object.keys(mapObj).join("|"),"gi");
	 farewellmessage = farewellmessage.replace(re, function(matched){
	   return mapObj[matched.toLowerCase()];
	 });

	if(farewellchannel.toLowerCase() === "dm"){
		member.user.send(farewellmessage);
	}
	member.guild.channels.cache.get(farewellchannel).send(farewellmessage);
};
