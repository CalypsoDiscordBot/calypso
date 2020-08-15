const Discord = require('discord.js');
const config = require('../config.json');
const db = require('quick.db');

module.exports.run = (client, message, args) => {

    if(!message.member.hasPermission("ADMINISTRATOR")) {return;}

    if(!args[0]){
        const embed = new Discord.MessageEmbed()
        .setColor(config.color)
        .setAuthor(`${client.user.username} Help`, client.user.displayAvatarURL())
      let command = client.commands.get("prefix")
      if(!command) return message.channel.send(embed.setTitle("Invalid Command.").setDescription(`Do \`${client.prefix}help\` for the list of the commands.`))
      command = command.help;
      embed.setTitle(`${client.prefix}${command.name}`)
      .setDescription(`${command.description || "No Description provided."}`)
      .addField("Usage", `${command.usage ? `\`${client.prefix}${command.name} ${command.usage}\`` : `\`${client.prefix}${command.name}\``}`, true)
      .addField("Aliases", `${(command.aliases && command.aliases.length !== 0) ? command.aliases.join(", ") : "None."}`, true)
      return message.channel.send(embed);
    }

    if(args[0] === "disable"){
        db.delete(`prefix_${message.guild.id}`);
    }
    db.set(`prefix_${message.guild.id}`, args[0]);
    let prefix = db.fetch(`prefix_${message.guild.id}`);
    if(!prefix){
        let prefix = config.prefix;
    }
    message.channel.send(`Successfully disabled the prefix. All commands should now be used like: \`${prefix}ping\` `);
}


module.exports.help = {
    name: 'prefix',
    description: "Sets the command prefix. \n\nExamples: \n+prefix ! - Sets the prefix to ! \n+prefix disable - Disables the custom command prefix.",
    category: "settings",
    usage:"<prefix>",
    accessableby: "Admin",
    aliases: []
};