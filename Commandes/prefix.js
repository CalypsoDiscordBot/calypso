const Discord = require('discord.js');
const config = require('../config.json');
const db = require('quick.db');

module.exports.run = (client, message, args) => {

    if(!message.member.hasPermission("ADMINISTRATOR")) {return;}

    if(!args[0]){
        let content = ["prefix"];
        client.commands.get("help").run(client, message, content);
    }
    else {
        if(args[0] === "disable"){
            db.delete(`prefix_${message.guild.id}`);
            message.channel.send(`Successfully disabled the prefix. All commands should now be used like: \`${config.prefix}help\` `);
        }
        else {
            db.set(`prefix_${message.guild.id}`, args[0]);
            var prefix = config.prefix;
            let prefixdb = db.fetch(`prefix_${message.guild.id}`);
            if(prefixdb){
                var prefix = prefixdb;
            }
            client.prefix = prefix;
            message.channel.send(`Successfully set the prefix. All commands should now be used like: \`${client.prefix}help\` `);
        }
    }
}


module.exports.help = {
    name: 'prefix',
    description: `Sets the command prefix. \n\nExamples: \n\`%prefix%prefix !\` - Sets the prefix to ! \n\`%prefix%prefix disable\` - Disables the custom command prefix.`,
    category: "settings",
    usage:"<prefix>",
    accessableby: "Admin",
    aliases: []
};