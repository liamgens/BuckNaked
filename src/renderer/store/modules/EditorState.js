import { boop } from '../../components/Editor.vue'

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
    this.default.boop = 'HI'
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
