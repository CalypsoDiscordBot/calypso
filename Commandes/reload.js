const Discord = require("discord.js");

module.exports.run = (client, message, args) => {
    if (message.author.id !== '216607323035009025' && message.author.id !== '334786552964186123') { return; }
    else {
        let commandName = args[0].toLowerCase();
        try{
            delete require.cache[require.resolve(`./${commandName}.js`)];
            client.commands.delete(commandName);
            const pull = require(`./${commandName}.js`);
            client.commands.set(commandName, pull);
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