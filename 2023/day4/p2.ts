
const decoder = new TextDecoder("utf-8");
const data = Deno.readFileSync("input.txt");
const decoded = decoder.decode(data)

const games = decoded.split('\n')

let total = 0
games.forEach(line => {

})

console.log(total)