const Discord = require('discord.js');
const config = require('../config.json');
const db = require('quick.db');

module.exports.run = (client, message, args) => {

    if(!message.member.hasPermission("ADMINISTRATOR")) {return;}

    let role = message.mentions.roles.first() || message.guild.roles.cache.find((c) => c.name === args[0]);

    if(!args[0]){
        const embed = new Discord.MessageEmbed()
        .setColor(config.color)
        .setAuthor(`${client.user.username} Help`, client.user.displayAvatarURL())
      let command = client.commands.get("accessrole")
      if(!command) return message.channel.send(embed.setTitle("Invalid Command.").setDescription(`Do \`${config.prefix}help\` for the list of the commands.`))
      command = command.help
      embed.setTitle(`${config.prefix}${command.name}`)
      .setDescription(`${command.description || "No Description provided."}`)
      .addField("Usage", `${command.usage ? `\`${config.prefix}${command.name} ${command.usage}\`` : "No Usage"}`, true)
      .addField("Aliases", `${command.aliases ? command.aliases.join(", ") : "None."}`, true)
      return message.channel.send(embed)
    }
    else if (args[0] === "disable"){
        db.delete(`accessrole_${message.guild.id}`);
        return message.channel.send("Successfully disabled the access role.")
    }
    
    if (role){
        db.fetch(`accessrole_${message.guild.id}`, role.id);
        return message.channel.send("Successfully set the access role.")
    }
    else{
        return message.channel.send("Unable to resolve the role argument.")
    }
};

module.exports.help = {
    name: 'accessrole',
    description: "Sets a role that people have to have to use the bot. Use `!accessrole disable` to disable",
    category: "settings",
    usage:"<role>",
    accessableby: "Admin"
};