const config = require("../config.js");
const diceFaces = require('./dice.js').dice;
const dice = require("./misc.js").dice;
const printEmoji = require("./printValues.js").print;
const writeData = require('./data').writeData;

async function roll(bot, message, params, channelEmoji, desc, diceResult, diceOrder) {
    return new Promise(async resolve => {
        if (!diceResult) diceResult = initdiceResult();
        if (!params[0]) {
            message.reply('No dice rolled.');
            return;
        }
        //process each identifier and set it into an array
        if (!diceOrder) diceOrder = await processType(message, params);
        if (diceOrder === 0) return;
        //rolls each die and begins rollResults
        diceOrder.forEach((die) => {
            if (!diceResult.roll[die]) diceResult.roll[die] = [];
            diceResult.roll[die].push(rollDice(die))
        });

        //counts the symbols rolled

        diceResult = await countSymbols(diceResult, message, bot, desc, channelEmoji);
        resolve(diceResult);
        writeData(bot, message, 'diceResult', diceResult.roll);
    });
}

//init diceResult
function initdiceResult() {
    return {
        roll: {
            yellow: [],
            green: [],
            blue: [],
            red: [],
            black: [],
            white: [],
            hit: [],
            surge: [],
            evade: [],
            block: [],
            dodge: [],
            distance: []
        },
        results: {
            face: '',
            distance: 0,
            hit: 0,
            surge: 0,
            evade: 0,
            block: 0,
            dodge: 0
        }
    };
}

//processes the params and give an array of the type of dice to roll
function processType(message, params) {
    return new Promise(resolve => {
        let diceOrder = [];
        if (params.length > 0) {
            if ((params[0]).match(/\d+/g) != null) {
                for (let i = 0; i < params.length; i++) {
                    let diceQty = (params[i]).replace(/\D/g, "");
                    let color = params[i].replace(/\d/g, "");
                    if (diceQty > config.maxRollsPerDie) {
                        message.reply('Roll exceeds max roll per die limit of ' + config.maxRollsPerDie + ' . Please try again.');
                        resolve(0);
                    }
                    for (let j = 0; j < diceQty; j++) {
                        diceOrder.push(color);
                    }
                }
            } else {
                params = params.join('');
                for (let i = 0; i < params.length; i++) {
                    diceOrder.push(params[i]);
                }
            }
        } else {
            message.reply('No dice rolled.');
            resolve(0);
        }

        let finalOrder = [];
        diceOrder.forEach((die) => {
            switch (die) {
                case 'yellow':
                case 'y':
                    finalOrder.push('yellow');
                    break;
                case 'green':
                case 'g':
                    finalOrder.push('green');
                    break;
                case 'blue':
                case 'b':
                    finalOrder.push('blue');
                    break;
                case 'red':
                case 'r':
                    finalOrder.push('red');
                    break;
                case 'black':
                case 'blk':
                case 'k':
                    finalOrder.push('black');
                    break;
                case 'white':
                case 'w':
                    finalOrder.push('white');
                    break;
                case 'hit':
                case 'h':
                    finalOrder.push('hit');
                    break;
                case 'surge':
                case 's':
                    finalOrder.push('surge');
                    break;
                case 'evade':
                case 'e':
                    finalOrder.push('evade');
                    break;
                case 'block':
                case 'k':
                    finalOrder.push('block');
                    break;
                case 'dodge':
                case 'd':
                    finalOrder.push('dodge');
                    break;
                case 'distance':
                case 'x':
                    finalOrder.push('distance');
                    break;

                default:
                    break;
            }
        });
        resolve(finalOrder);
    });
}

//rolls one die and returns the results in an array
function rollDice(die) {
    //roll dice and match them to a side and add that face to the message
    if (!die) return;
    return dice(Object.keys(diceFaces[die]).length);
}


async function countSymbols(diceResult, message, bot, desc, channelEmoji) {
    return new Promise(resolve => {
        diceResult.results = {
            face: '',
            hit: 0,
            surge: 0,
            evade: 0,
            block: 0,
            dodge: 0,
            distance: 0
        };
        Object.keys(diceResult.roll).forEach((color) => {
            diceResult.roll[color].forEach((number) => {
                let face = diceFaces[color][number].face;
                debugger;
                for (let i = 0; face.length > i; i++) {
                    switch (face[i]) {
                        case 'h':
                            diceResult.results.hit++;
                            break;
                        case 's':
                            diceResult.results.surge++;
                            break;
                        case 'e':
                            diceResult.results.evade++;
                            break;
                        case 'b':
                            diceResult.results.block++;
                            break;
                        case 'd':
                            diceResult.results.dodge++;
                            break;
                        case 'x':
                            diceResult.results.distance++;
                            break;
                        default:
                            break;
                    }
                }
                if (color === 'hit' || color === 'surge' || color === 'evade' || color === 'block' || color === 'dodge' || color === 'distance') face = '';
                diceResult.results.face += printEmoji(`${color}${face}`, bot, channelEmoji);
            });
        });
        printResults(diceResult.results, message, bot, desc, channelEmoji);
        resolve(diceResult);
    });
}

function printResults(diceResult, message, bot, desc, channelEmoji) {
    let response = '';
    //prints faces
    if (diceResult.face !== '') {
        if (diceResult.face.length > 1500) diceResult.face = 'Too many dice to display.';
        message.channel.send(diceResult.face);
    } else {
        message.reply("No dice rolled.");
        return;
    }
    //creates finalCount by cancelling results
    let finalCount = {};
    if (diceResult.hit > 0) finalCount.hit = diceResult.hit;
    if (diceResult.surge > 0) finalCount.surge = diceResult.surge;
    if (diceResult.dodge > 0) finalCount.dodge = diceResult.dodge;
    if (diceResult.evade > 0) finalCount.evade = diceResult.evade;
    if (diceResult.block > 0) finalCount.block = diceResult.block;
    if (diceResult.distance > 0) finalCount.distance = diceResult.distance;
    

    //prints finalCount
    Object.keys(finalCount).forEach((symbol) => {
        if (finalCount[symbol] !== 0) response += printEmoji(`${symbol}`, bot, channelEmoji) + finalCount[symbol] + ' ';
    });
    if (response === '') response += 'All dice have cancelled out';
    if (diceResult.face !== '') message.reply(desc + " results:" + "\n\n\t" + response);
}

exports.roll = roll;
exports.processType = processType;
exports.rollDice = rollDice;
exports.countSymbols = countSymbols;
exports.printResults = printResults;

