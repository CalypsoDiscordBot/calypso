const config = require('../../config.json');
const request = require("request");

module.exports.run = (__client, message) => {
    request("https://aws.random.cat/meow", (error, res, body) => {
        if (error) { return message.channel.send("Error-API"); }
        if (res.statusCode !== 200) { 
          return message.channel.send(`Error: ${res.statusCode}`); 
        }
        var body = JSON.parse(body);
        message.channel.send({
            embed: {
                color: client.color,
                image: { url: body.file }
            }
        })
    });
}
module.exports.help = {
    name: 'cat',
    description: "Random cat picture.",
    category: "fun",
    usage:"",
    accessableby: "Members",
    aliases: []
}