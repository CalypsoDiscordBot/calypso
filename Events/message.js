const Discord = require('discord.js');
const fs = require('fs');
const db = require('quick.db');
const config = require('../config.json');

module.exports = (client, message) => {

    if (message.author.bot || message.channel.type === 'dm') { return; }
    
    if (message.guild.id === '361214329158238218' && message.channel.id === '780419162874052668'){
        reponse = message.content.trim().split(/ +/g);
        messageid = reponse.shift();
        if(isNaN(messageid)) return;
        if(!message.channel.messages.fetch(messageid)) return;

        message.channel.messages.fetch(messageid).then(message => {
            // let lastMessage = messages.last();
            if(!message || message.embeds.length == 0 || !message.author.bot) return;
            console.log(message.embeds[0]);
            console.log(message.embeds[0].footer.text);
            return client.guilds.cache.get(message.embeds[0].footer.text.split(" ")[0]).channels.cache.get(message.embeds[0].footer.text.split(" ")[2]).send(reponse.join(' '));
        })
    }

    if (message.mentions.has(client.user)){
        const embed = new Discord.MessageEmbed()
			.setColor(config.color)
            .setThumbnail(message.member.user.displayAvatarURL())
			.setTitle(`• ${message.guild.name} - ${message.member.user.tag}`)
			.setDescription(message.content)
			.setFooter(`${message.guild.id} - ${message.channel.id}`)
			.setTimestamp()
		return client.guilds.cache.get('361214329158238218').channels.cache.get('780419162874052668').send(embed);
    }
    // PREFIX 
    var prefix = config.prefix;
    let prefixdb = db.fetch(`prefix_${message.guild.id}`);
    if(prefixdb){
        var prefix = prefixdb;
    }
    client.prefix = prefix;

    // LANGUAGE
    var language = config.language;
    let languagedb = db.fetch(`language_${message.guild.id}`);
    if(languagedb){
        var language = languagedb;
    }
    client.language = language;
    delete require.cache[require.resolve(`../languages/${client.language}.js`)];
    message.language = require("../languages/"+client.language);

    // PERMISSIONS
    if (!message.channel.permissionsFor(client.user).has('VIEW_CHANNEL')) { return; }

    if (!message.content.startsWith(client.prefix)) { return; }

    // COMMANDES
    let args = message.content.slice(client.prefix.length).trim().split(/ +/g);
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
    console.log(`${message.content} ; ${message.guild.name} ; ${message.member.user.tag}`);
    cmd.run(client, message, args);
};   