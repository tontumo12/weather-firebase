const app = {
    namespaced: true,
    state: {
      noti: {},
    },
    getters: {
  
    },
    mutations: {
      SET_noti: (state, noti) => {
        state.noti = noti
      }
    },
    actions: {
      setNoti({ commit }, noti) {
        commit('SET_noti', noti)
      }
    },
  }
  
  export default app