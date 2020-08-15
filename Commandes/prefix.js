const Discord = require('discord.js');
const config = require('../config.json');
const db = require('quick.db');

module.exports.run = (client, message, args) => {

    if(!message.member.hasPermission("ADMINISTRATOR")) {return;}

    if(!args[0]){
        let msg = `${prefix}help prefix`;
        let content = msg.slice(prefix.length).trim().split(/ +/g);
        client.commands.get("help").run(client, message, content);
    }

    if(args[0] === "disable"){
        db.delete(`prefix_${message.guild.id}`);
    }
    db.set(`prefix_${message.guild.id}`, args[0]);
    let prefix = db.fetch(`prefix_${message.guild.id}`);
    if(!prefix){
        let prefix = config.prefix;
    }
    message.channel.send(`Successfully disabled the prefix. All commands should now be used like: \`${client.prefix}ping\` `);
}


module.exports.help = {
    name: 'prefix',
    description: `Sets the command prefix. \n\nExamples: \n\`%prefix%prefix !\` - Sets the prefix to ! \n\`%prefix%prefix disable\` - Disables the custom command prefix.`,
    category: "settings",
    usage:"<prefix>",
    accessableby: "Admin",
    aliases: []
};