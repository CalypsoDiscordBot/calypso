const Discord = require('discord.js');
const db = require('quick.db');

module.exports =async (client, guild) => {

	let msg = '';
	db.all().forEach((element) => {
		const dbguild = element.ID.includes(guild.id);
		// ${mentionedUser.id}
		if (!dbguild) {return;}
		db.delete(element.ID);
		msg += element.ID+" : "+element.data+"\n";
	});
	console.log(msg);

	var count = 0;
	await client.guilds.cache.forEach(async (guild) => {
		let users = 0;
		await guild.members.fetch().then((g) => {
			users = g.filter((member) => !member.user.bot).size;
		});
		count += users;
		const statuts = [
			'Calypso Bot | !help',
			'Calypso v0.1 Bêta',
			`${client.guilds.cache.size} Servers`,
			`${count} Members`,
    	];
		client.membercount = count;
		let i = 0;
		const statut = statuts[i++ % statuts.length];

 	});
	console.log(`${client.membercount} Members ${client.channels.cache.size} Channels ${client.guilds.cache.size} Servers.`);

	const Alex = client.users.cache.get('334786552964186123');
	const Itek = client.users.cache.get('216607323035009025');
	const Haz = client.users.cache.get('278608007535919115');

	let icon = null;
	if(guild.iconURL()){
		let icon = guild.iconURL({ format: 'png', dynamic: true, size: 1024 });
		if(guild.iconURL().includes("gif")){
			icon = guild.iconURL({ format: 'gif', dynamic: true, size: 1024 });
		}
	}

	let guildusers = 0;
	await guild.members.fetch().then((g) => {
		guildusers = g.filter((member) => !member.user.bot).size;
	});

	const embed = new Discord.MessageEmbed()
		.setThumbnail(icon)
		.setTitle('A quitté un Serveur Discord !')
		.setColor('#dc322f')
		.addField('Serveur : ', guild.name)
		.addField('Propriétaire : ', guild.owner.user.tag)
		.addField('Users : ', guildusers || guild.members.cache.size);

	Alex.send(embed);
	Itek.send(embed);
	Haz.send(embed);
};
