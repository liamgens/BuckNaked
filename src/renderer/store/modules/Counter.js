const state = {
  fileContents: 'temp contents'
}

const mutations = {
  editFileContents (state, fileContents) {
    state.fileContents = fileContents
  }
}

const actions = {}

const getters = {
  fileContents: () => {
    return state.fileContents
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
