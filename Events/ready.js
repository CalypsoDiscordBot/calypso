module.exports = async(client) => {

  client.user.setPresence({
    status: 'online'
  })
  
  console.log(`${client.users.size} Membres ${client.channels.size} Channels ${client.guilds.size} Serveurs.`);
  client.user.setActivity("Démarrage du bot")
  
  //Status bot
  const activities_list = [
    "", 
    "Calypso BOT",
    "En développement",
  ];

  setInterval(() => {
    const index = Math.floor(Math.random() * (activities_list.length - 1) + 1); 
    client.user.setActivity(activities_list[index]); 
  }, 6000); 
};