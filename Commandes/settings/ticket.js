const Discord = require('discord.js');
const ms = require("ms");
const config = require('../../config.json');
const fs = require('fs');
const db = require("quick.db");
const { MessageButton, MessageActionRow } = require('discord-buttons');

module.exports.run = async (client, message, args) => {
    
    if(!message.guild.me.hasPermission("MANAGE_MESSAGES") || !message.guild.me.hasPermission("MANAGE_CHANNELS")) {
        const embed = new Discord.MessageEmbed()
            .setColor(client.color)
            .setDescription(message.language.errors.missingPerms(["MANAGE_MESSAGES","MANAGE_CHANNELS"]))
        return message.channel.send(embed);
    }
    if(!message.member.hasPermission("MANAGE_GUILD")) {
        const embed = new Discord.MessageEmbed()
            .setColor(client.color)
            .setDescription(message.language.errors.permLevel("MANAGE_GUILD"))
        return message.channel.send(embed);
    }
    message.delete();

    let role = message.guild.roles.cache.find((c) => c.name === args[0] || c.id === args[0]);

    if (!role || !role.name) { 
        let content = ["ticket"];
        return client.commands.get("help").run(client, message, content);
    }

    const embed = new Discord.MessageEmbed()
        .setColor(client.color)
        .setDescription(message.language.ticket.role.description(role.name))
    message.channel.send(embed).then (function (data){
        setTimeout(function(){ 
            db.set(`rolesupport_${data.channel.guild.id}`, role.id);
        }, 2000);
        data.delete({ timeout: 3000 })
    });

    //  MESSAGE
    let button = new MessageButton()
        .setLabel("Ouvrir un ticket")
        .setStyle("blurple")
        .setEmoji("📝")
        .setID("ticket_create")
    message.channel.send({
        component: button,
        embed: {
            color: client.color,
            description: message.language.ticket.message.description(),
            title: message.language.ticket.message.title(),
            footer: {
                text: `© 2020 - ${message.guild.name}`,
                icon_url: client.user.displayAvatarURL()
            }
        }
    }).then (function (data){
        data.channel.overwritePermissions([
            {
                id: data.channel.guild.roles.everyone,
                deny: ['SEND_MESSAGES','ADD_REACTIONS']
            },
            {
                id: data.channel.guild.me,
                allow: ['VIEW_CHANNEL','SEND_MESSAGES','ADD_REACTIONS']
            }
        ]);
        // data.react('📝')
        
        setTimeout(function(){ 
            let messageid = db.fetch(`messageticket_${data.channel.guild.id}`);
            message.channel.messages.fetch(messageid).then(async msg => {
                if (msg) msg.delete();
            })
            db.set(`messageticket_${data.channel.guild.id}`, data.id);
            // db.set(`categorieticket_${data.channel.guild.id}`, data.channel.parentID);
        }, 3000);
    })

    // Création des catégories
    let categoryid = db.fetch(`categorie_${message.channel.guild.id}`);
    let category = message.channel.guild.channels.cache.find(c => c.id === categoryid && c.type == "category" && c.name == "Tickets")
    if(!category){
        message.guild.channels.create("Tickets", {
            type: 'category',
            permissionOverwrites: [{
                id: role,
                allow: ['VIEW_CHANNEL','SEND_MESSAGES'],
              },
              {
                id: message.channel.guild.id,
                deny: ['VIEW_CHANNEL','SEND_MESSAGES','ADD_REACTIONS'],
              }
            ]
        }).then (data =>{
            db.set(`categorie_${data.guild.id}`, data.id);
        });
    }
}

module.exports.help = {
    name: 'ticket',
    description: "",
    category: "settings",
    usage:"<role>",
    accessableby: "Admin",
    aliases: []
};