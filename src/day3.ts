import * as fs from 'fs';

function findnumber(input: string[], i_ind: number, j_ind:number): number {
    let tmpnum: string = "";

    //Check left until we dont hit number
    let left = 0;
    if (isNaN(Number(input[i_ind][j_ind-1]))) {
        left = j_ind;
    } else {
        left = j_ind - 1;
    }
    while (!isNaN(Number(input[i_ind][left - 1])) && left >= 0) {
        left--;
    }
    // left now at beginning at number
    tmpnum += input[i_ind][left];
    //Check right until we dont hit number
    let right = left + 1;
    while (!isNaN(Number(input[i_ind][right])) && right < input[i_ind].length) {
        tmpnum += input[i_ind][right];
        right++;
    }

    return Number(tmpnum);
}


function part1(input: string[]): number { 
    let sum = 0;

    for (let i = 0; i < input.length; i++) {
        for (let j = 0; j < input[i].length; j++) {

            let current = input[i][j];
            if (isNaN(Number(current))) {

                // current is not a number... so either symbol or '.'.

                if(current == '.') {
                    continue;
                } else {
                    let checkup = false;
                    let checkdown = false;

                    // right
                    if (!isNaN(Number(input[i][j+1]))) {
                        // number found
    
                        sum += findnumber(input, i, j+1);
                    }
                    // left
                    if (!isNaN(Number(input[i][j-1]))) {
                        sum += findnumber(input, i, j-1);
                    }
                    // up
                    if (!isNaN(Number(input[i-1][j]))) {
                        sum += findnumber(input, i-1, j);
                        checkup = true;

                    }
    
                    // down
                    if (!isNaN(Number(input[i+1][j]))) {
                        sum += findnumber(input, i + 1, j);
                        checkdown = true;
                    }
    
                    // up-right
                    if (!isNaN(Number(input[i-1][j+1])) && !checkup) {
                        sum += findnumber(input, i-1, j+1);
                    }
    
                    // up-left
                    if (!isNaN(Number(input[i-1][j-1])) && !checkup) {
                        sum += findnumber(input, i-1, j-1);
                    }
    
                    // down-right
                    if (!isNaN(Number(input[i+1][j+1])) && !checkdown) {
                        sum += findnumber(input, i+1, j+1);
                    }
    
                    // down-left
                    if (!isNaN(Number(input[i+1][j-1])) && !checkdown) {
                        sum += findnumber(input, i+1, j-1);
                    }
                }
                
            }

        }

    }


    return sum;
}

function part2(input: string[]): number {
    let sum = 0;
    for (let i = 0; i < input.length; i++) {
        const element = input[i];

        for (let j = 0; j < element.length; j++) {
            let checkup = false;
            let checkdown = false;
            const element = input[i][j];
            let adjacentnumbers: number[] = [];

            if (element == '*') {
                // star found, now we look if there is two adjanced numbers

                // right
                if (!isNaN(Number(input[i][j+1]))) {
                    // number found
                    adjacentnumbers.push(findnumber(input, i, j+1));
                }
                // left
                if (!isNaN(Number(input[i][j-1]))) {
                    adjacentnumbers.push(findnumber(input, i, j-1));
                }
                // check up
                if (!isNaN(Number(input[i-1][j]))) {
                    adjacentnumbers.push(findnumber(input, i-1, j));
                    checkup = true;
                }
                // check down
                if (!isNaN(Number(input[i+1][j]))) {
                    adjacentnumbers.push(findnumber(input, i+1, j));
                    checkdown = true;
                }
                // chekc up right
                if (!isNaN(Number(input[i-1][j+1])) && !checkup) {
                    adjacentnumbers.push(findnumber(input, i-1, j+1));
                }
                // check up left
                if (!isNaN(Number(input[i-1][j-1])) && !checkup) {
                    adjacentnumbers.push(findnumber(input, i-1, j-1));
                }
                // check down right
                if (!isNaN(Number(input[i+1][j+1])) && !checkdown) {
                    adjacentnumbers.push(findnumber(input, i+1, j+1));
                }
                // check down left
                if (!isNaN(Number(input[i+1][j-1])) && !checkdown) {
                    adjacentnumbers.push(findnumber(input, i+1, j-1));
                }
            }
            if (adjacentnumbers.length == 2) {
                
                sum += adjacentnumbers[0] * adjacentnumbers[1];
            }    
        }

    }
    return sum;
}




function main() {
    const file: string = fs.readFileSync("./input/d3.txt", 'utf-8');
    let rows = file.split("\n");

    let solution1 = part1(rows);
    let solution2 = part2(rows);

    console.log("Solution for day 3, part 1: " + solution1);
    console.log("Solution for day 3, part 2: " + solution2);
}


main();
