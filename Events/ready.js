const db = require('quick.db');
const formatDate = require('dateformat');
const config = require('../config.json');
const Discord = require("discord.js");
const { MessageButton, MessageActionRow } = require('discord-buttons');

module.exports = async(client) => {

	// const alex = await client.guilds.cache.get("740540647756398653").members.fetch("334786552964186123");
	// alex.send("Restarting...");

	let i = 0;
	var count = 0;
	client.guilds.cache.forEach(async (guild) => {
		i++;
		let users = 0;
		await guild.members.fetch().then((g) => {
			users = g.filter((member) => !member.user.bot).size;
		});
		count += users;
		client.membercount = count;
		if((i) == client.guilds.cache.size){
			console.log(`${count} Members ${client.channels.cache.size} Channels ${client.guilds.cache.size} Servers.`)
		}
	});
	
  	setInterval(() => {
		const activity = `calypso-bot.xyz | !help`; // | ${client.guilds.cache.size} Servers. ${client.membercount} Members  
		client.user.setActivity(activity, { type: 'WATCHING' });
	}, 10000);

	setInterval(() => {
		db.all().forEach( async (element) => {
			const playerdb = element.ID.startsWith(`musicplayer_`);
			if (!playerdb) {return;}

			const guild = client.guilds.cache.get(element.ID.split('_')[1]);
			const channel = guild.channels.cache.get(element.ID.split('_')[2]);
			if(!channel) {return db.delete(element.ID);}

			let player_id = await db.fetch(`musicplayer_${guild.id}_${channel.id}`);
			if(player_id){
				let player_message = await channel.messages.fetch(player_id)
				if(player_message){
					let isPlaying = client.player.isPlaying(player_message);
					if(!isPlaying){
						player_message.edit({embed: player_message.embeds[0]});
						return db.delete(`musicplayer_${player_message.guild.id}_${player_message.channel.id}`);
					}

					let song = await client.player.nowPlaying(player_message);
					player_message.language = require("../languages/"+client.language);
					// console.log(player_message)
					
					let button_resume = new MessageButton()
						.setStyle("blurple")
						.setEmoji("852294253659815936")
						.setID("music_resume")
					let button_skip = new MessageButton()
						.setStyle("blurple")
						.setEmoji("852294265803243561")
						.setID("music_skip")
					let button_volumedown = new MessageButton()
						.setStyle("blurple")
						.setEmoji("852311672650727494")
						.setID("music_volumedown")
					let button_volumeup = new MessageButton()
						.setStyle("blurple")
						.setEmoji("852311661497942087")
						.setID("music_volumeup")
					let button_loop = new MessageButton()
						.setStyle("blurple")
						.setEmoji("852294329375916052")
						.setID("music_loop")

					let queue = await client.player.getQueue(player_message);
					if(queue.dispatcher.paused) {
						await button_resume.setEmoji("852290408825356298")
					}
					if(queue.repeatMode){
						await button_loop.setEmoji("852320829232381972")
					}
			
					let buttonRow = new MessageActionRow()
						.addComponent(button_resume)
						.addComponent(button_skip)
						.addComponent(button_volumedown)
						.addComponent(button_volumeup)
						.addComponent(button_loop)
					player_message.edit({
					components: buttonRow,
					embed: {
						color: client.color,
						author: song.author || "None.",
						title: song.name,
						url: song.url,
						thumbnail: {
							url: song.thumbnail
						},
						fields: [
							{
								name: 'Progression',
								value: client.player.createProgressBar(player_message,{
									size: 15,
									block: '▬',
									arrow: '🔵'
								}),
								inline: false
							},
							{
								name: player_message.language.play.requested(),
								value: song.requestedBy,
								inline: true
							},
							{
								name: 'Volume',
								value: client.player.getVolume(player_message),
								inline: true
							}]
					}});
				} else {
					return db.delete(`musicplayer_${player_message.guild.id}_${player_message.channel.id}`);
				}
			}
		});
	}, 5000)

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
				if(!guild) return;
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