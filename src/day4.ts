import * as fs from 'fs';

interface Card {
    id: number;
    playerNumbers: number[];
    cardNumbers: number[];
    points?: number;
}

interface Playercard {
    card: Card;
    amount: number;
    woncardsID: number[];
}

const getcardPoints = (card: Card): number => {
    let points = 0;

    card.playerNumbers.forEach(playerNumber => {
        if (card.cardNumbers.includes(playerNumber)) {
            points++;
        }
    });
    if (points == 0) { return 0; }
    
    return points;
}


// TODO remove undefined
function newCard(row: string): Card | undefined { 
    const card = row.match(/Card\s+(\d+): (.+)/);

    let cardid; // card id
    let numbers; // all numbers on card
    let currentcard: Card;

    if (card != null) {
        cardid = parseInt(card[1]);
        numbers = card[2].split('|');  
    }

    if (cardid == undefined || numbers == undefined) { return undefined; }

    currentcard = {
        id: cardid,
        playerNumbers: numbers[0].split(' ').map(Number).filter(x => !isNaN(x)).filter(x=>x!=0),
        cardNumbers: numbers[1].split(' ').map(Number).filter(x => !isNaN(x)).filter(x=>x!=0),
    }
    
    currentcard.points = getcardPoints(currentcard);
    currentcard.points = getcardPoints(currentcard);

    return currentcard;
}

function part1(rows: string[]): number {
    let cards: Card[] = [];

    rows.forEach(row => {
        const card = newCard(row);
        if (card == undefined) { return; }
        cards.push(card);
    });
    
    let totalpoints = 0;
    cards.forEach(card => {
        //e.log(card.points);
        if (card.points == undefined || card.points <= 0) { return; }
        totalpoints += Math.pow(2, card.points - 1);

    });
    
    return totalpoints;
}
/* ¨
fn get_won_cards_count(
    card_id: &usize,
    card_id_to_won_ids: &HashMap<usize, &Vec<usize>>,
) -> usize {
    let won_card_ids = card_id_to_won_ids.get(card_id).unwrap();
    won_card_ids.len()
        + won_card_ids
            .par_iter()
            .map(|id| get_won_cards_count(id, card_id_to_won_ids))
            .sum::<usize>()
}

fn part_2(cards: &Vec<Card>) -> usize {
    let card_id_to_won_ids: HashMap<usize, &Vec<usize>> =
        cards.iter().map(|c| (c.id, &c.won_card_ids)).collect();

    let won_cards = card_id_to_won_ids
        .par_iter()
        .map(|c| get_won_cards_count(c.0, &card_id_to_won_ids))
        .sum::<usize>();

    card_id_to_won_ids.len() + won_cards
}
 */


function part2(rows: string[]): number {
    function findwon(pc: Playercard[], ind:number,  count: number) {
        let curcard = pc[ind];
        console.log("cardid: " + curcard.card.id, "->", count);
        console.log("card won: ", curcard.woncardsID);

        if (!curcard.woncardsID) {return 0;}
        if (curcard.woncardsID?.length < 1) {
            console.log("card: ", curcard.card.id, " done. returing: ", count);
            return count;
        } else {

            curcard.woncardsID.forEach(wonCards => {
                findwon(pc,  wonCards, count + 1);
            });
        }
    }



    let cards: Card[] = [];
    let playerCards: Playercard[] = [];

    // create cards
    rows.forEach(row => {
        const card = newCard(row);
        if (card == undefined) { return; }
        cards.push(card);

        // all cards start with 1 amount
        playerCards.push({card: card, amount: 1, woncardsID: []});
    });

    let tot = 0;

    // all playercards, check if points, then we add to the next cards in index
    playerCards.forEach((currcard, cardIndex) => {
        if (currcard.card.points == undefined) { return; }
        if (currcard.card.points > 0) { 
            for (let i = 1; i <= currcard.card.points; i++) {
                currcard.woncardsID.push(cardIndex + 1);
                //console.log("\n\n new card: ", currcard);
                tot = findwon(playerCards, cardIndex, tot) ?? 0;
                //playerCards[cardIndex + i].amount += currcard.amount;
            }
        }
    });


    let total = 0;
    playerCards.forEach((_, amount) => { 
        total += amount ?? 0; 
    });
    return tot;

}


function main() {
    const file: string = fs.readFileSync("./input/d4p1.txt", 'utf-8');
    let rows = file.split("\n");

   /*  let sump1 = 0; 
    rows.forEach(row => {
        sump1 += part1(row);
    }); */

    
    
    
    console.log("Solution for day 4, part 1: " + part1(rows));
    console.log("Solution for day 4, part 2: " + part2(rows));
}

main();
