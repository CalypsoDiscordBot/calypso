const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.servers = new Map();
const config = require('./config.json');
const fs = require('fs');
const { GiveawaysManager } = require('discord-giveaways');

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

fs.readdir('./Commandes/', (error, f) => {
    if (error) { return console.error(error); }
    let commandes = f.filter(f => f.split('.').pop() === 'js');
    if (commandes.length <= 0) { return console.log('Aucune commande trouvée !'); }

    commandes.forEach((f) => {
        let commande = require(`./Commandes/${f}`);- 
        console.log(`${f} commande chargée !`);
        client.commands.set(commande.help.name, commande);
        commande.help.aliases.forEach(alias => {
            client.aliases.set(alias, commande.help.name);
        })
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

client.login(config.token);