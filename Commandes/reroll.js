const Discord = require('discord.js');
const config = require('../config.json');

module.exports.run = (client, message, args) => {

    if(!message.member.hasPermission("ADMINISTRATOR")) {return;}

	if(!args[0]) {
        let content = ["reroll"];
        client.commands.get("help").run(client, message, content);
    }
    else {
        client.giveawaysManager.reroll(args[0], {
            messages: {
                congrat: ":tada: New winner(s) : {winners}! Congratulations!",
                error: "No valid participations, no winners can be chosen!"
            }
        }).catch((err) => {
            message.channel.send("No giveaway found for "+args[0]+", please check and try again");
        });
    }

    message.delete();
    
};

module.exports.help = {
    name: 'reroll',
    description: "Randomly picks a member that reacted to the giveaway message.",
    category: "moderation",
    usage:"<message's ID>",
    accessableby: "Admin",
    aliases: ['greroll']
};