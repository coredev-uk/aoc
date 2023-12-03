const decoder = new TextDecoder("utf-8");
const data = Deno.readFileSync("input.txt");
const decoded = decoder.decode(data);
const lines = decoded.split('\n');

let sum = 0
for (const [index, line] of lines.entries()) {
    const symbolIndexes: number[] = []
    for (let i = 0; i < line.length; i++) {
        if (line[i] !== '.' && !Number.isInteger(parseInt(line[i]))) {
            symbolIndexes.push(i)
        }
    }

    if (symbolIndexes.length == 0) continue

    sum += checkNumbers(findNumbers(lines[index - 1] ?? null), findNumbers(line), findNumbers(lines[index + 1] ?? null), symbolIndexes)
}

console.log(sum)

function checkNumbers(before: number[][], current: number[][], aft: number[][], symbols: number[]): number {
    let total = 0
    // Check if symbol is in range from the start to the end
    for (const symbol of symbols) {
        const adjacents: number[] = []
        before.forEach(n => {
            const [start, end, num] = n
    
            if (symbol >= (start - 1) && symbol <= (end + 1)) {
                adjacents.push(num)
            }
        })
        current.forEach(n => {
            const [start, end, num] = n
    
            if (symbol >= (start - 1) && symbol <= (end + 1)) {
                adjacents.push(num)
            }
        })
        aft.forEach(n => {
            const [start, end, num] = n
    
            if (symbol >= (start - 1) && symbol <= (end + 1)) {
                adjacents.push(num)
            }
        })

        if (adjacents.length == 2) {
            total += adjacents[0] * adjacents[1]
        }
    }

    return total
}

function findNumbers(data: string): number[][] {
    const numbers: number[][] = []

    if (data == null) return numbers

    let start = -1
    let end = 0
    let isSearching = false
    for (let i = 0; i <= data.length; i++) {
        if (Number.isInteger(parseInt(data[i]))) {
            isSearching = true
        } else {
            end = i - 1
            if (start != -1) {
                const number = data.substring(start, end + 1)
                numbers.push([start, end, parseInt(number)])
                start = -1
            }
            isSearching = false
        }

        if (isSearching && start == -1) {
            start = i
        }
    }
    return numbers
}