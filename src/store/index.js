import Vue from "vue";
import Vuex from "vuex";
import events from "./modules/events.js";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    events,
  },
});
