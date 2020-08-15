const Discord = require('discord.js');
const fs = require('fs');
const db = require('quick.db');
const config = require('../config.json');

module.exports = (client, message) => {

    // PREFIX 
    
    let prefix = db.fetch(`prefix_${message.guild.id}`);
    if(!prefix){
        let prefix = config.prefix;
    }
    client.prefix = prefix;

    if (message.author.bot || message.channel.type === 'dm') { return; }
    if (!message.channel.permissionsFor(client.user).has('VIEW_CHANNEL')) { return; }

    if (!message.content.startsWith(prefix)) { return; }

    let args = message.content.slice(prefix.length).trim().split(/ +/g);
    let commande = args.shift();
    
    let cmd;
    if(client.commands.has(commande)){
        cmd = client.commands.get(commande);
    } else{
        cmd = client.commands.get(client.aliases.get(commande));
    }
    if (!cmd) { return; }

    // ACCESSROLE
    const accessrole_id = db.fetch(`accessrole_${message.guild.id}`);
    if (accessrole_id){
        const accessrole = message.guild.roles.cache.find((c) => c.id === accessrole_id);
        if (accessrole){
            if (!message.member.roles.cache.has(accessrole_id)) { return; }
        }
        else {
            db.delete(`accessrole_${message.guild.id}`);
        }
    }
    // CHANNELTOGGLE
    const channeltoggle = db.fetch(`channeltoggle_${message.guild.id}_${message.channel.id}`);
    if (channeltoggle){
        if(channeltoggle === "Disable" && !message.member.hasPermission("ADMINISTRATOR")) { return; }
    }
    else {
        db.delete(`channeltoggle_${message.guild.id}_${message.channel.id}`);
    }

    cmd.run(client, message, args);
};   