const Discord = require('discord.js');
const config = require('../../config.json');

exports.run = (client, message, args) => {

    let member = message.mentions.users.first() || message.member

    if(!member){return;}
    if(!member.user){
        try {
            let avatar = member.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 });
            const embed = new Discord.MessageEmbed()
                .setTitle(message.language.avatar.title(member.tag))
                .setDescription(`${message.language.avatar.description()} \n[png](${member.avatarURL({ format: 'png', size: 1024 })})`)
                .setImage(avatar)
                .setColor(config.color)
    
                .setFooter(member.username)
                .setTimestamp()
                
                message.channel.send(embed);
        } catch (e) {
            return;
        }
    } else {
        try {
            let avatar = member.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 });
            const embed = new Discord.MessageEmbed()
                .setTitle(message.language.avatar.title(member.user.tag))
                .setDescription(`${message.language.avatar.description()} \n[png](${member.user.avatarURL({ format: 'png', size: 1024 })}) | [gif](${member.user.avatarURL({ format: 'gif', dynamic: true, size: 1024 })})`)
                .setImage(avatar)
                .setColor(config.color)
    
                .setFooter(member.user.username)
                .setTimestamp()

                message.channel.send(embed);
        } catch (e) {
            return;
        }
    }

    

}

module.exports.help = {
    name: "avatar",
    description: "",
    category: "info",
    usage:"",
    accessableby: "Members",
    aliases: ['pp']
}
