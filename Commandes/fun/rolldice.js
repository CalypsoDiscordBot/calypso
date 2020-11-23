const Discord = require("discord.js")
 
 module.exports.run = async (client, message, args) => {

    let replies = ["https://media.discordapp.net/attachments/716328334560067665/746709123608870942/dice-1.png",
                    "https://media.discordapp.net/attachments/716328334560067665/746709125718605944/dice-2.png",
                    "https://media.discordapp.net/attachments/716328334560067665/746709127316635688/dice-3.png",
                    "https://media.discordapp.net/attachments/716328334560067665/746709128549892096/dice-4.png",
                    "https://media.discordapp.net/attachments/716328334560067665/746709129594142720/dice-5.png",
                    "https://media.discordapp.net/attachments/716328334560067665/746709131280252978/dice-6.png"
                ];

    let result = Math.floor((Math.random() * replies.length));

    let rolldiceembed = new Discord.MessageEmbed() //MessageEmbed
    .setAuthor(message.author.username, message.author.displayAvatarURL())
    .setTitle('Roll a dice !')
    .setColor("#000000")
    .setDescription("Rolling...")
    .setImage("https://media.discordapp.net/attachments/716328334560067665/746690192248930414/dice.gif")
    message.channel.send(rolldiceembed).then(msg => {
            setTimeout(() => {
                msg.embeds[0].description = "**__Result__:**"
                msg.embeds[0].image["url"] = replies[result]
                msg.edit(new Discord.MessageEmbed(msg.embeds[0]))
            }, 2000)
        })
 }
 module.exports.help = {
    name: 'rolldice',
    description: "Rolls a dice.",
    category: "fun",
    usage:"",
    accessableby: "Members",
    aliases: ['rd']
}