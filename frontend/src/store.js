import Vue from "vue";
import Vuex from "vuex";
import _ from "underscore";

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
    },
    removeVehicle(state, id) {
      state.user.vehicles = _.reject(state.user.vehicles, function(car){ return car.id === id; });
    }
  },
  actions: {}
});
