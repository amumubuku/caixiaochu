const state = {
  data: []
}

const mutations = {
  CHANGE_SETTING: (state, { data }) => {
    state.data = data
  }
}

const actions = {
  changeSetting ({ commit }, data) {
    commit('CHANGE_SETTING', data)
  }
}

export default {
  state,
  mutations,
  actions
}
