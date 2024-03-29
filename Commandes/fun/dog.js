const config = require('../../config.json');
const request = require("request");

module.exports.run = (client, message) => {
    request("https://dog.ceo/api/breeds/image/random", (error, res, body) => {
        if (error) { return message.channel.send("Error-API"); }
        if (res.statusCode !== 200) { 
          return message.channel.send(`Error: ${res.statusCode}`); 
        }
        var body = JSON.parse(body);
        message.channel.send({
            embed: {
                color: client.color,
                image: { url: body.message }
            }
        })
    });
}
module.exports.help = {
    name: 'dog',
    description: "Random dog picture.",
    category: "fun",
    usage:"",
    accessableby: "Members",
    aliases: []
}