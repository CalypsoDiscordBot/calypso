const Discord = require('discord.js');
const config = require('../config.json');

module.exports.run = (client, message, args) => {

    if(!args[0]){
      message.channel.send({
        embed: {
          description: `I'm a multi-purpose discord bot that does music, moderation and other fun and useful things. 
          Do \`${client.prefix}help <command>\` for extended information on a command.
          \n[Add to your Discord server](https://discord.com/api/oauth2/authorize?client_id=740539000615469106&permissions=8&scope=bot) | [Join our Discord server](https://discord.gg/3y2ByKq)`,
          color: config.color,
          timestamp: new Date(),
          footer: {
               icon_url: client.user.displayAvatarURL(),
               text: "Calypso Bot"
          },
          author: {
            name: `${client.user.username} Help`,
            icon_url: client.user.displayAvatarURL()
          },
          fields: [
           {
             name: ":wrench: Settings",
             value: `\`${client.prefix}accessrole\`, \`${client.prefix}channeltoggle\`, \`${client.prefix}prefix\`, \`${client.prefix}configjoin\`, \`${client.prefix}configleave\`, \`${client.prefix}testjoin\`, \`${client.prefix}testleave\``
           },
           {
             name: ":hammer: Moderation",
             value: `\`${client.prefix}clean\`, \`${client.prefix}poll\`, \`${client.prefix}giveaway\`, \`${client.prefix}reroll\`, \`${client.prefix}say\`, \`${client.prefix}embedsay\``
           },
           {
             name: ":notes: Music",
             value: `\`${client.prefix}play\`, \`${client.prefix}stop\`, \`${client.prefix}skip\`, \`${client.prefix}queue\`, \`${client.prefix}volume\``
           },
           {
             name: ":100: Fun",
             value: `\`${client.prefix}meme\`, \`${client.prefix}dog\`, \`${client.prefix}coinflip\`, \`${client.prefix}rolldice\``
           },
           {
             name: ":information_source: Info",
             value: `\`${client.prefix}help\`, \`${client.prefix}info\`, \`${client.prefix}whois\`, \`${client.prefix}serverinfo\`, \`${client.prefix}ping\`, \`${client.prefix}vote\``
           }
          ]
        }
      });
    }
    else{
      const embed = new Discord.MessageEmbed()
        .setColor(config.color)
        .setAuthor(`${client.user.username} Help`, client.user.displayAvatarURL())
      let command = client.commands.get(client.aliases.get(args[0].toLowerCase()) || args[0].toLowerCase())
      if(!command) return message.channel.send(embed.setTitle("Invalid Command.").setDescription(`Do \`${client.prefix}help\` for the list of the commands.`))
      command = command.help
      embed.setTitle(`${client.prefix}${command.name}`)
      .setDescription(`${command.description.replace(/%prefix%/g, client.prefix) || "No Description provided."}`)
      .addField("Usage", `${command.usage ? `\`${client.prefix}${command.name} ${command.usage}\`` : `\`${client.prefix}${command.name}\``}`, true)
      .addField("Aliases", `${(command.aliases && command.aliases.length !== 0) ? command.aliases.join(", ") : "None."}`, true)
      return message.channel.send(embed)
    }
};

module.exports.help = {
    name: 'help',
    description: "",
    category: "info",
    usage:"",
    accessableby: "Members",
    aliases: []
};

// const embed = new Discord.RichEmbed()
//         .setColor(config.color)
//         .setAuthor(`${client.user.username} Help`, client.user.displayAvatarURL)

//       embed.setDescription(`These are the avaliable commands for ${message.guild.me.displayName}\nThe bot prefix is: **${client.prefix}**`)
//       embed.setFooter(`© ${message.guild.me.displayName} | Total Commands: ${client.commands.size}`, client.user.displayAvatarURL);

//       console.log(client.commands)
//       client.commands.forEach(async (cmd) => {
//         let category = cmd.help.category;
//         const dir = client.commands.filter(c => c.help.category === category)
//         const capitalise = category.slice(0, 1).toUpperCase() + category.slice(1)
//         try {
//             embed.addField(`❯ ${capitalise} [${dir.size}]:`, dir.map(c => `\`${c.help.name}\``).join(" "))
//         } catch(e) {
//             console.log(e)
//         }
//       })
//       return message.channel.send(embed)


// const embed = new RichEmbed()
//   .setColor(cyan)
//   .setAuthor(`${message.guild.me.displayName} Help`, message.guild.iconURL)
//   .setThumbnail(bot.user.displayAvatarURL)

// if(!args[0]) {
//     const categories = readdirSync("./commands/")
//     embed.setDescription(`These are the avaliable commands for ${message.guild.me.displayName}\nThe bot prefix is: **${prefix}**`)
//     embed.setFooter(`© ${message.guild.me.displayName} | Total Commands: ${bot.commands.size}`, bot.user.displayAvatarURL);
//     categories.forEach(category => {
//         const dir = bot.commands.filter(c => c.config.category === category)
//         const capitalise = category.slice(0, 1).toUpperCase() + category.slice(1)
//         try {
//             embed.addField(`❯ ${capitalise} [${dir.size}]:`, dir.map(c => `\`${c.config.name}\``).join(" "))
//         } catch(e) {
//             console.log(e)
//         }
//     })
//     return message.channel.send(embed)
// } else {
//     let command = bot.commands.get(bot.aliases.get(args[0].toLowerCase()) || args[0].toLowerCase())
//     if(!command) return message.channel.send(embed.setTitle("Invalid Command.").setDescription(`Do \`${prefix}help\` for the list of the commands.`))
//     command = command.config
//     embed.setDescription(stripIndents`The bot's prefix is: \`${prefix}\`\n
//     **Command:** ${command.name.slice(0, 1).toUpperCase() + command.name.slice(1)}
//     **Description:** ${command.description || "No Description provided."}
//     **Usage:** ${command.usage ? `\`${prefix}${command.name} ${command.usage}\`` : "No Usage"}
//     **Accessible by:** ${command.accessableby || "Members"}
//     **Aliases:** ${command.aliases ? command.aliases.join(", ") : "None."}`)
//     return message.channel.send(embed)
// }