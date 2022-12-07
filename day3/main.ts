const listOfStrings = (await Deno.readTextFile("input.txt")).split("\n");

let currentTotal = 0

// listOfStrings.forEach((stringToProcess: string) => {
//     console.log(`Processing string: ${stringToProcess}`)
//     const result = processPart1(stringToProcess)
//     console.log(`Result: ${result}`)
//     currentTotal += result
// })
// console.log(`Total Score: ${currentTotal}`)

let alphabet = "abcdefghijklmnopqrstuvwxyz".split("")
alphabet = alphabet.concat(alphabet.map((letter) => letter.toUpperCase()))

function calculateSumOfStrings(listOfChars: Array<string>): number {
    console.log(listOfChars)
    
    let sum = 0
    listOfChars.forEach((char) => {
        if (alphabet.includes(char)) {
            sum += alphabet.indexOf(char) + 1
        }
    });
    return sum
}


function processPart1(stringToProcess: string): number {
    const compartments = stringToProcess.split("")
    const compartment1 = compartments.splice(0, compartments.length / 2)
    const compartment2 = compartments
    const commonLetters: Array<string> = []

    // Process Compartment 1
    compartment1.forEach((letter: string) => {
        if (compartment2.includes(letter) && !commonLetters.includes(letter)) {
            commonLetters.push(letter)
        }
    })

    if (commonLetters.length === 0) {
        return 0
    } else {
        return calculateSumOfStrings(commonLetters)
    }
}


/**
 * Process the array into 3 parts and return the sum of the parts
 * @param stringToProcess 
 */
function processPart2(stringToProcess: Array<string>) {
    let sum = 0
    for (let i = 0; i < stringToProcess.length; i+=3) {
        const line1 = stringToProcess[i].split("")
        const line2 = stringToProcess[i+1]
        const line3 = stringToProcess[i+2]
        const commonLetters: Array<string> = []
        line1.forEach((letter: string) => {
            if (line2.includes(letter) && line3.includes(letter) && !commonLetters.includes(letter)) {
                commonLetters.push(letter)
            }
        })
        sum += calculateSumOfStrings(commonLetters)

    }
    return sum
}

console.log(processPart2(listOfStrings))
