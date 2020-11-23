const Discord = require('discord.js');
const fs = require('fs');

let snekfetch = require("snekfetch");

const config = require('../config.json');
const db = require("quick.db");

module.exports = (client) => {

client.once('raw', payload => {

    if(payload.t === 'MESSAGE_REACTION_ADD') {

        messageticket = db.fetch(`messageticket_${payload.d.guild_id}`);
        categorie = db.fetch(`categorie_${payload.d.guild_id}`);

        rolesupport = db.fetch(`rolesupport_${payload.d.guild_id}`);
        
        let channel = client.channels.cache.get(payload.d.channel_id) // Get channel object.


       if(payload.d.emoji.name === '📝' && payload.d.message_id === messageticket)
       {
            channel.messages.fetch(payload.d.message_id)
            .then(msg => {
                let reaction = msg.reactions.cache.get('📝');
                let user = client.users.cache.get(payload.d.user_id);
    
                let name = user.username.toLowerCase().replace(/([^a-z0-9]+)/gi, '');
                
                msg.reactions.resolve(reaction).users.remove(user.id);

                // LANGUAGE
                var language = config.language;
                let languagedb = db.fetch(`language_${reaction.message.guild.id}`);
                if(languagedb){
                    var language = languagedb;
                }
                client.language = language;
                delete require.cache[require.resolve(`../languages/${client.language}.js`)];
                reaction.message.language = require("../languages/"+client.language);

                 // Check if ticket existant
                 if (reaction.message.guild.channels.cache.some(c => c.topic && c.topic.includes(user.id) ))
                           {return channel.send(reaction.message.language.ticket.raw.active()).then(msg => {
                               msg.delete({ timeout: 2000 })
                             })}

                console.log("Ticket de "+user.tag);
                //  Création du ticket
                //  let category = client.channels.cache.find(c => c.id === categorie && c.type == "category")
                //  let role1 = reaction.message.guild.roles.cache.find(c => c.id === rolesupport); // id support tickets

                 reaction.message.guild.channels.create("📝-"+name, {
                    type: 'text',
                    topic: 'Ticket n°' + user.id + ' - User : ' + user.tag,
                    parent: categorie,
                    permissionOverwrites: [
                      {
                        id: reaction.message.guild.roles.everyone,
                        deny: ['VIEW_CHANNEL','SEND_MESSAGES'],
                      },
                      {
                        id: user,
                        allow: ['VIEW_CHANNEL','SEND_MESSAGES'],
                      },
                      {
                        id: rolesupport,
                        allow: ['VIEW_CHANNEL','SEND_MESSAGES'],
                      },
                      {
                        id: client.user,
                        allow: ['VIEW_CHANNEL','SEND_MESSAGES'],
                      }
                    ]
                 }).then(c => {
                                
                    const embed1 = new Discord.MessageEmbed()
                        .setColor(config.color)
                        .setDescription(reaction.message.language.ticket.raw.creation(user.username, c.id, reaction.message.guild.name))
                    user.send(embed1)

                    const embed2 = new Discord.MessageEmbed()
                        .setColor(config.color)
                        .setTitle(reaction.message.language.ticket.raw.control.title())
                        .setDescription(reaction.message.language.ticket.raw.control.description())
                        .setTimestamp();
                    c.send({
                        embed: embed2
                    }).then (async data => {
                        await data.react("🔒")
                    })
                 })
            })
            .catch(err => console.log(err));
        }
        if (payload.d.emoji.name === "🔒" && channel.topic.split(" ")[0] === 'Ticket') { // 
            if(payload.d.user_id === client.user.id){return}
            channel.messages.fetch(payload.d.message_id).then(msg => {

                const reaction = msg.reactions.cache.get(payload.d.emoji.name);
                const user = client.users.cache.get(payload.d.user_id);

                msg.reactions.resolve(reaction).users.remove(user.id);

                // LANGUAGE
                var language = config.language;
                let languagedb = db.fetch(`language_${reaction.message.guild.id}`);
                if(languagedb){
                    var language = languagedb;
                }
                client.language = language;
                delete require.cache[require.resolve(`../languages/${client.language}.js`)];
                reaction.message.language = require("../languages/"+client.language);
                
                const embed3 = new Discord.MessageEmbed()
                    .setColor(config.color)
                    .setTitle(reaction.message.language.ticket.raw.control.title_confirm())
                    .setDescription(reaction.message.language.ticket.raw.control.description_confirm())
                    .setTimestamp();
                reaction.message.channel.send({
                    embed: embed3
                }).then (async data => {
                    await data.react('✅')
                    await data.react('❌')
                    const data_res = data.createReactionCollector((reaction, user) => !user.bot);
                    data_res.on("collect", async(reaction, user) => {
                        if (reaction.emoji.name === "✅") {
                                reaction.message.channel.delete()
                        }
                        else if (reaction.emoji.name === "❌") { 
                                reaction.message.delete()
                        };
                    });
                })
            })
            .catch(err => console.log(err));
        }
    }
})
};