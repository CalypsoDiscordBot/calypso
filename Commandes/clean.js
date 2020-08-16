const Discord = require("discord.js");

module.exports.run = (client, message, args) => {

    if(!message.member.hasPermission("MANAGE_MESSAGES")) {return;}
    
    if (!args[0]) {
        let content = ["clean"];
        client.commands.get("help").run(client, message, content);
    }
    else if (isNaN(args[0])) {
        let content = ["clean"];
        client.commands.get("help").run(client, message, content);
    }    
        nb = parseInt(args[0])+1;                             
        message.channel.bulkDelete(nb).then((messages) => {
                message.channel.send({embed: {description: `✅ **${messages.size-1}** messages have been deleted!`}});
            });
};

module.exports.help = {
    name: 'clean',
    description: "Cleans messages from a channel.",
    category: "admin",
    usage:"[amount<100]",
    accessableby: "Admin",
    aliases: []
};
