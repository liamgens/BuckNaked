const fs = require('fs')

// SAVE FUNCTION
export function saveToFile (code) {
  // POPUP WINDOW THAT ASKS FOR FILE NAME
  const fileName = 'yourCode'
  // WRITES TO FILE
  const data = code + '\n'
  fs.writeFile(fileName + '.buck', data, (err) => {
    if (err) throw err
    console.log(data)
    console.log('The file has been saved!')
  })
}
// LOAD FUNCTION
export function loadFile (fileName) {
  // READS FILE
  var fileContents = fs.readFileSync(fileName, 'utf8')
  // WRITES TO CODE EDITOR
  return fileContents
}
