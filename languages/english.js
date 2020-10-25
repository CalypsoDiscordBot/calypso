const { emojis, discord } = require("../config");

module.exports = {

    locale: "en_US",

    errors: {
        missingPerms: (neededPermissions) => `__**${emojis.error} Missing permissions**__\n\nI need the following permissions for this command to work properly: ${neededPermissions.map((p) => "`"+p+"`").join(", ")}`,
        disabled: () => `${emojis.error} This command is currently disabled!`,
        permLevel: (name) => `${emojis.error} This command requires the permission : \`${name}\`!`,
        sendPerm: () => `${emojis.error} I don't have the permission to send messages in this channel.`,

        user: () => `${emojis.error} Unable to resolve the \`user\` argument.`,
        role: () => `${emojis.error} Unable to resolve the \`role\` argument.`,
        channel: () => `${emojis.error} Unable to resolve the \`channel\` argument.`,
        action: () => `${emojis.error} Unable to resolve the \`action\` argument.`
    },
    
    // 
    // HELP DESCRIPTIONS
    // 

    help: {
        description: (guildName, prefix) => `I'm a multi-purpose discord bot that does music, moderation and other fun and useful things. 
        Do \`${prefix}help <command>\` for extended information on a command.
        \n[Add to your Discord server](https://discord.com/api/oauth2/authorize?client_id=740539000615469106&permissions=8&scope=bot) | [Join our Discord server](https://discord.gg/3y2ByKq)`,
        
        fields:{
            settings: () => ":wrench: Settings",
            moderation: () => ":hammer: Moderation",
            music: () => ":notes: Music",
            fun: () => ":100: Fun",
            info: () => ":information_source: Info"
        },

        fun:{
            coinflip: {
                description: (prefix) => "Flips a coin."
            },
            dog: {
                description: (prefix) => "Random dog picture."
            },
            meme: {
                description: (prefix) => "Sends a meme into the channel."
            },
            rolldice: {
                description: (prefix) => "Rolls a dice."
            },
        },
        
        info:{
            help: {
                description: (prefix) => ""
            },
            vote: {
                description: (prefix) => ""
            },
            serverinfo: {
                description: (prefix) => "Gives all the informations about the server."
            },
            ping: {
                description: (prefix) => "Pong!"
            },
            info: {
                description: (prefix) => ""
            },
            whois: {
                description: (prefix) => "Returns user informations"
            }
        },

        moderation:{
            ban: {
                description: (prefix) => "Bans a user."
            },
            clean: {
                description: (prefix) => "Cleans messages from a channel."
            },
            embedsay: {
                description: (prefix) => "Let's the bot say an embed message."
            },
            giveaway: {
                description: (prefix) => "Randomly picks a member that reacted to the giveaway message."
            },
            history: {
                description: (prefix) => "Shows a user's sanction history."
            },
            kick: {
                description: (prefix) => "Kicks a user."
            },
            mute: {
                description: (prefix) => "Mutes a user."
            },
            poll: {
                description: (prefix) => `Create a reaction poll by typing \`${prefix}poll "your message"\`. The bot will automatically add the reactions :thumbsup:, :thumbsdown:, and :person_shrugging:.\nCreate a reaction poll with multiple options by typing \`${prefix}poll {title} [Option1] [Option2] [Option3]\`.`
            },
            reroll: {
                description: (prefix) => "Randomly picks a member that reacted to the giveaway message."
            },
            say: {
                description: (prefix) => "Let's the bot say a message."
            },
            unban: {
                description: (prefix) => "Unban a user."
            },
            unmute: {
                description: (prefix) => "Unmute a user."
            },
        },

        music:{
            leave:{
                description: (prefix) => "Leaves the voice channel."
            },
            play:{
                description: (prefix) => `Plays a track. \n\nExamples: \n\`${prefix}play pnl blanka\` - Searches youtube for 'pnl blanka' \n\`${prefix}play https://youtu.be/u8bHjdljyLw\` - Plays a youtube video, using the direct URL`
            },
            queue:{
                description: (prefix) => "Shows the current track queue."
            },
            skip:{
                description: (prefix) => ""
            },
            volume:{
                description: (prefix) => "Sets the volume of the music playing."
            }
        },

        settings:{
            accessrole:{
                description: (prefix) => `Sets a role that people have to have to use the bot. Use \`${prefix}accessrole disable\` to disable`
            },
            autorole:{
                description: (prefix) => `Assigns roles. Ensure the role for me is above the role you want me to give, otherwise I wont have permission.\n\nExemples:\n\`${prefix}autorole add Members\` - Gives the role \`Members\` to users on join.\n\`${prefix}autorole remove Members\` - Remove the autorole for \`Members\`.\n\`${prefix}autorole list\` - List all the autoroles` 
            },
            channeltoggle:{
                description: (prefix) => "Disables commands in a channel."
            },
            configjoin:{
                description: (prefix) => `Sets a welcome message for the server.\n\n Examples: \n\`${prefix}configjoin #general Welcome %member% to %server%!\` - Sends \`Welcome @alex to <your server name>!\` to #general when alex joins your server. \n\`${prefix}greeting dm Welcome %username%!\` - Welcomes a user to your server in direct messages. \n\`${prefix}greeting disable\` - Disables the greeting.`
            },
            configleave:{
                description: (prefix) => `Sets a message for when a user leaves the server. \n\nExamples: \n\`${prefix}configleave #general %username% left %server%... bye bye %username%...\` - Sends \`alex left <your server>... bye bye alex...\` to #general when alex leaves your server. \n\`${prefix}configleave disable\` - Disables the farewell`
            },
            membercount:{
                description: (prefix) => `Display the number of members in a channel.\n\nExemples:\n\`${prefix}membercount %count% Members\` - Display \`142 Members\`\n\`${prefix}membercount disable\` - Disable the membercount.`
            },
            prefix:{
                description: (prefix) => `Sets the command prefix. \n\nExamples: \n\`${prefix}prefix !\` - Sets the prefix to ! \n\`${prefix}prefix disable\` - Disables the custom command prefix.`
            },
            setlang:{
                description: (prefix) => ""
            },
            testjoin:{
                description: (prefix) => "Test welcome messages."
            },
            testleave:{
                description: (prefix) => "Test leave messages."
            }

        }
    },

    // 
    // COMMANDS 
    // 

    info: {
        description: () => `I'm a multi-purpose discord bot that does music, moderation and other fun and useful things. 
        [Add to your Discord server](https://discord.com/api/oauth2/authorize?client_id=740539000615469106&permissions=8&scope=bot | [Join our Discord server](https://discord.gg/3y2ByKq)`
    },
    
    serverinfo: {
        infos:{
            title: () =>"Server Informations:",
            content: (name, id, owner, date) => `
            **▫️ Name: ** ${name}
            **▫️ ID: ** ${id}
            **▫️ Owner:** ${owner}
            **▫️ Created on:** ${date}`
        },
        settings:{
            title: () => "Server Settings test:",
            content: (region, verlvl) => `
            **▫️ Region:** ${region}
            **▫️ Verification level:** ${verlvl}`
        },
        stats:{
            title: () => "Server Stats:",
            content: (memberCount, channels, roles) => `
            **▫️ Members:** ${memberCount}
            **▫️ Channels:** ${channels}
            **▫️ Roles :** ${roles}`
        }
    },

    whois: {
        member:{
            title: () =>"Member Informations:",
            content: (displayName, joined, roles) => `**▫️ Display name:** ${displayName}
            **▫️ Joined at:** ${joined}
            **▫️ Roles:** ${roles}`
        },
        user:{
            title: () => "User Informations:",
            content: (userid, username, usertag, created) => `**▫️ ID:** ${userid}
            **▫️ Username**: ${username}
            **▫️ Tag**: ${usertag}
            **▫️ Created at**: ${created}`
        },
        game:{
            title: () => "Currently Playing",
            content: (game) => `**▫️ Name:** ${game}`
        }
    },

    accessrole: {
        on: () => `**${emojis.success} Successfully set the accessrole.**`,
        off: () => `**${emojis.success} Successfully disable the accessrole.**`
    },

    autorole: {
        on: (rolename) => `**${emojis.success} Successfully added \`${rolename}\`.**`,
        off: (rolename) => `**${emojis.success} Successfully removed \`${rolename}\`.**`
    },

    channeltoggle: {
        on: () => `**${emojis.success} Enabled commands in this channel.**`,
        off: () => `**${emojis.error} Disabled commands in this channel.**`,
        onchannel: (channel) => `**${emojis.success} Enabled commands in ${channel}.**`,
        offchannel: (channel) => `**${emojis.error} Disabled commands in ${channel}.**`
    },

    membercount:{
        on: () => `**${emojis.success} Successfully created the MemberCount channel.**`,
        off: () => `**${emojis.success} Successfully deleted the MemberCount channel.**`,
        error_previous: () => `**${emojis.error} You must first disable the previous MemberCount channel.**`,
        error_disable: () => `**${emojis.error} There is no MemberCount channel on your server.**`
    },

    configjoin: {
        on: () => `**${emojis.success} Successfully set the welcome message.**`,
        off: () => `**${emojis.success} Successfully disabled the welcome message.**`
    },

    configleave: {
        on: () => `**${emojis.success} Successfully set the leave message.**`,
        off: () => `**${emojis.success} Successfully disabled the leave message.**`
    },

    prefix: {
        disable: (prefix) => `**${emojis.success} Successfully disabled the prefix. All commands should now be used like: \`${prefix}help\`**`,
        success: (prefix) => `**${emojis.success} Server prefix has been updated! All commands should now be used like: \`${prefix}help\`.**`
    },

    testjoin: {
        title: () => `**Test welcome messages**`,
        error: () => `**${emojis.error} You didn't configured the welcome message.**`
    },

    testleave: {
        title: () => `**Test leave messages**`,
        error: () => `**${emojis.error} You didn't configured the leave message.**`
    },

    setlang: {
        invalid: () => `**${emojis.error} You must write a valid language!\n\n:flag_fr: Français (\`fr\`)\n:flag_gb: English (\`en\`)**`,
        success: () => `**${emojis.success} Language has been updated!**`
    },

    clean: {
        success: (size) => `**${emojis.success} __${size}__ messages have been deleted!**`
    },

    ban: {
        error_user: () => `**${emojis.error} I cannot ban that \`user\`.**`,
        error_time: () => `**${emojis.error} The specified \`time\` must be between 2 minutes and 2 years.**`,
        title: (mentionedUser, authortag) => `<a:Banned:745761570537341029> ${mentionedUser.user.tag} (id: ${mentionedUser.id}) has been banned by ${authortag}`,
        description: (time, reason) => `**Duration:** ${time}\n**Reason:** ${reason}`,
        dm: {
            title: (servername, authortag) => `<a:Banned:745761570537341029> You have been banned from ${servername} by ${authortag}`,
            description: (time, reason) => `**Duration:** ${time}\n**Reason:** ${reason}`
        }
    },

    kick: {
        error_user: () => `**${emojis.error} I cannot kick that \`user\`.**`,
        description: (mentionedUser, authortag, reason) => `${mentionedUser} (id: ${mentionedUser.id}) has been kicked by ${authortag}, for: ${reason}.`,
        dm: {
            title: (servername, authortag) => `You have been kicked from ${servername} by ${authortag}`,
            description: (reason) => `\n**Reason**: ${reason}`,
        }
    },

    mute: {
        error_user: () => `**${emojis.error} You cannot mute that \`user\`.**`,
        error_time: () => `**${emojis.error} The specified \`time\` must be between 2 minutes and 2 years.**`,
        title: (mentionedUser, authortag) => `<a:Banned:745761570537341029> ${mentionedUser.user.tag} (id: ${mentionedUser.id}) has been muted by ${authortag}`,
        description: (time, reason) => `**Duration:** ${time}\n**Reason:** ${reason}`,
        dm: {
            title: (servername, authortag) => `<a:Banned:745761570537341029> You have been muted from ${servername} by ${authortag}`,
            description: (time, reason) => `**Duration:** ${time}\n**Reason:** ${reason}`
        }
    },

    unban: {
        error_user: () => `**${emojis.error} I couldn't find that \`user\` in the banlist.**`,
        description: (membertag) => `**${emojis.success} The user ${membertag} has been successfully unbanned!**`
    },

    unmute: {
        error_user: () => `**${emojis.error} You cannot unmute that \`user\`.**`,
        error_role: () => `**${emojis.error} The \`muted role\` doesn't exist.**`,
        description: (membertag) => `**${emojis.success} The user ${membertag} has been successfully unmuted!**`
    },

    history: {
        error_sanction: () => `**${emojis.error} That \`sanction\` couldn't be found.**`,
        error_nosanction: () => `**${emojis.error} That \`user\` has not received any sanctions.**`,
        title: () => `__HISTORY__ `,
        description: (mentionedUser, content) => `<@${mentionedUser}>'s (id: ${mentionedUser}) sanctions list :\n ${content}`,
        footer: (nb) => `... ${nb} other sanctions could not be displayed.`
    },

    music: {
        error_voicechannel: () => `**${emojis.error} You are not in a voice channel**`,
        error_notplaying: () => `**${emojis.error} I'm currently not playing music!**`,
    },
    
    play: {
        duration: () => "Duration",
        requested: () => "Requested By",
        queue: () => "Added to queue : "
    },

    queue: {
        nowplaying: (title, url, time, requester) => `__Now Playing :__\n[${title}](${url}) | ${time} - Requested By : *${requester}*\n`,
        upnext: () => `\n__Up Next :__\n`,
        list: (nb, title, url, time, requester) => `${nb}. [${title}](${url}) | ${time} - Requested By : *${requester}*\n`
    },
    
    skip: {
        skipping: () => "Skipping..."
    },

    volume: {
        error_volume: () => `**${emojis.error} You must enter a number between 0 and 200.**`
    },

    giveaway: {
        giveawayStarted: () => "🎉🎉 **GIVEAWAY** 🎉🎉",
        giveawayEnded: () => "🎉🎉 **GIVEAWAY ENDED** 🎉🎉",
        timeRemaining: () => "Time remaining: **{duration}**!",
        inviteToParticipate: () => "React with 🎉 to participate!",
        winMessage: () => "Congratulations, {winners}! You won **{prize}**!",
        embedFooter: () => "Giveaways",
        noWinner: () => "Giveaway cancelled, no valid participations.",
        hostedBy: () => "Hosted by: {user}",
        winners: () => "winner(s)",
        endedAt: () => "Ended at",
        units: {
            seconds: () => "seconds",
            minutes: () => "minutes",
            hours: () => "hours",
            days: () => "days"
        }
    },

    reroll:{
        messages: {
            congrat: () => ":tada: New winner(s) : {winners}! Congratulations!",
            error: () => "No valid participations, no winners can be chosen!"
        },
        error: (args) => `${emojis.error} No giveaway found for ${args}, please check and try again.`
    }


};