const Discord = require('discord.js');

module.exports = (client, guild) => {
	let count = 0;
	client.guilds.cache.forEach(async (guild) => {
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
		console.log(`${count} Members ${client.channels.cache.size} Channels ${client.guilds.cache.size} Servers.`);
		let i = 0;
		setInterval(() => {
			const statut = statuts[i++ % statuts.length];
			client.user.setActivity(statut, { type: 'WATCHING' });
		}, 10000);
 	});

	const moi = client.users.cache.get('334786552964186123');

	const embed = new Discord.MessageEmbed()
		.setTitle('Nouveau Serveur Discord !')
		.setColor('#dc322f')
		.addField('Serveur : ', guild.name)
		.addField('Propriétaire : ', guild.owner.user.username)
		.addField('Users : ', guild.members.cache.size);

	moi.send(embed);
};
