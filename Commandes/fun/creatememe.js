const config = require('../../config.json');
const Discord = require('discord.js');
const request = require("request");

function filterText(text) {
	// Given a text, split it into an array using the seperator
	// Then join it back into a string with the join item inbetween each element
	// This is a crude way to replacAll(thing to replace, thing to replace with)
	let filteredText = text.split('_').join('__');
	filteredText = filteredText.split(' ').join('_');
	filteredText = filteredText.split('?').join('~q');
	filteredText = filteredText.split('%').join('~p');
	filteredText = filteredText.split('#').join('~h');
	filteredText = filteredText.split('/').join('~s');
	filteredText = filteredText.split('"').join('\'\'');
	filteredText = filteredText.split('-').join('--');

	return filteredText;
}

module.exports.run = async (client, message, args) => {

    if(!args[0] || args[0] == 0){
        args[0] = 1;
    }
    if(!isNaN(args[0])){
        request(`https://api.memegen.link/templates`, async (error, res, body) => {

            var body = JSON.parse(body);
            let content = "";
            await body.forEach(element => {
                content += `${element.name} - \`${element.id}\`\n`
            });

            if(content.toString().split("\n").length < 10) {
                const embed = new Discord.MessageEmbed()
                .setTitle('Meme templates list')
                .setColor(client.color)
                .setDescription(content)
                .setTimestamp()
                return message.channel.send(embed)
            } else {
                let embeds = []
                content = content.split("\n")
                let k = 10;
                for (let i = 0; i < content.length; i+=10) {
                    embeds.push(content.slice(i, k));
                    k += 10;
                }
                const embed = new Discord.MessageEmbed()
                .setTitle(message.language.creatememe.list())
                .setColor(client.color)
                .setDescription(`${embeds[args[0]-1].join("\n")}`)
                .setFooter(`Page ${args[0]}/${embeds.length}`)
                .setTimestamp()
                return message.channel.send(embed)
            }
        })
    }
    else if (args[0]){
        let template = args.shift()
        request(`https://api.memegen.link/templates/${template}`, async (error, res, body) => {
            console.log(body);
            try {
                var body = JSON.parse(body);
            } catch (e) {
                const embed = new Discord.MessageEmbed()
                .setColor(client.color)
                .setDescription(message.language.creatememe.error())
                return message.channel.send(embed)
            }

            args = args.join(" ").split(",");
            
            if((!args[0] || !args[1]) && template){
                const embed = new Discord.MessageEmbed()
                .setColor(client.color)
                .setImage(`https://api.memegen.link/images/preview.jpg?lines[]=first+line&lines[]=second+line&template=${template}`)
                .setTimestamp()
                return message.channel.send(embed);
            } 
            else if ((!args[0] || !args[1]) && !template) {
                let content = ["creatememe"];
                return client.commands.get("help").run(client, message, content);
            }

            args[0] = filterText(args[0]);
            args[1] = filterText(args[1]);
            console.log(`https://api.memegen.link/images/${template}/${args[0]}/${args[1]}.png`);
            const embed = new Discord.MessageEmbed()
                .setColor(client.color)
                .setImage(`https://api.memegen.link/images/${template}/${args[0]}/${args[1]}.png`)
                .setTimestamp()
            return message.channel.send(embed);
        })
        
    }
    
};

module.exports.help = {
    name: 'creatememe',
    description: "Create and send a meme in the channel.",
    category: "fun",
    usage:"<template> <line1>,<line2>",
    accessableby: "Members",
    aliases: ['cm','memecreate']
}