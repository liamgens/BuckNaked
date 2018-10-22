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
    // Remove any empty lines as "code"
    return state.code.split('\n')
  },
  code: () => {
    return state.code
  },
  numberOfLines: () => {
    return state.lineCount
  },
  output: () => {
    // Format the output to have specific format and return as a string
    return state.outputBuffer.map(out => `> ${out} \n`).join('')
  }
}

export default {
  state,
  mutations,
  getters
}
