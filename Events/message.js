const Discord = require('discord.js');
const fs = require('fs');
const config = require('../config.json');

module.exports = (client, message) => {

    if (message.author.bot || message.channel.type === 'dm') { return; }
    if (!message.channel.permissionsFor(client.user).has('VIEW_CHANNEL')) { return; }

    if (!message.content.startsWith(config.prefix)) { return; }

        let args = message.content.slice(config.prefix.length).trim().split(/ +/g);
        let commande = args.shift();
        
        let cmd;
        if(client.commands.has(commande)){
            cmd = client.commands.get(commande);
        } else{
            cmd = client.commands.get(client.aliases.get(commande));
        }
        if (!cmd) { return; }
        cmd.run(client, message, args);
};   