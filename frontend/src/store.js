import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    addVehicle(state, vehicle) {
      state.user.vehicles.push(vehicle);
    }
  },
  actions: {}
});
