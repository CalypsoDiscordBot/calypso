module.exports = async(client) => {
  
  	client.user.setActivity("Starting...");

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
		client.membercount = count;
		let i = 0;
		const statut = statuts[i++ % statuts.length];

 	});
  	setInterval(() => {
		const activity = `${client.membercount} Members  ${client.guilds.cache.size} Servers.`;
		client.user.setActivity(activity, { type: 'WATCHING' });
	}, 10000);

};
