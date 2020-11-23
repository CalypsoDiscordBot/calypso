const Discord = require("discord.js");
const config = require('../../config.json');
const db = require('quick.db');

const languages = [
    {
        name: "french",
        aliases: [
            "francais",
            "fr",
            "français"
        ]
    },
    {
        name: "english",
        aliases: [
            "en",
            "englich"
        ]
    }
];

module.exports.run = async (client, message, args) => {

    if(!message.guild.me.hasPermission("MANAGE_MESSAGES")) {
    const embed = new Discord.MessageEmbed()
        .setColor(config.color)
        .setDescription(message.language.errors.missingPerms(["MANAGE_MESSAGES"]))
    return message.channel.send(embed);
    }
    if(!message.member.hasPermission("ADMINISTRATOR")) {
        const embed = new Discord.MessageEmbed()
            .setColor(config.color)
            .setDescription(message.language.errors.permLevel("ADMINISTRATOR"))
        return message.channel.send(embed);
    }
    
    let language = args[0];
    if(!languages.some((l) => l.name === language || l.aliases.includes(language))){
        const embed = new Discord.MessageEmbed()
            .setColor(config.color)
            .setDescription(message.language.setlang.invalid())
        return message.channel.send(embed);
    }
    client.language = languages.find((l) => l.name === language || l.aliases.includes(language)).name;
    db.set(`language_${message.guild.id}`, client.language);

    message.language = require("../../languages/"+client.language);
    const embed = new Discord.MessageEmbed()
        .setColor(config.color)
        .setDescription(message.language.setlang.success())
    return message.channel.send(embed);
}

module.exports.help = {
    name: 'setlang',
    description: "",
    category: "settings",
    usage:"",
    accessableby: "Members",
    aliases: ["setlanguage", "configlanguage"]
}