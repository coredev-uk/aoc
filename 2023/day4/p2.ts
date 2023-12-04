
const decoder = new TextDecoder("utf-8");
const data = Deno.readFileSync("input.txt");
const decoded = decoder.decode(data)
const games = decoded.split('\n')

let total = 0

const matches: number[] = []
games.forEach((line, index) => {
    const sets = line.split(':')[1].split('|')
    const winners = sets[0].split(' ').filter(Number).map(x => parseInt(x.trim()))
    const numbers = sets[1].split(' ').filter(Number).map(x => parseInt(x.trim()))

    // for each match in t
    numbers.forEach(number => {
        if (winners.includes(number)) {
            // match made
            if (matches[index]) {
                matches[index] += 1
            } else {
                matches[index] = 1
            } 
        }
    })

    if (matches[index] === undefined) {
        matches[index] = 0
    }
})

function addMatches(cardIndex: number, match: number, matches: number[]): number {
    let total = 0;
    if (match === 0) return total;
    for (let i = 1; i <= match; i++) {
        total++ // add one for the current scratchcard
        total += addMatches(cardIndex + i, matches[cardIndex + i], matches) // run again for the matches for this current card
    }
    return total
}

matches.forEach((match, index) => {
    console.log(`Card at index ${index} has ${match} matches`)
    total += addMatches(index, match, matches)
})
total += games.length

console.log(total)