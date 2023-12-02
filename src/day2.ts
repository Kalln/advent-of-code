import * as fs from "fs";

// TODO take out the parsing stuff, to prevent repition.
// TODO better variable names and comments on the code.
// TODO remove the if-statement nesting..

function part1(input: string): number {
    let GAME_POSSIBLE = true;

    const MAX_RED = 12
    const MAX_GREEN = 13;
    const MAX_BLUE = 14;

    // we got gameid
    const gameID = input.split(":")[0].split(" ")[1];

    let game = input.split(":")[1];
    if (!game) {
        return 0;
    }

    let gameparts = game.split(";");

    gameparts.forEach(game => {
        let eachcolor = game.split(",");
        eachcolor.forEach(col => {
            let tmp = col.split(" ");
            let color = tmp[2];
            let amount = tmp[1];

            if (color == 'red') {
                if (Number(amount) > MAX_RED) {
                    GAME_POSSIBLE = false;
                }

            } else if (color == 'blue') {
                if (Number(amount) > MAX_BLUE) {
                    GAME_POSSIBLE = false;
                }
            } else {
                if (Number(amount) > MAX_GREEN) {
                    GAME_POSSIBLE = false;
                }
            }

        })
        
    })

    return GAME_POSSIBLE ? Number(gameID) : 0;
}

function part2(input: string): number {

    let MIN_RED = 0;
    let MIN_GREEN = 0;
    let MIN_BLUE = 0;

    let game = input.split(":")[1];
    if (!game) {
        return 0;
    }

    let games = game.split(";");

    games.forEach(game => {
        let eachcolor = game.split(",");
        eachcolor.forEach(col => {
            let tmp = col.split(" ");
            let color = tmp[2];
            let amount = Number(tmp[1]);

            if (color == 'red') {
                if (amount > MIN_RED) {
                    MIN_RED = amount;
                }

            } else if (color == 'blue') {
                if (amount > MIN_BLUE) {
                    MIN_BLUE = amount;
                }
            } else {
                if (amount > MIN_GREEN) {
                    MIN_GREEN = amount;
                }
            } 
        })
    })

    let tot = MIN_BLUE * MIN_GREEN * MIN_RED;
    //console.log("blue: ", MIN_BLUE, "red: ", MIN_RED, "green: ", MIN_GREEN,  "= ", tot);
    return tot;
    
}

function main() {
    const file: string = fs.readFileSync("./input/d2.txt", 'utf-8');

    let rows = file.split("\n");
    let sump1 = 0;
    let sump2 = 0;
    rows.forEach(line => {
        sump1 += part1(line);
        sump2 += part2(line);
    })


    console.log("Solution to day 2, part 1: ", sump1);
    console.log("Solution to day 2, part 2: ", sump2);
}

main();
