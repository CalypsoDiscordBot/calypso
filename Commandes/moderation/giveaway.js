const Discord = require('discord.js');
const config = require('../../config.json');
const ms = require('ms');

module.exports.run = (client, message, args) => {

    if(!message.member.hasPermission("MANAGE_GUILD")) {
        const embed = new Discord.MessageEmbed()
            .setColor(client.color)
            .setDescription(message.language.errors.permLevel("MANAGE_GUILD"))
        return message.channel.send(embed);
    }

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
                giveaway: message.language.giveaway.giveawayStarted(),
                giveawayEnded: message.language.giveaway.giveawayEnded(),
                timeRemaining: message.language.giveaway.timeRemaining(),
                inviteToParticipate: message.language.giveaway.inviteToParticipate(),
                winMessage: message.language.giveaway.winMessage(),
                embedFooter: message.language.giveaway.embedFooter(),
                noWinner: message.language.giveaway.noWinner(),
                hostedBy: message.language.giveaway.hostedBy(),
                winners: message.language.giveaway.winners(),
                endedAt: message.language.giveaway.endedAt(),
                units: {
                    seconds: message.language.giveaway.units.seconds(),
                    minutes: message.language.giveaway.units.minutes(),
                    hours: message.language.giveaway.units.hours(),
                    days: message.language.giveaway.units.days(),
                    pluralS: false // Not needed, because units end with a S so it will automatically removed if the unit value is lower than 2
                }
            }
        });
    }

    if(message.guild.me.hasPermission("MANAGE_MESSAGES")) {
        message.delete().catch()
    }
    
};

module.exports.help = {
    name: 'giveaway',
    description: "Randomly picks a member that reacted to the giveaway message.",
    category: "moderation",
    usage:"<time> <numberOfWinners> <prize>",
    accessableby: "Admin",
    aliases: ['gstart']
};