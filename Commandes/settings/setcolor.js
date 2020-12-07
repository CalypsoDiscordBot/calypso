const Discord = require('discord.js');
const config = require('../../config.json');
const db = require('quick.db');

module.exports.run = (client, message, args) => {

    if(!message.guild.me.hasPermission("MANAGE_MESSAGES")) {
    const embed = new Discord.MessageEmbed()
        .setColor(client.color)
        .setDescription(message.language.errors.missingPerms(["MANAGE_MESSAGES"]))
    return message.channel.send(embed);
    }
    if(!message.member.hasPermission("ADMINISTRATOR")) {
        const embed = new Discord.MessageEmbed()
            .setColor(client.color)
            .setDescription(message.language.errors.permLevel("ADMINISTRATOR"))
        return message.channel.send(embed);
    }

    if(!args[0]){
        let content = ["setcolor"];
        return client.commands.get("help").run(client, message, content);
    }
    else {
        if(args[0] === "disable"){
            db.delete(`color_${message.guild.id}`);
            const embed = new Discord.MessageEmbed()
                .setColor(config.color)
                .setDescription(message.language.setcolor.disable(config.color))
            return message.channel.send(embed);
        }
        else {
            // let number = parseInt(args[0], 16);
            db.set(`color_${message.guild.id}`, args[0]);

            var color = config.color;
            let colordb = db.fetch(`color_${message.guild.id}`);
            if(colordb){
                var color = colordb;
            }
            client.color = color;
            const embed = new Discord.MessageEmbed()
                .setColor(client.color)
                .setDescription(message.language.setcolor.success(client.color))
            return message.channel.send(embed);
        }
    }
}

module.exports.help = {
    name: 'setcolor',
    description: "",
    category: "settings",
    usage:"",
    accessableby: "Members",
    aliases: ["embedcolor", "color"]
}