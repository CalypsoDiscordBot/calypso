module.exports = async(client) => {

  client.user.setPresence({
    status: 'online'
  })
  
  console.log(`${client.users.cache.size} Membres ${client.channels.cache.size} Channels ${client.guilds.cache.size} Serveurs.`);
  client.user.setActivity("Démarrage du bot")
  
  //Status bot
  const activities_list = [
    "", 
    "Calypso Bot",
    "En développement",
  ];

  setInterval(() => {
    const index = Math.floor(Math.random() * (activities_list.length - 1) + 1); 
    client.user.setActivity(activities_list[index]); 
  }, 6000); 
};