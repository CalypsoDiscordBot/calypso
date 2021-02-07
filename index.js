const Discord = require('discord.js');
const client = new Discord.Client({
	autoReconnect: true,
	messageCacheMaxSize: 10000,
	messageCacheLifetime: 86400,
	messageSweepInterval: 60,
	retryLimit: 5,
	disableMentions: 'everyone',
	fetchAllMembers: false
});
const config = require('./config.json');
const util = require("util");
const fs = require("fs");
const readdir = util.promisify(fs.readdir);
const { GiveawaysManager } = require('discord-giveaways');
const DBL = require('dblapi.js');
const { Player } = require("discord-music-player");

client.player = new Player(
	client, 
	{
		leaveOnEmpty: true,
		leaveOnEnd: true,
		timeout: 15000,
		quality: 'high'
	}
);
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.servers = new Map();

const dbl = new DBL(config.DBLToken, { webhookPort: 5000 , webhookAuth: config.DBLPassword });

dbl.webhook.on('ready', hook => {
	console.log(`Webhook running at http://${hook.hostname}:${hook.port}${hook.path}`);
});
dbl.webhook.on('vote', vote => {
	dbl.getUser(vote.user).then(user => {
		var desc = `**${user.username}#${user.discriminator}** has just voted for **Calypso**, vote for the bot [here](https://top.gg/bot/740539000615469106/vote) !`;
		const embed = new Discord.MessageEmbed()
        	.setColor(config.color)
       		.setDescription(desc)
   		return client.channels.cache.get('782384076833292350').send(embed);
	});
});
    
setInterval(() => {
    dbl.postStats(client.guilds.cache.size);
}, 10000);

const init = async () => {
//
// GIVEAWAYS
//
const GiveawayManagerWithShardSupport = class extends GiveawaysManager {
	// Refresh storage method is called when the database is updated on one of the shards
	async refreshStorage(){
		// This should make all shard refreshing their cache with the updated database
		// return client.shard.broadcastEval(() => this.giveawaysManager.getAllGiveaways());
	}
};
const manager = new GiveawayManagerWithShardSupport(client, {
	storage: './giveaways.json',
	updateCountdownEvery: 5000,
	default: {
		botsCanWin: false,
		exemptPermissions: [ 
			// "MANAGE_MESSAGES", "ADMINISTRATOR" 
		],
		embedColor: '#FF0000',
		reaction: '🎉'
	}
});
// eslint-disable-next-line no-const-assign
client.giveawaysManager = manager;

let directories = await readdir("./Commandes/");
directories.forEach(async (dir) => {
    let commands = await readdir("./Commandes/"+dir+"/");
    commands.filter(f => f.split('.').pop() === 'js').forEach((f) => {
        try {
            let commande = require(`./Commandes/${dir}/${f}`);
            console.log(`${f} commande chargée !`);
            client.commands.set(commande.help.name, commande);
            commande.help.aliases.forEach(alias => {
                client.aliases.set(alias, commande.help.name);
            })
            return false;
        } catch (e) {
            return `Unable to load command ${f}: ${e}`;
        }
    });
});

fs.readdir('./Events/', (error, f) => {
    if (error) { return console.error(error); }
    console.log(`${f.length} events chargés`);

    f.forEach((f) => {
        let events = require(`./Events/${f}`);
        let event = f.split('.')[0];
        client.on(event, events.bind(null, client));
    });
});

client.setMaxListeners(0);
client.login(config.token);

};

init();