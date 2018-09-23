const state = {
  fileContents: '',
  code: '',
  lineCount: 1
}

const mutations = {
  editFileContents (state, fileContents) {
    state.fileContents = fileContents
  },
  editCode (state, code) {
    state.lineCount = code.split('\n').length
    state.code = code
    console.log(code)
  }
}

const actions = {}

const getters = {
  fileContents: () => {
    return state.fileContents
  },
  code: () => {
    return state.code
  },
  numberOfLines: () => {
    return state.lineCount
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
