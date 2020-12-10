const Discord = require('discord.js');
const config = require('../../config.json');
const request = require("request");
const dateformat = require("dateformat");
const ta = require('time-ago');
const atob = require('atob');

exports.run = (client, message, args) => {

    if(!args[0]){return;}

    let pseudo = args[0];

    request(`https://api.mojang.com/users/profiles/minecraft/${pseudo}`, (error, res, body) => {
        if (error) { return; }
        if (res.statusCode !== 200) { 
          return; 
        }
        var body = JSON.parse(body);
        let uuidsimple = body.id
        let uuidSplit = uuidsimple.split('');
        let uuidSexy = `${uuidSplit.splice(0,8).join('')}-${uuidSplit.splice(0,4).join('')}-${uuidSplit.splice(0,4).join('')}-${uuidSplit.splice(0,4).join('')}-${uuidSplit.splice(0,12).join('')}`
        let uuid = `\`${uuidsimple}\`\n\`${uuidSexy}\``;

        request(`https://api.mojang.com/user/profiles/${uuidsimple}/names`, (error, res, body) => {
            if (error) { return; }
            if (res.statusCode !== 200) { 
              return; 
            }
            var body = JSON.parse(body);
            let i = 0;
            let content = "";
            body.forEach(element => {
                i++;
                if(element.changedToAt){
                    content = `**${i}.** \`${element.name}\` - ${dateformat(element.changedToAt, "mediumDate")}, ${ta.ago(element.changedToAt)}.\n` + content;
                } else {
                    content = `**${i}.** \`${element.name}\` - First username.\n` + content;
                }
            });

            request(`https://sessionserver.mojang.com/session/minecraft/profile/${uuidsimple}`, (error, res, body) => {
                if (error) { return; }
                if (res.statusCode !== 200) { 
                return; 
                }
                var body = JSON.parse(body);
                let profile = JSON.parse(atob(body.properties[0].value));
                let skinUrl = profile.textures.SKIN.url
                // message.channel.send(content);
                
                const embed = new Discord.MessageEmbed()
                    .setTitle(message.language.mcprofile.title(pseudo)) // Minecraft profile for ${pseudo}
                    .setThumbnail(`https://visage.surgeplay.com/bust/${uuidsimple}`)
                    .setColor(client.color)
                    .addField(`**UUID**`, uuid)
                    .addField(`**Skin**`, message.language.mcprofile.skin(skinUrl), true)
                    .addField(`**Information**`, message.language.mcprofile.info(i-1), true)
                    .addField(message.language.mcprofile.history(), content)
                    .setFooter(pseudo)
                    .setTimestamp()

                return message.channel.send(embed);
            });
        });
        // message.channel.send(uuid);
    });
    
    
}

module.exports.help = {
    name: "mcprofile",
    description: "",
    category: "games",
    usage:"",
    accessableby: "Members",
    aliases: ['mc']
}
