const Discord = require('discord.js');
const config = require('../../config.json');

module.exports.run = (client, message, args) => {

    if(!args[0]){
      message.channel.send({
        embed: {
          description: message.language.help.description(message.guild.name, client.prefix),
          color: client.color,
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
             name: message.language.help.fields.settings(),
             value: `\`${client.prefix}prefix\`, \`${client.prefix}setlang\`, \`${client.prefix}setcolor\`, \`${client.prefix}configjoin\`, \`${client.prefix}configleave\`, \`${client.prefix}testjoin\`, \`${client.prefix}testleave\`, \`${client.prefix}autorole\`, \`${client.prefix}membercount\`,  \`${client.prefix}ticket\`, \`${client.prefix}accessrole\`, \`${client.prefix}channeltoggle\``
           },
           {
             name: message.language.help.fields.moderation(),
             value: `\`${client.prefix}ban\`, \`${client.prefix}mute\`, \`${client.prefix}kick\`, \`${client.prefix}unban\`, \`${client.prefix}unmute\`, \`${client.prefix}history\`, \`${client.prefix}clean\`, \`${client.prefix}poll\`, \`${client.prefix}giveaway\`, \`${client.prefix}reroll\`, \`${client.prefix}say\`, \`${client.prefix}embedsay\``
           },
           {
             name: message.language.help.fields.music(),
             value: `\`${client.prefix}play\`, \`${client.prefix}leave\`, \`${client.prefix}resume\`, \`${client.prefix}pause\`, \`${client.prefix}skip\`, \`${client.prefix}queue\`, \`${client.prefix}clear\`, \`${client.prefix}volume\``
           },
           {
             name: message.language.help.fields.fun(),
             value: `\`${client.prefix}meme\`, \`${client.prefix}dog\`, \`${client.prefix}cat\`, \`${client.prefix}coinflip\`, \`${client.prefix}rolldice\``
           },
           {
             name: message.language.help.fields.info(),
             value: `\`${client.prefix}help\`, \`${client.prefix}info\`, \`${client.prefix}whois\`, \`${client.prefix}avatar\`, \`${client.prefix}serverinfo\`, \`${client.prefix}ping\`, \`${client.prefix}iplocate\`, \`${client.prefix}vote\``
           }
          ]
        }
      });
    }
    else{
      const embed = new Discord.MessageEmbed()
        .setColor(client.color)
        .setAuthor(`${client.user.username} Help`, client.user.displayAvatarURL())
      let command = client.commands.get(client.aliases.get(args[0].toLowerCase()) || args[0].toLowerCase())
      if(!command) return message.channel.send(embed.setTitle("Invalid Command.").setDescription(`Do \`${client.prefix}help\` for the list of the commands.`))
      command = command.help

      // GET DESCRIPTION 
      // console.log(message.language.help[command.name.toLowerCase()].description(client.prefix));
      let description = "No description provided.";
      if(command.category && command.name && message.language.help[command.category.toLowerCase()] && message.language.help[command.category.toLowerCase()][command.name.toLowerCase()]){
        description = message.language.help[command.category.toLowerCase()][command.name.toLowerCase()].description(client.prefix);
        if(!description){description = "No description provided.";}
      }
      // SET EMBED
      embed.setTitle(`${client.prefix}${command.name}`)
      .setDescription(`${description}`)
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
//         .setColor(client.color)
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