import * as fs from "fs";


function main(): void {
    const file: string = fs.readFileSync("./input/d1.txt", 'utf-8');
    console.log("Solution for day 1, part 1: " + part1(file));
    console.log("Solution for day 1, part 2: " + part2(file));
}

function findDigits(input: string): string[] {
    const nums: string[] = [];

    for (let i = 0; i < input.length; i++) {
        const d = input[i];

        if (!isNaN(Number(d))){
            nums.push(d);
            continue;
        }

        const stringstodigit: string[] = [
            'one',
            'two',
            'three',
            'four',
            'five',
            'six',
            'seven',
            'eight',
            'nine'
            ];

        for (let j = 0; j < stringstodigit.length; j++) {
            if (input
                .slice(i, input.length)
                .startsWith(stringstodigit[j])
                ) {
                // we found it!
                let n = j + 1;
                let foundnumber: string = "" + n;
                nums.push(foundnumber);
            }
        }
        
    }
    return nums;
}



function part2(input: string): number {
    const rows = input.split('\n');
    let sum = 0;
    rows.forEach(lines => {
        let nums = findDigits(lines);
        let first = nums[0];
        let last = nums[nums.length - 1];

        let val: number = Number(first + last);
        if (!isNaN(val)) {
            sum += val;
        }

    })

    return sum;
}


function part1(input: string): number {
    const rows: string[] = input.split("\n");
    let sum = 0;

    for (let row in rows) {
        let stringArray = rows[row].split('');

        // We will only have digits in our array. Makes it bad for part 2....
        let onlyDigit = stringArray.filter(c => !isNaN(Number(c)));

        let first = onlyDigit[0];
        let last = onlyDigit[onlyDigit.length - 1];
        let val: number = Number(first + last);
        if (!isNaN(val)) {
            sum += val;
        }
    }

    return sum;
}

main();
