import * as fs from 'fs';

function part1(input: string[]): number {
    const [seeds, ...maps] = input;
    let seedSources = seeds.split(":")[1].trim().split(" ").map(Number);

    for (let map in maps) {
        const [_, ...rows] = maps[map].split("\n").filter(ls => ls !== '');
        
        for (let src in seedSources) {
            let currSeed = seedSources[src];
            for (let i = 0; i < rows.length; i++) {
                const [nextDest, nextSrc, range] = rows[i].split(" ").map(Number);
                let diff = nextDest - nextSrc;

                if (currSeed >= nextSrc && currSeed <= nextSrc + range) {
                    currSeed = currSeed + diff;
                    seedSources[src] = currSeed;
                    break;
                }
            }
        }

    }
    const sorted = seedSources.sort();
    return sorted[0];
}


// not working...
function part2(input: string[]): number {
    const [seeds, ...maps] = input;
    let seedPairs = seeds.split(":")[1].trim().split(" ").map(Number);
    
    const seedrange: [number, number][] = [];


    // now we have a range of seeds instead, since having every single seed in a list
    // is to big.
    for (let i = 0; i < seedPairs.length; i = i + 2) {
        //console.log("added range: ", seedPairs[i], seedPairs[i+1]);
        seedrange.push([seedPairs[i], seedPairs[i] + seedPairs[i+1]]);
    }

    for (const map in maps) {
        const [_, ...rows] = maps[map].split("\n").filter(ls => ls !== '');
        
        
        for (let i = 0; i < seedrange.length; i++) {
            for (const row in rows) {
                const [nextDest, nextSrc, range] = rows[row].split(" ").map(Number);

                let diff = nextDest - nextSrc; // our diff to add or remove from the seed location
                const nextDestEnd = nextDest + range; // we got dest start -> end
                const nextSrcEnd = nextSrc + range; // now we got src start -> end
            
                // this interval, is where we have our seeds
                if (seedrange[i] == undefined) { break; }
                const [seedStart, seedEnd] = seedrange[i];


                
                // we want to check if we are in range.
                // [] <-- our interval
                // xxxx is our seed range

                //what cases can happen? 
                // 1. we miss the interval completely, we have no seeds in range. 
                //      then we don't have to change the values.
                // ex. xxxx [] or [] xxxx
                if (seedEnd < nextSrc || seedStart > nextSrcEnd) {
                    continue;
                }

                // 2. the whole seed range is in a interval
                // ex. .[..xxxxxx..].. or ..[xxxxxx]..
                if (seedStart >= nextSrc && seedEnd <= nextSrcEnd) {
                    seedrange[i] = [seedStart + diff, seedEnd + diff];
                    break;
                }


                // 3. the beginning is in the middle of a src and dest,
                // then we need to split into two different ranges.
                // ..xxx[xxx...]...
                if (seedStart < nextSrc && seedEnd >= nextSrc && seedEnd <= nextSrcEnd) {
                    // first part of the range is still the same...
                    // second part will change by the diff...
                    seedrange.splice(i++, 1,
                        [nextDest, seedEnd + diff],
                        [seedStart, nextSrc - 1]);

                }

                // 4. the interval is intersecting from the left 
                // then we need to split into two different ranges.
                // [...xxxx]xxx 
                if (seedStart >= nextSrc && seedEnd > nextSrcEnd && seedStart <= nextSrcEnd) {
                    seedrange.splice(i++, 1,
                        [seedStart + diff, nextDestEnd],
                        [nextSrcEnd + 1, seedEnd]);
                }

                // the start and end are in the middle of a seed range,
                // so we split into three different seeds now.

                // ...xxx[xxxxx]xxx... -> creates 3 new ranges.
                if(seedStart < nextSrc && seedEnd > nextSrcEnd) {
                    seedrange.splice(i++, 1,
                        [nextDest, nextDestEnd],
                        [seedStart, nextSrc - 1],
                        [nextSrcEnd + 1, seedEnd]);
                }

            }
        }

    }

   
    return Math.min(...seedrange.flat());
}


function main() {
    const file: string = fs.readFileSync("./input/d5.txt", 'utf-8');
    let rows = file.split("\n\n");

    let solution1 = part1(rows);
    let solution2 = part2(rows);

    console.log("Solution for day 5, part 1: ", solution1);
    console.log("Solution for day 5, part 1: ", solution2);

}

main();

import * as fs from 'fs';

