const Discord = require('discord.js');
const fs = require('fs');
const db = require('quick.db');
const config = require('../config.json');

module.exports = (client, message) => {

    if (message.author.bot || message.channel.type === 'dm') { return; }
    if (!message.channel.permissionsFor(client.user).has('VIEW_CHANNEL')) { return; }

    if (!message.content.startsWith(config.prefix)) { return; }

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
    const channeltoggle_id = db.fetch(`channeltoggle_${message.guild.id}_${message.channel.id}`);
    if (channeltoggle_id){
        const channeltoggle = message.guild.channels.cache.find((c) => c.id === channeltoggle_id);
        if (channeltoggle) { 
            if(channeltoggle === "Disable") { return; }
        }
        else {
            db.delete(`channeltoggle_${message.guild.id}_${message.channel.id}`);
        }
    }


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