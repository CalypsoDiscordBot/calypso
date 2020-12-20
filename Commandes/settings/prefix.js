const Discord = require('discord.js');
const config = require('../../config.json');
const db = require('quick.db');

module.exports.run = (client, message, args) => {
 
    if(!message.member.hasPermission("ADMINISTRATOR")) {
        const embed = new Discord.MessageEmbed()
            .setColor(client.color)
            .setDescription(message.language.errors.permLevel("ADMINISTRATOR"))
        return message.channel.send(embed);
    }

    if(!args[0]){
        let content = ["prefix"];
        client.commands.get("help").run(client, message, content);
    }
    else {
        if(args[0] === "disable"){
            db.delete(`prefix_${message.guild.id}`);
            const embed = new Discord.MessageEmbed()
                .setColor(client.color)
                .setDescription(message.language.prefix.disable(client.prefix))
            return message.channel.send(embed);
        }
        else {
            db.set(`prefix_${message.guild.id}`, args[0]);

            var prefix = config.prefix;
            let prefixdb = db.fetch(`prefix_${message.guild.id}`);
            if(prefixdb){
                var prefix = prefixdb;
            }
            client.prefix = prefix;
            const embed = new Discord.MessageEmbed()
                .setColor(client.color)
                .setDescription(message.language.prefix.success(client.prefix))
            return message.channel.send(embed);
        }
    }
}


module.exports.help = {
    name: 'prefix',
    description: `Sets the command prefix. \n\nExamples: \n\`%prefix%prefix !\` - Sets the prefix to ! \n\`%prefix%prefix disable\` - Disables the custom command prefix.`,
    category: "settings",
    usage:"<prefix>",
    accessableby: "Admin",
    aliases: ['setprefix']
};