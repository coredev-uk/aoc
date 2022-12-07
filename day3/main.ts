const listOfStrings = (await Deno.readTextFile("input.txt")).split("\n");

let currentTotal = 0

listOfStrings.forEach((stringToProcess: string) => {
    console.log(`Processing string: ${stringToProcess}`)
    const result = processString(stringToProcess)
    console.log(`Result: ${result}`)
    currentTotal += result
})
console.log(`Total Score: ${currentTotal}`)

function processString(stringToProcess: string): number {
    const compartments = stringToProcess.split("")
    const compartment1 = compartments.splice(0, compartments.length / 2)
    const compartment2 = compartments
    const commonLetters: Array<string> = []
    let alphabet = "abcdefghijklmnopqrstuvwxyz".split("")
    alphabet = alphabet.concat(alphabet.map((letter) => letter.toUpperCase()))

    // Process Compartment 1
    compartment1.forEach((letter: string) => {
        if (compartment2.includes(letter) && !commonLetters.includes(letter)) {
            commonLetters.push(letter)
        }
    })

    // Process Compartment 2
    compartment2.forEach((letter: string) => {
        if (compartment1.includes(letter) && !commonLetters.includes(letter)) {
            commonLetters.push(letter)
        }
    })

    if (commonLetters.length === 0) {
        return 0
    } else {
        let score = 0

        commonLetters.forEach((letter) => {
            if (alphabet.includes(letter)) {
                score += alphabet.indexOf(letter) + 1
            }
        })

        return score
    }
}