import Vuex from 'vuex'
import Noti from './modules/app'

// Polyfill for `window.fetch()`
require('whatwg-fetch')

const store = new Vuex.Store({
  namespaced: false,
  modules: {
    Noti
  },
});
const RootStore = () => store;

if (process.env.NODE_ENV !== 'production') {
  // Check for SSR
  if (typeof window !== "undefined") {
    window.RootStore = RootStore;
    window.store = store;
  }
}

export default RootStore