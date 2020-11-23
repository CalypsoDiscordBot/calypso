const Discord = require('discord.js')
const request = require('request');
const config = require('../../config.json');


module.exports.run = async(client, message, args) => {

    if (!args[0]) {
        let content = ["iplocate"];
        return client.commands.get("help").run(client, message, content);
    }
    request(`http://ip-api.com/json/${args[0]}?fields=status,message,country,countryCode,region,regionName,city,zip,lat,lon,timezone,isp,org,as,mobile,proxy,hosting,query`, function(error, response, body) {
        body = JSON.parse(body)

        if (body.status == "fail") {

            const embed = new Discord.MessageEmbed()
            .setColor(config.color)
            .setDescription(message.language.iplocate.error_getinfos(body.query, body.message))
            return message.channel.send(embed);

        } else if (body.status = "success") {
            let embed = new Discord.MessageEmbed()
                .setTitle(message.language.iplocate.title(args[0], body.query))
                .setColor(config.color)
                .addField(message.language.iplocate.owner.title(), message.language.iplocate.owner.content(body.org, body.isp, body.as))
                .addField(message.language.iplocate.location.title(), message.language.iplocate.location.content(body.country, body.city))
                .addField(message.language.iplocate.other.title(), message.language.iplocate.other.content(body.mobile, body.proxy, body.hosting))
            message.channel.send(embed);
        }


    });


}
module.exports.help = {
    name: 'iplocate',
    description: "Localise an ip or domain name.",
    category: "info",
    usage:"",
    accessableby: "Members",
    aliases: ['locate','ip']
}