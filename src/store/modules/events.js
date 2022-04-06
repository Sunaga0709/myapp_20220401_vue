import axios from "axios";
import { serializeEvent } from '../../functions/serializers';

const url = "http://localhost:3000/events";

const state = {
  events: [],
  event: null,
  isEditEvent: false,
};

const getters = {
  events: state => state.events.map(event => serializeEvent(event)),
  event: state => serializeEvent(state.event),
  isEditEvent: state => state.isEditEvent,
};

const mutations = {
  setEvents: (state, events) => (state.events = events),
  setEvent: (state, event) => (state.event = event),
  setEditEvent: (state, bool) => (state.isEditEvent = bool),
  addEvent: (state, event) => (state.events = [...state.events, event]),
  deleteEvent: (state, event) => (state.events = state.events.filter(e => e.id !== event.id)),
  resetEvent: state => (state.event = null),
  updateEvent: (state, event) => (state.events = state.events.map(e => (e.id === event.id ? event : e))),
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
  },
  async delEvent({ commit }, id){
    const res = await axios.delete(`${url}/${id}`)
    commit('deleteEvent', res.data)
  },
  async updateEvent({ commit }, event){
    const res = await axios.put(`${url}/${event.id}`, event)
    commit('updateEvent', res.data)
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
