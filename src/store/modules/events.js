import axios from "axios";

const url = "http://localhost:3000/events";

const state = {
  events: [],
  event: null,
  isEditEvent: false,
};

const getters = {
  events: (state) => state.events.map(event => {
    return{
      ...event,
      start: new Date(event.start),
      end: new Date(event.end),
    }
  }),
  event: state => state.event ? {
    ...state.event,
    start: new Date(state.event.start),
    end: new Date(state.event.end)
  } : null,
  isEditEvent: state => state.isEditEvent,
};

const mutations = {
  setEvents: (state, events) => (state.events = events),
  setEvent: (state, event) => (state.event = event),
  setEditEvent: (state, bool) => (state.isEditEvent = bool),
};

const actions = {
  async fetchEvents({ commit }) {
    const response = await axios.get(url)
    commit("setEvents", response.data)
  },
  setEvent({ commit }, event){
    commit('setEvent', event)
  },
  setEditEvent({ commit }, bool){
    commit('setEditEvent', bool)
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
