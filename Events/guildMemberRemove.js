const db = require('quick.db');
const config = require('../config.json');

module.exports = async (client, member) => {
	let farewellchannel = db.fetch(`farewell_channel_${member.guild.id}`);
	// const farewellrole = db.fetch(`farewell_role_${member.guild.id}`);
	let farewellmessage = db.fetch(`farewell_message_${member.guild.id}`);

	if (!farewellchannel) { return; }

	let memberCount;
	await member.guild.members.fetch().then((g) => {
		memberCount = g.filter((member) => !member.user.bot).size;
	});

	var mapObj = {
		"%member_name%":member.user.username,
		"%member_tag%":member.user.tag,
		"%membercount%":memberCount,
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
