
const decoder = new TextDecoder("utf-8");
const data = Deno.readFileSync("input.txt");
const decoded = decoder.decode(data)

const games = decoded.split('\n')

// Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
let total = 0
games.forEach(line => {

    const colours: { [k: string]: number } = {}
    const id = line.split(':')[0].split(' ')[1]
    const sets = line.split(':')[1].split(';')

    sets.forEach(set => {
        const splitdata = set.split(',')
        splitdata.forEach(splitdata => {
            const num = parseInt(splitdata.split(' ')[1].trim())
            const colour = splitdata.split(' ')[2].trim()

            if (!colours[colour] || colours[colour] < num) {
                colours[colour] = num;
            }
        })
    })

    console.log(colours)
    if (colours['red'] <= 12 && colours['green'] <= 13 && colours['blue'] <= 14) {
        total += parseInt(id)
    }

})

console.log(total)

// only 12 red cubes, 13 green cubes, and 14 blue cubes