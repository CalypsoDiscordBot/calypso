const Discord = require("discord.js")
 
 module.exports.run = async (bot, message, args) => {

    let replies = ["Heads !", "Tails !"];

    let result = Math.floor((Math.random() * replies.length));

    let coinflipembed = new Discord.MessageEmbed()

    .setAuthor(message.author.username)
    .setColor("#000000")
    .addField("Result", replies[result]);

    message.channel.send(coinflipembed)

 }

module.exports.help = {
    name: 'coinflip',
    description: "Flip a coin.",
    category: "fun",
    usage:"",
    accessableby: "Members",
    aliases: ['cf']
}