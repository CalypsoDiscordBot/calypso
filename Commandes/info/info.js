const Discord = require('discord.js');
var dateFormat = require('dateformat');
var os = require('os');
const config = require('../../config.json');

exports.run = (client, message, args) => {

    function getMemoryUsage() {
        let total_rss = require('fs').readFileSync("/sys/fs/cgroup/memory/memory.stat", "utf8").split("\n").filter(l => l.startsWith("total_rss"))[0].split(" ")[1]; 
        return Math.round( Number(total_rss) / 1e6 ) - 60;
    }


    var usedMemory = os.totalmem() -os.freemem(), totalMemory = os.totalmem();
    
    var  getpercentage = ((usedMemory/totalMemory) * 100).toFixed(2) + '%'
    
    // console.log("Memory used in MB", (usedMemory/ Math.pow(1024, 2)).toFixed(2))

    let memory = (usedMemory/ Math.pow(1024, 2)).toFixed(2) // (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2); // getMemoryUsage();
    
    let count = 0;
    client.guilds.cache.forEach(async (guild) => {
		let users = 0;
		await guild.members.fetch().then((g) => {
			users = g.filter((member) => !member.user.bot).size;
		});
		count += users;
		// console.log(`${count} Members ${client.channels.cache.size} Channels ${client.guilds.cache.size} Servers.`);
        client.membercount = count;
    });
     
    let latency = Math.round(client.ws.ping);

    let totalSeconds = (client.uptime / 1000);
    let days = Math.floor(totalSeconds / 86400);
    totalSeconds %= 86400;
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = Math.floor(totalSeconds % 60);

    let creation = dateFormat("May 8 2020", "d mmmm yyyy");

    var info = new Discord.MessageEmbed()
        .setAuthor(client.user.username, client.user.displayAvatarURL())
        .setColor(config.color)

        .setDescription(message.language.info.description(client.prefix))

        .addField(message.language.info.infos.title(), message.language.info.infos.content(days, hours, minutes, seconds, creation))

        .addField(message.language.info.stats.title(), message.language.info.stats.content(client.guilds.cache.size, client.membercount, client.channels.cache.size, memory, latency ))

        .setFooter(`Calypso`)
        .setTimestamp()
    message.channel.send(info)
}

module.exports.help = {
    name: "info",
    description: "",
    category: "info",
    usage:"",
    accessableby: "Members",
    aliases: []
}
