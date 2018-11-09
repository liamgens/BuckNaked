import { remote } from 'electron'
import path from 'path'

const fs = require('fs')

export function saveToFile (code, filename) {
  const data = code + '\n'
  const downloads = remote.app.getPath('downloads')
  const file = path.join(downloads, `${filename}.buck`)
  fs.writeFile(file, data, err => {
    if (err) throw err
  })
}
