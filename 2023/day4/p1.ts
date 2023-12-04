
const decoder = new TextDecoder("utf-8");
const data = Deno.readFileSync("input.txt");
const decoded = decoder.decode(data)

const games = decoded.split('\n')

let total = 0
games.forEach(line => {
    const sets = line.split(':')[1].split('|')
    const winners = sets[0].split(' ').filter(Number).map(x => parseInt(x.trim()))
    const numbers = sets[1].split(' ').filter(Number).map(x => parseInt(x.trim()))
    let alreadyMatched = false
    let points = 0


    // for each match in t
    numbers.forEach((number, index) => {
        if (winners.includes(number)) {
            if (alreadyMatched) {
                points *= 2
            } else {
                points += 1
                alreadyMatched = true
            }
        }
    })
    total += points
})

console.log(total)