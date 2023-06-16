
const { readFile, writeFile } = require('fs').promises

const run = async () => {
    try {
        const file1 = await readFile('./content/first.txt', 'utf8')
        const file2 = await readFile('./content/second.txt', 'utf8')
        await writeFile(
            './content/result-async.txt',
            `this is result: ${file1} ${file2}`
        )
        console.log(file1 + ' ' + file2)
    }
    catch (err) {
        console.log(`error: ${err}`)
    }
}

run()

