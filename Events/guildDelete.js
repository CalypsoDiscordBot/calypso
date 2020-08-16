const Discord = require('discord.js');

module.exports = (client, guild) => {
	let count = 0;
	client.guilds.cache.forEach(async (guild) => {
		let users = 0;
		await guild.members.fetch().then((g) => {
			users = g.filter((member) => !member.user.bot).size;
		});
		count += users;
		client.user.setActivity(`Développé par Alexmdz77 | Bêta | Serveurs : ${client.guilds.cache.size} | Users : ${count}`, { type: 'WATCHING' });
	});

	const moi = client.users.cache.get('334786552964186123');

	const embed = new Discord.MessageEmbed()
		.setTitle('A quitté un Serveur Discord !')
		.setColor('#dc322f')
		.addField('Serveur : ', guild.name)
		.addField('Propriétaire : ', guild.owner.user.username)
		.addField('Users : ', guild.members.cache.size);

	moi.send(embed);
};
