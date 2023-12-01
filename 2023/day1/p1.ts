
const decoder = new TextDecoder("utf-8");
const data = Deno.readFileSync("input.txt");
const decoded = decoder.decode(data)

const linesarr = decoded.split('\n')

let sum = 0;
linesarr.forEach((line) => {
    const num: string = (line.replace(/\D+/g, ''));
    if (num) {
        sum += parseInt(num[0] + num[num.length-1])
    }
})

console.log(sum)