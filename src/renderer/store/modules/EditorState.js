const state = {
  fileContents: '',
  code: '',
  lineCount: 1,
  outputBuffer: []
}

const mutations = {
  editFileContents (state, fileContents) {
    state.fileContents = fileContents
  },
  editCode (state, code) {
    state.lineCount = code.split('\n').length
    state.code = code
  },
  appendOutput (state, output) {
    let newOutput = state.outputBuffer
    newOutput.push(String(output))
    state.outputBuffer = newOutput
  },
  clearOutput (state) {
    state.outputBuffer = []
  }
}

const getters = {
  fileContents: () => {
    return state.fileContents
  },
  codeAsArray: () => {
    return state.code.split('\n')
  },
  code: () => {
    return state.code
  },
  numberOfLines: () => {
    return state.lineCount
  },
  output: () => {
    let output = ''
    for (var i = 0; i < state.outputBuffer.length; i++) {
      // Remove whitespace to check for an empty or blank line
      if (!state.outputBuffer[i].replace(/\s/g, '').length <= 0) {
        output += '> ' + state.outputBuffer[i] + '\n'
      }
    }
    return output
  }
}

export default {
  state,
  mutations,
  getters
}
