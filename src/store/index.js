import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    displayedCity: ''
  },
  mutations: {
    DISPLAYED_CITY: (state, city) => {
      state.displayedCity = city;
    }
  },
  actions: {
    displayed_city({ commit }, city) {
      commit('DISPLAYED_CITY', city);
    }
  },
  getters: {
    displayedCity: state => state.displayedCity
  }
});
