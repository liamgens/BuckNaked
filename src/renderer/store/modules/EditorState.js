const state = {
  fileContents: '',
  code: ''
}

const mutations = {
  editFileContents (state, fileContents) {
    state.fileContents = fileContents
  },
  editCode (state, code) {
    state.code = code
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
    return state.fileContents.split('\n').length
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
