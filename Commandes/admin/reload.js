const Discord = require("discord.js");
const util = require("util");
const fs = require("fs");
const readdir = util.promisify(fs.readdir);

module.exports.run = async (client, message, args) => {
    if (message.author.id !== '216607323035009025' && message.author.id !== '334786552964186123' && message.author.id !== '278608007535919115') { return; }
    else {
        if(!args[0] || !args[1]){
            let directories = await readdir("./Commandes/");
            directories.forEach(async (dir) => {
                let commands = await readdir("./Commandes/"+dir+"/");
                commands.filter(f => f.split('.').pop() === 'js').forEach((f) => {
                    try {
                        delete require.cache[require.resolve(`../../Commandes/${dir}/${f}`)];
                        let commande = require(`../../Commandes/${dir}/${f}`);
                        client.commands.set(commande.help.name, commande);
                        commande.help.aliases.forEach(alias => {
                            client.aliases.set(alias, commande.help.name);
                        })
                        // message.channel.send(`Reload de la commande : ${f}`);
                    } catch (e) {
                        message.channel.send(`Unable to load command ${f}: ${e}`);
                    }
                });
            });
            message.channel.send(`Reload terminé !`)
        } else {
            let dir = args[0].toLowerCase();
            let commandName = args[1].toLowerCase();
            try{
                delete require.cache[require.resolve(`../${dir}/${commandName}.js`)];
                client.commands.delete(commandName);
                let commande = require(`../${dir}/${commandName}.js`);
                client.commands.set(commandName, commande);
                commande.help.aliases.forEach(alias => {
                    client.aliases.set(alias, commande.help.name);
                })
                message.channel.send(`Reload du fichier : ../${dir}/${commandName}.js`)
            } catch (e) {
                message.channel.send(`Echec du reload : ../${dir}/${commandName}.js`)
            }
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