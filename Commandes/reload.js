const Discord = require("discord.js");

module.exports.run = (client, message, args) => {
    if (message.author.id !== '216607323035009025' && message.author.id !== '334786552964186123' && message.author.id !== '278608007535919115') { return; }
    else {
        let commandName = args[0].toLowerCase();
        try{
            delete require.cache[require.resolve(`./${commandName}.js`)];
            client.commands.delete(commandName);
            const commande = require(`./${commandName}.js`);
            client.commands.set(commandName, commande);
            commande.help.aliases.forEach(alias => {
                client.aliases.set(alias, commande.help.name);
            })
            message.author.send(`Reload du fichier : ./${commandName}.js`)
        } catch (e) {
            message.author.send(`Echec du reload : ./${commandName}.js`)
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