function part1(input: string[]): number {
    const [seeds, ...maps] = input;
    let seedSources = seeds.split(":")[1].trim().split(" ").map(Number);

    for (let map in maps) {
        const [_, ...rows] = maps[map].split("\n").filter(ls => ls !== '');
        
        for (let src in seedSources) {
            let currSeed = seedSources[src];
            for (let i = 0; i < rows.length; i++) {
                const [nextDest, nextSrc, range] = rows[i].split(" ").map(Number);
                let diff = nextDest - nextSrc;

                if (currSeed >= nextSrc && currSeed <= nextSrc + range) {
                    currSeed = currSeed + diff;
                    seedSources[src] = currSeed;
                    break;
                }
            }
        }

    }
    const sorted = seedSources.sort();
    return sorted[0];
}


// not working...
function part2(input: string[]): number {
    const [seeds, ...maps] = input;
    let seedPairs = seeds.split(":")[1].trim().split(" ").map(Number);
    
    const seedrange: [number, number][] = [];


    // now we have a range of seeds instead, since having every single seed in a list
    // is to big.
    for (let i = 0; i < seedPairs.length; i = i + 2) {
        //console.log("added range: ", seedPairs[i], seedPairs[i+1]);
        seedrange.push([seedPairs[i], seedPairs[i] + seedPairs[i+1]]);
    }

    console.log("before run: ", seedrange.length);
    for (const map in maps) {
        const [_, ...rows] = maps[map].split("\n").filter(ls => ls !== '');
        
        
        for (let i = 0; i < seedrange.length; i++) {
            for (const row in rows) {
                const [nextDest, nextSrc, range] = rows[row].split(" ").map(Number);

                let diff = nextDest - nextSrc; // our diff to add or remove from the seed location
                const nextDestEnd = nextDest + range; // we got dest start -> end
                const nextSrcEnd = nextSrc + range; // now we got src start -> end
            
                // this interval, is where we have our seeds
                if (seedrange[i] == undefined) { break; }
                const [seedStart, seedEnd] = seedrange[i];


                
                // we want to check if we are in range.

                //what cases can happen? 
                // 1. we miss the interval completely, we have no seeds in range. 
                //      then we don't have to change the values.
                if (seedEnd < nextSrc || seedStart > nextSrcEnd) {
                    continue;
                }

                // 2. the whole seed range is in a interval
                // rangeStart >= sRangeStart && rangeEnd <= sRangeEnd)
                if (seedStart >= nextSrc && seedEnd <= nextSrcEnd) {
                    seedrange[i] = [seedStart + diff, seedEnd + diff];
                    break;
                }


                // 3. the beginning is in the middle of a src and dest,
                // then we need to split into two different ranges.
                // if (rangeStart < sRangeStart && rangeEnd >= sRangeStart && rangeEnd <= sRangeEnd)
                if (seedStart < nextSrc && seedEnd >= nextSrc && seedEnd <= nextSrcEnd) {
                    // first part of the range is still the same...
                    // second part will change by the diff...
                    seedrange.splice(i++, 1,
                        [nextDest, seedEnd + diff],
                        [seedStart, nextSrc - 1]);

                }

                // 4. the end is in the middle of a src and dest
                // then we need to split into two different ranges.

                // (rangeEnd > sRangeEnd && rangeStart >= sRangeStart && rangeStart <= sRangeEnd)
                if (seedStart >= nextSrc && seedEnd > nextSrcEnd && seedStart <= nextSrcEnd) {
                    seedrange.splice(i++, 1,
                        [seedStart + diff, nextDestEnd],
                        [nextSrcEnd + 1, seedEnd]);
                }

                // the start and end are in the middle of a seed range,
                // so we split into three different seeds now.

                if(seedStart < nextSrc && seedEnd > nextSrcEnd) {
                    seedrange.splice(i++, 1,
                        [nextDest, nextDestEnd],
                        [seedStart, nextSrc - 1],
                        [nextSrcEnd + 1, seedEnd]);
                }

            }
        }

    }

   
    return Math.min(...seedrange.flat());
}


function main() {
    const file: string = fs.readFileSync("./input/d5.txt", 'utf-8');
    let rows = file.split("\n\n");

    let solution1 = part1(rows);
    let solution2 = part2(rows);

    console.log("Solution for day 5, part 1: ", solution1);
    console.log("Solution for day 5, part 1: ", solution2);

}

main();
