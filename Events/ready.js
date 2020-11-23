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
		const activity = `!help | ${client.guilds.cache.size} Servers.`; // ${client.membercount} Members  
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

	// UNMUTE

	setInterval(() => {
		db.all().forEach((element) => {
			const sanctionsdb = element.ID.startsWith(`mute`);
			// ${mentionedUser.id}
			if (!sanctionsdb) {return;}

			let time = new Date().getTime();
			if(parseInt(element.data) <= time){
				const guild = client.guilds.cache.get(element.ID.split('_')[1]);
				const user_id = element.ID.split('_')[2];

				mentionedUser = guild.members.resolve(user_id);

				db.delete(element.ID);
				let muted_role = db.fetch(`mutedrole_${guild.id}`);

				// CREER LE ROLE MUTE 
				// if(!muted_role){
				// 	console.log("create")
				// 	muted_role = guild.roles.cache.find(role => role.name.toLowerCase().includes("muted"))
				// 	if(!muted_role) {
				// 		try {
				// 			muted_role = guild.roles.create({
				// 				data: {
				// 					name: "Muted",
				// 					color: "#000000",
				// 					permissions:[]
				// 				}
				// 			}).then(role =>{
				// 				db.set(`mutedrole_${guild.id}`, role.id)
				// 			})
				// 		} catch (error) {return;}
				// 	} else {
				// 		db.set(`mutedrole_${guild.id}`, muted_role.id)
				// 	}
				// 	guild.channels.cache.forEach((channel) => {
				// 		channel.updateOverwrite(muted_role.id, {
				// 			SEND_MESSAGES: false,
				// 			ADD_REACTIONS: false,
				// 			CONNECT: false
				// 		}).catch((error) => {return;});
				// 	});	
				// }
				mentionedUser.roles.remove(muted_role).catch((err) => {return;});

				let count = 0;
				db.all().forEach((element) => {
					const sanctionsdb = element.ID.startsWith(`sanctions_${guild.id}_${user_id}`);
					if (!sanctionsdb) {
						return;
					}
					count++;
				});
				const now = new Date();
				db.set(`sanctions_${guild.id}_${user_id}_${count+1}`, `Unmuted [Mute Expired] | Time: ${formatDate(now, "mm/dd/yy HH:MM:ss")}`)
			}
		});
	}, 1200);

	// MemberCount

	setInterval(() => {
		db.all().forEach((element) => {
			const membercount = element.ID.startsWith('membercount');
			if (!membercount) {
				return;
			}
			const guild = client.guilds.cache.get(element.ID.split('_')[1]);
			const channel = client.channels.cache.get(element.ID.split('_')[2]);
			if(!channel){
				db.delete(element.ID); 
				return;
			}
			const channelName = db.fetch(`membercount_${guild.id}_${channel.id}`);
			if(!channelName){
				channel.delete();
				return;
			}
			guild.members.fetch().then((g) => {
				const count = g.filter((member) => !member.user.bot).size;
				channel.setName(channelName.replace(/%count%/g, count));
			});
		});
	}, 60000);

};