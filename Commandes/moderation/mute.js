const Discord = require('discord.js');
const config = require('../../config.json');
const db = require('quick.db');
const formatDate = require('dateformat');
const ms = require('ms');

module.exports.run = (client, message, args) => {

    if(!message.guild.me.hasPermission("MANAGE_MESSAGES")) {
    const embed = new Discord.MessageEmbed()
        .setColor(config.color)
        .setDescription(message.language.errors.missingPerms(["MANAGE_MESSAGES"]))
    return message.channel.send(embed);
    }
    if(!message.member.hasPermission("MANAGE_MESSAGES")) {
        const embed = new Discord.MessageEmbed()
            .setColor(config.color)
            .setDescription(message.language.errors.permLevel("MANAGE_MESSAGES"))
        return message.channel.send(embed);
    }
    let muted_role;

    const now = new Date();

    // RESOLVE MEMBER
    let mentionedUser;
    if(message.mentions.members.first()){
        mentionedUser = message.mentions.members.first();
    }
    else {
        mentionedUser = args[0];
        if(isNaN(mentionedUser) && args[0]) {
            const embed = new Discord.MessageEmbed()
            .setColor(config.color)
            .setDescription(message.language.errors.user())
            return message.channel.send(embed);
        }
        mentionedUser = message.guild.members.resolve(args[0]);
    }
    if(!args[0] || !mentionedUser) {
        let content = ["mute"];
        return client.commands.get("help").run(client, message, content);
    }

    // Check role position
    const memberPosition = mentionedUser.roles.highest.position;
    const moderationPosition = message.member.roles.highest.position;

    if(mentionedUser.id === message.author.id || (moderationPosition < memberPosition)) {
        const embed = new Discord.MessageEmbed()
            .setColor(config.color)
            .setDescription(message.language.mute.error_user())
        return message.channel.send(embed);
    }

    mutedid = db.fetch(`mutedrole_${message.guild.id}`)
    muted_role = message.guild.roles.cache.find(role => role.id = mutedid)
    // console.log(muted_role);

    if(!muted_role) {
        // console.log("create")
        muted_role = message.guild.roles.cache.find(role => role.name.toLowerCase().includes("muted"))
        if(!muted_role) {
            try {
                muted_role = message.guild.roles.create({
                    data: {
                        name: "Muted",
                        color: "#000000",
                        permissions:[]
                    }
                }).then(role =>{
                    db.set(`mutedrole_${message.guild.id}`, role.id)
                })
            } catch (error) {
                const embed = new Discord.MessageEmbed()
                    .setColor(config.color)
                    .setDescription(message.language.errors.missingPerms(["MANAGE_ROLES"]))
                return message.channel.send(embed);
            }
        } else {
            db.set(`mutedrole_${message.guild.id}`, muted_role.id)
        }
    }
    message.guild.channels.cache.forEach((channel) => {
        channel.updateOverwrite(muted_role.id, {
            SEND_MESSAGES: false,
            ADD_REACTIONS: false,
            CONNECT: false
        }).catch((error) => {
            const embed = new Discord.MessageEmbed()
            .setColor(config.color)
            .setDescription(message.language.errors.missingPerms(["MANAGE_CHANNELS"]))
            return message.channel.send(embed);
        });
    });

    let count = 0;
    db.all().forEach((element) => {
        const sanctionsdb = element.ID.startsWith(`sanctions_${message.guild.id}_${mentionedUser.id}`);
        if (!sanctionsdb) {
            return;
        }
        count++;
    });
    let raison = 'Unspecified'
    let temps = 'Forever'
    if(args[1] && ms(args[1])) {
        if(ms(args[1])< 120000 || ms(args[1])> 63070000000){
            const embed = new Discord.MessageEmbed()
                .setColor(config.color)
                .setDescription(message.language.mute.error_time())
            return message.channel.send(embed);
        }
        time = ms(args[1]) + now.getTime() 
        raison = args.slice(2).join(" ") || "Unspecified";
        temps = ms(ms(args[1]), { long: true })
        db.set(`mute_${message.guild.id}_${mentionedUser.id}`, time)
    } else {
        if(args[1]) {
            raison = args.slice(1).join(" ") || "Unspecified";
        }
        db.set(`mute_${message.guild.id}_${mentionedUser.id}`, `forever`)
    }

    mentionedUser.roles.add(muted_role)

    const muted_embed = new Discord.MessageEmbed()
        .setColor(config.color)
        .setTitle(message.language.mute.dm.title(message.guild.name, message.author.tag))
        .setDescription(message.language.mute.dm.description(temps, raison))
    mentionedUser.send(muted_embed)
    
    db.set(`sanctions_${message.guild.id}_${mentionedUser.id}_${count+1}`, `Muted by ${message.author.tag} | Reason: ${raison} | Duration: ${temps} | Time: ${formatDate(now, "mm/dd/yy HH:MM:ss")}`);
    
    const embed = new Discord.MessageEmbed()
        .setColor(config.color)
        .setTitle(message.language.mute.title(mentionedUser, message.author.tag))
        .setDescription(message.language.mute.description(temps, raison))
    message.channel.send(embed)

    
};

module.exports.help = {
    name: 'mute',
    description: "Mutes a user.",
    category: "moderation",
    usage:"<user> <reason> or <user> <time(m,h,d,w,y)> <reason>",
    accessableby: "Admin", // ?
    aliases: ['tempmute']
};