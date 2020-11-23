const db = require('quick.db');
const formatDate = require('dateformat');

module.exports = (client, oldState, newState) => {

    let server = client.servers[oldState.guild.id];
    // check if someone connects or disconnects
    if (oldState.channelID === null || typeof oldState.channelID == 'undefined') return;
    // check if the bot is disconnecting
    if (newState.id !== client.user.id) return;
    // clear the queue
    for(var i = server.queue.length -1; i>= 0; i--){
        server.queue.splice(i, 1);
    }
    
};