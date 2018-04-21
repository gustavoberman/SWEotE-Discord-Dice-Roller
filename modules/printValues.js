const config = require("../config.js").config;

function print(str, bot, channelEmoji) {
    let guild = "";
    //if (channelEmoji === "genesys") guild = bot.guilds.get(config.genesys);
    guild = bot.guilds.get(config.swiaserver);
    return guild.emojis.find('name', str).toString();
}

exports.print = print;
