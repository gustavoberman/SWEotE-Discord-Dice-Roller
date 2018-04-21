function help(bot, message, params) {
    if (!params[0]) {
        message.channel.send(
            `\`\`\`prolog
type '!Help [topic]' for further information

!Roll: rolls any combination of Imperial Assault dice

\`\`\``);
    } else {
        let topic = params[0];
        switch (topic) {
            case "roll":
                message.channel.send(
                    `\`\`\`prolog
!Roll DiceIdentifiers "TEXT"
DICE IDENTIFIERS
    y = yellow
    g = green
    b = blue
    r = red
    k = black
    w = white
    "TEXT" assigns a label to the roll. (optional)
    
Examples:
    !roll yyyggbbk (must use single character identifiers)
    !roll 3g 1r 1w (must specify a number before each identifier)
\`\`\``);
                break;
            default:
                break;
        }
    }
}

exports.help = help;
