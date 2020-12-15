const app = {
    namespaced: true,
    state: {
      noti: {},
      token: ''
    },
    getters: {
  
    },
    mutations: {
      SET_noti: (state, noti) => {
        state.noti = noti
      },
      SET_token: (state, token) => {
        state.token = token
      },
    },
    actions: {
      setNoti({ commit }, noti) {
        let a = JSON.parse(noti)
        commit('SET_noti', a)
      },
      setToken({ commit }, token) {
        commit('SET_token', token)
      }
    },
  }
  
  export default app