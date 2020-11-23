const Discord = require('discord.js');
const config = require('../../config.json');
const db = require('quick.db');
const formatDate = require('dateformat');

module.exports.run = (client, message, args) => {

    
    if(!message.guild.me.hasPermission("BAN_MEMBERS")) {
        const embed = new Discord.MessageEmbed()
            .setColor(config.color)
            .setDescription(message.language.errors.missingPerms(["BAN_MEMBERS"]))
        return message.channel.send(embed);
    }
    if(!message.member.hasPermission("BAN_MEMBERS")) {
        const embed = new Discord.MessageEmbed()
            .setColor(config.color)
            .setDescription(message.language.errors.permLevel("BAN_MEMBERS"))
        return message.channel.send(embed);
    }

    if(!args[0]){
        let content = ["unban"];
        client.commands.get("help").run(client, message, content);
        return;
    }
    const now = new Date();
    let raison = args.slice(1).join(" ") || "Unspecified";
    let member = message.mentions.members.first() || client.users.resolve(args[0]);

    if(!member){
        const embed = new Discord.MessageEmbed()
        .setColor(config.color)
        .setDescription(message.language.errors.user())
        return message.channel.send(embed);
    }
    message.guild.fetchBans().then((bans) => {
        if(bans.some(u => u.user.id === member.id || u.user.tag === member.tag)) {
            message.guild.members.unban(member.id).catch((err) => {
                const embed = new Discord.MessageEmbed()
                .setColor(config.color)
                .setDescription(message.language.unban.error_user())
                return message.channel.send(embed);
            });
            const embed = new Discord.MessageEmbed()
                .setColor(config.color)
                .setDescription(message.language.unban.description(member.tag))
            message.channel.send(embed);
            let count = 0;
            db.all().forEach((element) => {
                const sanctionsdb = element.ID.startsWith(`sanctions_${message.guild.id}_${member.id}`);
                if (!sanctionsdb) {
                    return;
                }
                count++;
            });
            db.set(`sanctions_${message.guild.id}_${member.id}_${count+1}`, `Unbanned by ${message.author.tag} | Reason : ${raison} | Time: ${formatDate(now, "mm/dd/yy HH:MM:ss")}`)

            db.delete(`ban_${message.guild.id}_${member.id}`).catch(err => {})
        }
    })

};

module.exports.help = {
    name: 'unban',
    description: "Unban a user.",
    category: "Admin",
    usage:"<user> <reason>",
    accessableby: "Moderators, Admins", // ?
    aliases: []
};