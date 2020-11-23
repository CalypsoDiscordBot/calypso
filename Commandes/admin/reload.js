const Discord = require("discord.js");

module.exports.run = (client, message, args) => {
    if (message.author.id !== '216607323035009025' && message.author.id !== '334786552964186123' && message.author.id !== '278608007535919115') { return; }
    else {
        if(!args[0] || !args[1]){
            return message.channel.send("Error");
        }
        let dir = args[0].toLowerCase();
        let commandName = args[1].toLowerCase();
        try{
            delete require.cache[require.resolve(`../${dir}/${commandName}.js`)];
            client.commands.delete(commandName);
            const commande = require(`../${dir}/${commandName}.js`);
            client.commands.set(commandName, commande);
            commande.help.aliases.forEach(alias => {
                client.aliases.set(alias, commande.help.name);
            })
            message.channel.send(`Reload du fichier : ../${dir}/${commandName}.js`)
        } catch (e) {
            message.channel.send(`Echec du reload : ../${dir}/${commandName}.js`)
        }
    }
};

module.exports.help = {
    name: 'reload',
    description: "",
    category: "admin",
    usage:"",
    accessableby: "Admins",
    aliases: []
};