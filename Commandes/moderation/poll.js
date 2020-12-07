const Discord = require('discord.js');
const config = require('../../config.json');

const emojis = ['1⃣','2⃣','3⃣','4⃣','5⃣','6⃣','7⃣','8⃣','9⃣','🔟'];

module.exports.run = (client, message, args) => {

    if(!message.guild.me.hasPermission("MANAGE_MESSAGES")) {
    const embed = new Discord.MessageEmbed()
        .setColor(client.color)
        .setDescription(message.language.errors.missingPerms(["MANAGE_MESSAGES"]))
    return message.channel.send(embed);
    }
    if(!message.member.hasPermission("MANAGE_MESSAGES")) {
        const embed = new Discord.MessageEmbed()
            .setColor(client.color)
            .setDescription(message.language.errors.permLevel("MANAGE_MESSAGES"))
        return message.channel.send(embed);
    }
    
    if(!args[0]){
        let content = ["poll"];
        return client.commands.get("help").run(client, message, content);
    }
    else {
        let content = args.join(" ").split(/[""]/).filter(function(entry) { return entry.trim() != ''; });

        if(content[1] && content[2]){
            let i=0;
            let final = "";
            content.slice(1).forEach(element =>
                final += emojis[i++]+" "+element+"\n\n"
            )
            var poll = new Discord.MessageEmbed()
                .setColor(client.color)
                .setTitle(`📊 **${content[0]}**`)
                .setDescription(final)
                .setFooter(`Calypso`)
                .setTimestamp()
            message.channel.send(poll).then(async (data) => {
                let i=0;
                content.slice(1).forEach(async element =>
                    await data.react(emojis[i++])
                )
            })
        }
        else if(content[0]){
            var poll = new Discord.MessageEmbed()
                .setColor(client.color)
                .setTitle(`📊 **${content[0]}**`)
                .setFooter(`Calypso`)
                .setTimestamp()
            message.channel.send(poll).then(async (data) => {
                await data.react('773250107415461958');
                await data.react('773250134582493234');
                await data.react('773250071893377064');
            })
        }
        else {
            let content = ["poll"];
            return client.commands.get("help").run(client, message, content);
        }
        
    }
    
    message.delete();
    
};

module.exports.help = {
    name: 'poll',
    description: "Create a reaction poll by typing `%prefix%poll \"your message\"`. The bot will automatically add the reactions :thumbsup:, :thumbsdown:, and :person_shrugging:.\nCreate a reaction poll with multiple options by typing `%prefix%poll {title} [Option1] [Option2] [Option3]`.",
    category: "moderation",
    usage:`"title" "Option1" "Option2" "Option3"`,
    accessableby: "Admin",
    aliases: []
};