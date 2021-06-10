const Discord = require('discord.js');
const config = require('../../config.json');
const db = require('quick.db');
const formatDate = require('dateformat');
const ms = require('ms');

module.exports.run = async (client, message, args) => {

    if(!message.member.hasPermission("MANAGE_MESSAGES")) {
        const embed = new Discord.MessageEmbed()
            .setColor(client.color)
            .setDescription(message.language.errors.permLevel("MANAGE_MESSAGES"))
        return message.channel.send(embed);
    }

    const now = new Date();

    let member;
    if(message.mentions.members.first()){
        member = message.mentions.members.first();
    }
    else if(args[0]){
        if(isNaN(args[0]) && args[0]) {
            const embed = new Discord.MessageEmbed()
            .setColor(client.color)
            .setDescription(message.language.errors.user())
            return message.channel.send(embed);
        }
        member = message.guild.members.cache.get(args[0]);
    }
    if(!args[0] || !member) {
        let content = ["mute"];
        return client.commands.get("help").run(client, message, content);
    }


    // Check role position
    if(member.id === message.author.id || member.id === client.user.id || (message.member.roles.highest.position <= member.roles.highest.position)) {
        const embed = new Discord.MessageEmbed()
            .setColor(client.color)
            .setDescription(message.language.mute.error_user())
        return message.channel.send(embed);
    }

    let mutedid = db.fetch(`mutedrole_${message.guild.id}`)
    let muted_role = message.guild.roles.cache.get(mutedid)
    // console.log('mutedrole find 0 : '+muted_role);

    if(!muted_role) {
        if(!muted_role || !muted_role.id) {
            try {
                // console.log("create muted")
                await message.guild.roles.create({
                    data: {
                        name: "Calypso Muted",
                        color: "#000000",
                        permissions:['VIEW_CHANNEL', 'READ_MESSAGE_HISTORY']
                    }
                }).then(role =>{
                    db.set(`mutedrole_${message.guild.id}`, role.id)
                })
            } catch (error) {
                const embed = new Discord.MessageEmbed()
                    .setColor(client.color)
                    .setDescription(message.language.errors.missingPerms(["MANAGE_ROLES"]))
                return message.channel.send(embed);
            }
        } else {
            db.set(`mutedrole_${message.guild.id}`, muted_role.id)
        }
    }

    // CHANNELS SET
    mutedid = db.fetch(`mutedrole_${message.guild.id}`)
    muted_role = message.guild.roles.cache.get(mutedid)
    let channels = "";
    await message.guild.channels.cache.forEach((channel) => {
        // console.log(channel.type)
        if(channel.type == 'text'){
            channel.updateOverwrite(muted_role, {SEND_MESSAGES: false, ADD_REACTIONS: false }).catch((error) => {
                channels += `\`${channel.name}\`, `;
            });
        } else if (channel.type == 'voice'){
            channel.updateOverwrite(muted_role, {CONNECT: false}).catch((error) => {
                channels += `\`${channel.name}\`, `;
            });
        }
    });
    if (channels.length !== 0){
        const embed = new Discord.MessageEmbed()
        .setColor(client.color)
        .setDescription(message.language.mute.missingPerms(["MANAGE_CHANNELS"],channels))
        message.channel.send(embed);
    }

    if(member.roles.cache.has(muted_role.id)){
        const embed = new Discord.MessageEmbed()
            .setColor(client.color)
            .setDescription(message.language.mute.already_muted())
        return message.channel.send(embed);
    }
    member.roles.add(muted_role).then( async () => {

        // DB SET
        let count = 0;
        await db.all().forEach((element) => {
            const sanctionsdb = element.ID.startsWith(`sanctions_${message.guild.id}_${member.id}`);
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
                    .setColor(client.color)
                    .setDescription(message.language.mute.error_time())
                return message.channel.send(embed);
            }
            time = ms(args[1]) + now.getTime() 
            raison = args.slice(2).join(" ") || "Unspecified";
            temps = ms(ms(args[1]), { long: true })
            db.set(`mute_${message.guild.id}_${member.id}`, time)
        } else {
            if(args[1]) {
                raison = args.slice(1).join(" ") || "Unspecified";
            }
            db.set(`mute_${message.guild.id}_${member.id}`, `forever`)
        }
        
        // message.client.users.fetch(member.id).then(user => user.roles.add(muted_role.id))

        // const muted_embed = new Discord.MessageEmbed()
        //     .setColor(client.color)
        //     .setTitle(message.language.mute.dm.title(message.guild.name, message.author.tag))
        //     .setDescription(message.language.mute.dm.description(temps, raison))
        // member.send(muted_embed)
        
        db.set(`sanctions_${message.guild.id}_${member.id}_${count+1}`, `Muted by ${message.author.tag} | Reason: ${raison} | Duration: ${temps} | Time: ${formatDate(now, "mm/dd/yy HH:MM:ss")}`);
        
        const embed = new Discord.MessageEmbed()
            .setColor(client.color)
            .setTitle(message.language.mute.title(member, message.author.tag))
            .setDescription(message.language.mute.description(temps, raison))
        return message.channel.send(embed)
    })
    

    
};

module.exports.help = {
    name: 'mute',
    description: "Mutes a user.",
    category: "moderation",
    usage:"<user> <reason> or <user> <time(m,h,d,w,y)> <reason>",
    accessableby: "Admin", // ?
    aliases: ['tempmute']
};