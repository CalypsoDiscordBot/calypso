const Discord = require('discord.js');

module.exports = async (client, guild) => {
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
		.setTitle('Nouveau Serveur Discord !')
		.setColor('#dc322f')
		.addField('Serveur : ', guild.name)
		.addField('Propriétaire : ', guild.owner.user.tag)
		.addField('Users : ', guildusers || guild.members.cache.size);

	Alex.send(embed);
	Haz.send(embed);
};
