/* vim:ts=2:sw=2:sts=2:st:et */

import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    name: '',
    email: '',
    loggedIn: false,
  },
  mutations: {
   sign_in(
     state,
       {
         name,
         email,
       },
   ) {
       state.name = name;
       state.email = email;
       state.loggedIn = true;
   },
  },
  actions: {
  },
  getters: {
    allCredential(state) {
      if (!state.loggedIn) {
        return {
          error: 'not logged-in',
        };
      }
      return {
        name: state.name,
        email: state.email,
        loggedIn: state.loggedIn,
      };
    }
  },
  plugins: [
    createPersistedState({
      key: 'auth',
      paths: [
        'name',
        'email',
        'loggedIn',
      ],
      storage: window.sessionStorage,
    }),
  ],
  modules: {
  }
})
