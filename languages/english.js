const { emojis, discord } = require("../config");

module.exports = {

    locale: "en_US",

    errors: {
        missingPerms: (neededPermissions) => `__**${emojis.error} Missing permissions**__\n\nI need the following permissions for this command to work properly: ${neededPermissions.map((p) => "`"+p+"`").join(", ")}`,
        disabled: () => `**${emojis.error} This command is currently disabled!**`,
        permLevel: (name) => `**${emojis.error} This command requires the permission : \`${name}\`!**`,
        sendPerm: () => `**${emojis.error} I don't have the permission to send messages in this channel.**`,
        highestRole: () => `**${emojis.error} I need a role that is superior to the given role!**`,

        user: () => `**${emojis.error} Unable to resolve the \`user\` argument.**`,
        role: () => `**${emojis.error} Unable to resolve the \`role\` argument.**`,
        channel: () => `**${emojis.error} Unable to resolve the \`channel\` argument.**`,
        action: () => `**${emojis.error} Unable to resolve the \`action\` argument.**`
    },
    
    // 
    // HELP DESCRIPTIONS
    // 

    help: {
        description: (guildName, prefix) => `I'm a multi-purpose, easy-to-use discord bot that makes music, moderation, polls, giveaways and other fun and useful things.\nThe default prefix is \`!\`.\nUse \`!help\` to get a list of commands. The prefix can be changed by using the "prefix" command. Do \`!help <command>\` for extended information on a command. \n\n**[Dashboard](https://calypso-bot.xyz/)** - **[Support Server](https://discord.gg/3y2ByKq)** - **[Invite me!](https://discord.com/api/oauth2/authorize?client_id=740539000615469106&permissions=8&scope=bot)**`,
        
        fields:{
            settings: () => ":wrench: Settings",
            moderation: () => ":hammer: Moderation",
            music: () => ":notes: Music",
            games: () => ":video_game: Games",
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
            cat: {
                description: (prefix) => "Random cat picture."
            },
            meme: {
                description: (prefix) => "Sends a meme into the channel."
            },
            rolldice: {
                description: (prefix) => "Rolls a dice."
            },
            creatememe: {
                description: (prefix) => "Create and send a meme in the channel."
            }
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
                description: (prefix) => "Gives all the informations about the bot."
            },
            whois: {
                description: (prefix) => "Returns user informations"
            },
            iplocate: {
                description: (prefix) => "Localise an ip or domain name."
            },
            avatar: {
                description: (prefix) => "Returns user's avatar"
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
                description: (prefix) => `Create a reaction poll by typing \`${prefix}poll "your message"\`. The bot will automatically add the reactions :thumbsup:, :thumbsdown:, and :person_shrugging:.\nCreate a reaction poll with multiple options by typing \`${prefix}poll "title" "Option1" "Option2" "Option3".\`.`
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
            loop:{
                description: (prefix) => "Loops the current playing song!"
            },
            playlist:{
                description: (prefix) => "Add a Playlist to the Server Queue. (Only Youtube supported)"
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
            },
            clear:{
                description: (prefix) => "Clear the current track queue."
            },
            shuffle:{
                description: (prefix) => "Shuffle the queue!"
            }
        },

        games:{
            mcprofile:{
                description: (prefix) => "Displays information from a Minecraft profile."
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
                description: (prefix) => `Sets a welcome message for the server.\n\nExamples:\n\`${prefix}configjoin message #general Welcome %member% to %server%!\` - Sends \`Welcome @alex to <your server name>!\` to #general when alex joins your server.\n\`${prefix}greeting dm Welcome %username%!\` - Welcomes a user to your server in direct messages. \n\`${prefix}greeting disable\` - Disables the greeting.\n\nVariables : \n- \`%member%\`\n- \`%member_name%\`\n- \`%member_tag%\`\n- \`%membercount%\`\n- \`%server%\``
            },
            configleave:{
                description: (prefix) => `Sets a message for when a user leaves the server. \n\nExamples: \n\`${prefix}configleave message #general %member_name% left %server%... bye bye %member_name%...\` - Sends \`alex left <your server>... bye bye alex...\` to #general when alex leaves your server. \n\`${prefix}configleave disable\` - Disables the farewell\n\nVariables : \n- \`%member%\`\n- \`%member_name%\`\n- \`%member_tag%\`\n- \`%membercount%\`\n- \`%server%\``
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
            setcolor:{
                description: (prefix) => "Change the color of the server's embeds."
            },
            testjoin:{
                description: (prefix) => "Test welcome messages."
            },
            testleave:{
                description: (prefix) => "Test leave messages."
            },
            ticket:{
                description: (prefix) => `Creates a panel to enable users to open a ticket with 1 click.\nNeed to create a role for support members.\n\nExemple:\n\`!ticket @Support\` - Only the role \`@Support\` and the concerned user will have access to the ticket.`
            }

        }
    },

    // 
    // COMMANDS 
    // 

    creatememe: {
        list: () => `**Meme Templates List**`,
        error: () => `**${emojis.error} No template matches.**`
    },

    info: {
        description: () => `I'm a multi-purpose discord bot that does music, moderation and other fun and useful things.\n\n**[Dashboard](https://calypso-bot.xyz/)** - **[Support Server](https://discord.gg/3y2ByKq)** - **[Invite me!](https://discord.com/api/oauth2/authorize?client_id=740539000615469106&permissions=8&scope=bot)**`,
        
        infos:{
            title: () =>"Informations:",
            content: (days, hours, minutes, seconds, date) => `\n**${emojis.arrow} Lead Developer: ** Alexmdz77#0001\n**${emojis.arrow} Developers: **Haz226#4212\n**${emojis.arrow} Library:** [discord.js 12.5.1](https://github.com/discordjs/discord.js)\n**${emojis.arrow} Uptime:** ${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds\n**${emojis.arrow} Creation date:** ${date}`
        },
        stats:{
            title: () => "Statistics:",
            content: (servers, memberCount, channels, memory, latency) => `\n**${emojis.arrow} Servers:** ${servers}\n**${emojis.arrow} Members:** ${memberCount}\n**${emojis.arrow} Channels:** ${channels}\n**${emojis.arrow} RAM:** ${memory} MB\n**${emojis.arrow} API Latency:** ${latency}ms`
        }
    },
    
    serverinfo: {
        infos:{
            title: () =>"Server Informations:",
            content: (name, id, owner, date) => `\n**${emojis.arrow} Name: ** ${name}\n**${emojis.arrow} ID: ** ${id}\n**${emojis.arrow} Owner:** ${owner}\n**${emojis.arrow} Created on:** ${date}`
        },
        settings:{
            title: () => "Server Settings:",
            content: (region, verlvl) => `\n**${emojis.arrow} Region:** ${region}\n**${emojis.arrow} Verification level:** ${verlvl}`
        },
        stats:{
            title: () => "Server Stats:",
            content: (memberCount, channels, roles) => `\n**${emojis.arrow} Members:** ${memberCount}\n**${emojis.arrow} Channels:** ${channels}\n**${emojis.arrow} Roles :** ${roles}`
        }
    },

    whois: {
        member:{
            title: () =>"Member Informations:",
            content: (displayName, joined, roles) => `**${emojis.arrow} Display name:** ${displayName}\n**${emojis.arrow} Joined at:** ${joined}\n**${emojis.arrow} Roles:** ${roles}`
        },
        user:{
            title: () => "User Informations:",
            content: (userid, username, usertag, created) => `**${emojis.arrow} ID:** ${userid}\n**${emojis.arrow} Username**: ${username}\n**${emojis.arrow} Tag**: ${usertag}\n**${emojis.arrow} Created at**: ${created}`
        },
        game:{
            title: () => "Currently Playing",
            content: (game) => `**${emojis.arrow} Name:** ${game}`
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
        error_nochannel: () => `**${emojis.error} There are no disabled channels on this server.**`,
        title: () => `**LIST OF DISABLED CHANNELS**`,
        list: (content) => `\n${content}`,
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

    setcolor: {
        error: (color) => `**${emojis.error} The color must be in Hexadecimal format. For example: \`#000000\` or \`000000\`.**`,
        disable: (color) => `**${emojis.success} Custom color disabled. Current color : \`${color}\`.**`,
        success: (color) => `**${emojis.success} Custom color has been updated! Current color : \`${color}\`.**`
    },

    clean: {
        error_limit: () => `**${emojis.error} I can't delete more than 100 messages.**`,
        error_date: () => `**${emojis.error} I can't delete messages older than 14 days.**`,
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
        missingPerms: (neededPermissions, channels) => `__**${emojis.error} Missing permissions**__\n\nI need the following permissions for this command to work properly: ${neededPermissions.map((p) => "`"+p+"`").join(", ")}\nIn the following channels: ${channels}`,
        error_user: () => `**${emojis.error} You cannot mute that \`user\`.**`,
        error_time: () => `**${emojis.error} The specified \`time\` must be between 2 minutes and 2 years.**`,
        already_muted: () => `**${emojis.error} This \`user\` is already muted**`,
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
        error_notmuted: () => `**${emojis.error} This \`user\` does not have the muted role.**`,
        description: (membertag) => `**${emojis.success} The user ${membertag} has been successfully unmuted!**`
    },

    history: {
        error_sanction: () => `**${emojis.error} That \`sanction\` couldn't be found.**`,
        error_nosanction: () => `**${emojis.error} That \`user\` has not received any sanctions.**`,
        clear: (mentionedUser, count) => `**${emojis.success} ${count} sanctions of the user <@${mentionedUser}> (id: ${mentionedUser}) have been removed.**`,
        title: () => `__HISTORY__ `,
        description: (mentionedUser, content) => `<@${mentionedUser}>'s (id: ${mentionedUser}) sanctions list :\n ${content}`,
        footer: (nb) => `... ${nb} other sanctions could not be displayed.`
    },

    music: {
        error_voicechannel: () => `**${emojis.error} You are not in a voice channel**`,
        error_notplaying: () => `**${emojis.error} I'm currently not playing music!**`,
    },

    loop: {
        yes: () => `**${emojis.success} I will now repeat the current playing song.**`,
        no: () => `**${emojis.success} I will not longer repeat the current playing song.**`
    },

    shuffle: {
        yes: () => `**${emojis.success} Successfully shuffled the queue!**`
    },

    playlist: {
        add: (videoCount, channel) => `${emojis.success} Added a Playlist to the queue with **${videoCount} songs**, that was **made by ${channel}**`
    },

    play: {
        duration: () => "Duration",
        requested: () => "Requested By",
        queue: () => "Added to queue : "
    },

    queue: {
        title: (server) => `**Queue for ${server}**`,
        nowplaying: (title, url, time, requester) => `__Now Playing :__\n[${title}](${url}) | ${time} - Requested By : *${requester}*\n`,
        upnext: () => `\n__Up Next :__\n`,
        list: (nb, title, url, time, requester) => `${nb}. [${title}](${url}) | ${time} - Requested By : *${requester}*\n`
    },
    
    skip: {
        skipping: (author) => `**${emojis.arrow} Skipped by __${author}__**`
    },

    volume: {
        error_volume: () => `**${emojis.error} You must enter a number between 0 and 200.**`
    },

    pause: {
        already_paused: () => `**${emojis.error} This music is already paused.**`,
        success: (title) => `**${emojis.success} Successfully paused __${title}__**`
    },

    resume: {
        isnt_paused: () => `**${emojis.error} This music isn't paused.**`,
        success: (title) => `**${emojis.success} Successfully resumed __${title}__**`
    },

    mcprofile: {
        title: (pseudo) => `**${emojis.mc}  Minecraft profile for ${pseudo}**`,
        skin: (skinUrl) => `Skin: [Open skin](${skinUrl})`,
        info: (i) => `Username Changes:\`${i}\``,
        history: () => `**Name History**`
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
    },

    iplocate:{
        error_getinfos: (query, message) => `**${emojis.error} Sorry but i can't get infos for: ${query} ; Error message: ${message}**`,
        title: (args, query) => `Informations for ${args} (${query})`,
        owner:{
            title: () => ":bust_in_silhouette: Owner:",
            content: (org, isp, as) => `**${emojis.arrow} Organisation:** ${org} \n**${emojis.arrow} Internet Service Provider:** ${isp} (${as})`
        },
        location:{
            title: () => ":earth_africa: Location:",
            content: (country, city) => `**${emojis.arrow} Country:** ${country} \n**${emojis.arrow} City:** ${city}`
        },
        other:{
            title: () => ":zap: Other:",
            content: (mobile, proxy, hosting) => `**${emojis.arrow} Mobile:** ${mobile} \n**${emojis.arrow} Proxy:** ${proxy} \n**${emojis.arrow} Hosting:** ${hosting}`
        }
    },

    avatar:{
        title: (name) => `Avatar for ${name}`,
        description: () => `Link as`
    },

    ticket:{
        error_role: () => `**${emojis.error} You must mention a support role!**`,
        role:{
            description: (rolename) => `**${emojis.success} The role ${rolename} is now the support role!**`
        },
        message:{
            title: () => `**Create a ticket**`,
            description: () => `To open a ticket, just add a reaction \"📝\" below, you will be notified in it.`
        },
        raw:{
            active: () => `You already have an active ticket!`,
            creation: (name, id, servername) => `**${emojis.success} ${name}, your ticket on the server __${servername}__ has just been created: <#${id}>.**`,
            control:{
                title: () => `**__Control of your ticket__**`,
                description: () => `You can close your current ticket by clicking on the reaction \"🔒\".`,
                title_confirm: () => `**__Control of your ticket__**`,
                description_confirm: () => `Do you really want to delete your ticket?`
            }
        }
    }

};