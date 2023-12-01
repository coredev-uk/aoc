const decoder = new TextDecoder("utf-8");
const data = Deno.readFileSync("input.txt");
const decoded = decoder.decode(data)
const lines = decoded.split('\n')
const startReg = /(one|two|three|four|five|six|seven|eight|nine|[0-9])/
const endReg = /.*(\d|one|two|three|four|five|six|seven|eight|nine).*/g
const global = /(one|two|three|four|five|six|seven|eight|nine|[1-9])/g

function match() {
    let sum = 0;
    lines.forEach((line) => {
        let start = line.match(startReg)?.[1]
        let end = line.match(endReg)?.[1]

        if (start && end) {

            if (textToInt(end)) {
                end = textToInt(end)
            }

            if (textToInt(start)) {
                start = textToInt(start)
            }

            sum += parseInt(start + end)
        }
    })
}

function matchAll() {
    let sum = 0;
    lines.forEach((line) => {
        const reg = [...line.matchAll(global)]
        let start = reg?.[0]?.[1] ?? undefined
        let end = reg?.[reg.length-1]?.[1] ?? undefined
        
        if (start && end) {
    
            if (textToInt(end)) {
                end = textToInt(end)
            }
    
            if (textToInt(start)) {
                start = textToInt(start)
            }
    
            sum += parseInt(start + end)
        }
    })
}



let sum1 = 0;
let sum2 = 0;

const run = 1000

for (let i = 0; i < run; i++) {
    const perf1 = performance.now()
    match()
    sum1 += (performance.now() - perf1)

    const perf2 = performance.now()
    matchAll() 
    sum2 += (performance.now() - perf2)

}

console.log("Match took: " + sum1 / run + "ms")
console.log("Match all took: " + sum2 / run + "ms")



function textToInt(x: string): string {
    const letters: { [k: string]: number } = {
        one: 1,
        two: 2,
        three: 3,
        four: 4,
        five: 5,
        six: 6,
        seven: 7,
        eight: 8,
        nine: 9
    }


    return letters?.[x]?.toString() ?? x
}