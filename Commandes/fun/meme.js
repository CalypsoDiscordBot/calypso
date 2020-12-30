const randomPuppy = require('random-puppy');
const config = require('../../config.json');
const { inlineReply } = require("../../ExtendedMessage");

module.exports.run = async (client, message, args) => {

    let reddit = [
        "meme",
        "animemes",
        "MemesOfAnime",
        "animememes",
        "AnimeFunny",
        "dankmemes",
        "dankmeme",
        "wholesomememes",
        "MemeEconomy",
        "techsupportanimals",
        "meirl",
        "me_irl",
        "2meirl4meirl",
        "AdviceAnimals"
    ]

    let subreddit = reddit[Math.floor(Math.random() * reddit.length)];

    randomPuppy(subreddit).then(async url => {
            await message.inlineReply({
                embed: {
                    color: client.color,
                    image: { url: url }
                }
            });
    }).catch(err => console.error(err));
};

module.exports.help = {
    name: 'meme',
    description: "Sends a meme into the channel.",
    category: "fun",
    usage:"",
    accessableby: "Members",
    aliases: []
}