const Discord = require("discord.js")
const client = new Discord.Client();
const fs = require("fs");
const config = require("./config.json");

//Console logs
client.on('ready', () => {
  console.log(`${client.users.size} Membres ${client.channels.size} Channels ${client.guilds.size} Serveurs.`);
  client.user.setActivity("Démarrage du bot")
});

//Categorie Commandes et Events
client.commands = new Discord.Collection();

fs.readdir("./Commandes/", (error, f) => {
    if(error) console.log(error);

    let commandes = f.filter(f => f.split(".").pop() === "js");
    if(commandes.length <= 0) return console.log("0 commandes !");

    commandes.forEach((f) => {
        let commande = require(`./Commandes/${f}`);
        console.log(`${f} commande chargée !`);

        client.commands.set(commande.help.name, commande);
    });
});

fs.readdir("./Events/", (error, f) => {
    if(error) console.log(error);
    console.log(`${f.length} events chargés`);

    f.forEach((f) => {
       const events = require(`./Events/${f}`);
       const event = f.split(".")[0];

      client.on(event, events.bind(null, client));
  });
});

//Status bot
const activities_list = [
  "", 
  "Calypso BOT",
  "En développement",
  ];

client.on('ready', () => {
  setInterval(() => {
      const index = Math.floor(Math.random() * (activities_list.length - 1) + 1); 
      client.user.setActivity(activities_list[index]); 
  }, 6000); 
});

//Token
client.login(config.token)