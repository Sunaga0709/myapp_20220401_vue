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
  addEvent: (state, event) => (state.events = [...state.events, event]),
};

const actions = {
  async fetchEvents({ commit }) {
    const res = await axios.get(url)
    commit("setEvents", res.data)
  },
  setEvent({ commit }, event){
    commit('setEvent', event)
  },
  setEditEvent({ commit }, bool){
    commit('setEditEvent', bool)
  },
  async createEvent({ commit }, event){
    const res =  await axios.post(url, event)
    commit ('addEvent', res.data)
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
