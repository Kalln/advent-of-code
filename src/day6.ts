import * as fs from 'fs';


const getTimes = (timesForRaces: string): number[] => timesForRaces.split(":")[1].trim().split(" ").map(Number).filter(c => c != 0);
const getRecordDistance = (recordForRaces: string): number[] => recordForRaces.split(":")[1].trim().split(" ").map(Number).filter(c => c != 0);

function recordIsBeaten(recordDistance: number, timeButtonHold: number, raceTime: number): number | undefined {
    let elapsedRaceTime = timeButtonHold; // when we start race, time elapsed is same as the time we held the button.
    let speedms = timeButtonHold * 1;
    let travelledDistance = 0;

    while (elapsedRaceTime <= raceTime) {
        // otherwise we have realesed button and we are travelling distance of speed. 
        if (travelledDistance > recordDistance) {
            return timeButtonHold;
        }

        travelledDistance += speedms;
        elapsedRaceTime++;
    }
    return undefined;
}

function part1(input: string[]): number {
    let total: number = 0;

    const raceTimes = getTimes(input[0]);
    const distancesToBeat = getRecordDistance(input[1]);

    if (raceTimes.length != distancesToBeat.length) { return -1; }
    // raceTimes and distancesToBeat have same length.

    // For every race -> check all possible outcomes.
    raceTimes.forEach((raceTime, raceNumber) => {
        let successfullTimesMS: number[] = [];
        let currentDistanceToBeat = distancesToBeat[raceNumber];
        for (let buttonHeldMS = 0; buttonHeldMS < raceTime; buttonHeldMS++) {
            const distanceTravelled = recordIsBeaten(currentDistanceToBeat, buttonHeldMS, raceTime); // undefined if not beating record.
            if (distanceTravelled) {
                // add the successfull distancetravelled to an list... maybe we need this later?? maybe not..
                successfullTimesMS.push(distanceTravelled);
            }
        }

        // if we multiply when total = 0, we get 0.
        total == 0 ? total = successfullTimesMS.length : total *= successfullTimesMS.length;
    });

    return total;
}

function part2(input: string[]): number {
    let total: number = 0;

    const raceTime = 46828479; // TODO get the digits
    const distanceToBeat = 347152214061471; // TODO get the digits

    
    let successfullTimesMS: number[] = [];
    
    for (let buttonHeldMS = 0; buttonHeldMS < raceTime; buttonHeldMS++) {
        const distanceTravelled = recordIsBeaten(distanceToBeat, buttonHeldMS, raceTime); // undefined if not beating record.
        if (distanceTravelled) {
            // add the successfull distancetravelled to an list... maybe we need this later?? maybe not..
            total++;
        }
    }

        // if we multiply when total = 0, we get 0.
        
        
    

    return total;
}


function main() {
    const file: string = fs.readFileSync("./input/sample6.txt", 'utf-8');
    let rows = file.split("\n");

    let solution1 = part1(rows);
    let solution2 = part2(rows);


    console.log("Solution for day 6, part 1: ", solution1);
    console.log("Solution for day 6, part 2: ", solution2);

}


main();