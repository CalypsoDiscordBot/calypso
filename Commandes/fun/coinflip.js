const Discord = require("discord.js")
const config = require('../../config.json');
 
 module.exports.run = async (client, message, args) => {

    let replies = ["https://cdn.discordapp.com/attachments/688771909525176479/745465503493128285/image0.png", "https://media.discordapp.net/attachments/688771909525176479/745465503945850910/image1.png?width=720&height=406"];

    let result = Math.floor((Math.random() * replies.length));

    let coinflipembed = new Discord.MessageEmbed() //MessageEmbed
    .setAuthor(message.author.username, message.author.displayAvatarURL())
    .setTitle('Coinflip !')
    .setColor(config.color)
    .setDescription("Rolling...")
	.setImage("https://cdn.discordapp.com/attachments/716328334560067665/745462984457060453/coin.gif")
    message.channel.send(coinflipembed).then(msg => {
            setTimeout(() => {
                msg.embeds[0].description = "**__Result__:**"
                msg.embeds[0].image["url"] = replies[result]
                msg.edit(new Discord.MessageEmbed(msg.embeds[0]))
            }, 2000)
        })
 }
 module.exports.help = {
    name: 'coinflip',
    description: "Flips a coin.",
    category: "fun",
    usage:"",
    accessableby: "Members",
    aliases: ['cf']
}