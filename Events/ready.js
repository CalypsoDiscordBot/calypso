const db = require('quick.db');
const formatDate = require('dateformat');

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

	// UNBAN

	setInterval(() => {
		db.all().forEach((element) => {
			const sanctionsdb = element.ID.startsWith(`ban`);
			// ${mentionedUser.id}
			if (!sanctionsdb) {return;}

			let time = new Date().getTime();
			if(parseInt(element.data) <= time){
				const guild = client.guilds.cache.get(element.ID.split('_')[1]);
				const user_id = element.ID.split('_')[2];
				guild.fetchBans().then((bans) => {
                    if (bans.some(u => u.user.id === user_id)) {
						guild.members.unban(user_id).catch((err) => {
							console.log(err);
						});
						let count = 0;
						db.all().forEach((element) => {
							const sanctionsdb = element.ID.startsWith(`sanctions_${guild.id}_${user_id}`);
							if (!sanctionsdb) {
								return;
							}
							count++;
						});
						const now = new Date();
						db.set(`sanctions_${guild.id}_${user_id}_${count+1}`, `Unbanned [Ban Expired] | Time: ${formatDate(now, "mm/dd/yy HH:MM:ss")}`)
					}
					db.delete(element.ID);
                })
			}
		});
	}, 120000);

	// MemberCount

	setInterval(() => {
		db.all().forEach((element) => {
			const membercount = element.ID.startsWith('memberCountChannel');
			if (!membercount) {
				return;
			}
			const guild = client.guilds.cache.get(element.ID.split('_')[1]);
			const channelId = db.fetch(`memberCountChannel_${guild.id}`);
			const channelName = db.fetch(`memberCountName_${guild.id}`);
			const channel = client.channels.cache.get(channelId);
			if(!channel || !channelName){
				db.delete(`memberCountName_${guild.id}`);
				db.delete(`memberCountChannel_${guild.id}`);
				return;
			}
			guild.members.fetch().then((g) => {
				const count = g.filter((member) => !member.user.bot).size;
			});
			channel.setName(channelName.replace(/%count%/g, count));
		});
	}, 60000);

};