let dice = {
    yellow: {
        1: {face: 'hss'},
        2: {face: 's'},
        3: {face: 'sxx'},
        4: {face: 'hxx'},
        5: {face: 'hsx'},
        6: {face: 'hhx'}
    },
    green: {
        1: {face: 'hhx'},
        2: {face: 'hsx'},
        3: {face: 'sx'},
        4: {face: 'hsxx'},
        5: {face: 'hhxx'},
        6: {face: 'hhxxx'}
    },
    blue: {
        1: {face: 'sxx'},
        2: {face: 'hxx'},
        3: {face: 'hsxxx'},
        4: {face: 'hhxxx'},
        5: {face: 'hhxxxx'},
        6: {face: 'hxxxxx'}
    },
    red: {
        1: {face: 'h'},
        2: {face: 'hhs'},
        3: {face: 'hh'},
        4: {face: 'hh'},
        5: {face: 'hhh'},
        6: {face: 'hhh'}
    },
    black: {
        1: {face: 'e'},
        2: {face: 'b'},
        3: {face: 'b'},
        4: {face: 'bb'},
        5: {face: 'bb'},
        6: {face: 'bbb'}
    },
    white: {
        1: {face: 'z'},
        2: {face: 'e'},
        3: {face: 'b'},
        4: {face: 'eb'},
        5: {face: 'eb'},
        6: {face: 'd'}
    },
    hit: {1: {face: 'h'}},
    surge: {1: {face: 's'}},
    evade: {1: {face: 'e'}},
    block: {1: {face: 'b'}},
    dodge: {1: {face: 'd'}},
};

exports.dice = dice;