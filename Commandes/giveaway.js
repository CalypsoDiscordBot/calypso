const Discord = require('discord.js');
const config = require('../config.json');
const ms = require('ms');

module.exports.run = (client, message, args) => {

    if(!message.member.hasPermission("ADMINISTRATOR")) {return;}

    const time = args[0];
    const winners = args[1];
    const prize = args.slice(2).join(" ");

	if(!time) {
        let content = ["giveaway"];
        client.commands.get("help").run(client, message, content);
    }
    else if(!winners) {
        let content = ["giveaway"];
        client.commands.get("help").run(client, message, content);
    }
    else if(!prize) {
        let content = ["giveaway"];
        client.commands.get("help").run(client, message, content);
    }
    else {
        client.giveawaysManager.start(message.channel, {
            time: ms(time),
            prize: prize,
            winnerCount: parseInt(winners),
            messages: {
                giveaway: "🎉🎉 **GIVEAWAY** 🎉🎉",
                giveawayEnded: "🎉🎉 **GIVEAWAY ENDED** 🎉🎉",
                timeRemaining: "Time remaining: **{duration}**!",
                inviteToParticipate: "React with 🎉 to participate!",
                winMessage: "Congratulations, {winners}! You won **{prize}**!",
                embedFooter: "Giveaways",
                noWinner: "Giveaway cancelled, no valid participations.",
                hostedBy: "Hosted by: {user}",
                winners: "winner(s)",
                endedAt: "Ended at",
                units: {
                    seconds: "seconds",
                    minutes: "minutes",
                    hours: "hours",
                    days: "days",
                    pluralS: false // Not needed, because units end with a S so it will automatically removed if the unit value is lower than 2
                }
            }
        });
    }

    message.delete();
    
};

module.exports.help = {
    name: 'giveaway',
    description: "Randomly picks a member that reacted to the giveaway message.",
    category: "moderation",
    usage:"<time> <numberOfWinners> <prize>",
    accessableby: "Admin",
    aliases: ['gstart']
};