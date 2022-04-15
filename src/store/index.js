import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import { serializeEvent } from '../functions/serializers';

// APIのURL
const eventUrl = "http://localhost:3000/events";

Vue.use(Vuex);

export default new Vuex.Store({
  // 保持データ
  state: {
    events: [],
    event: null,
    isEditEvent: false,
    client: '',
  },
  // stateから取得
  getters: {
    events: state => state.events.map(event => serializeEvent(event)),
    event: state => serializeEvent(state.event),
    isEditEvent: state => state.isEditEvent,
    client: state => state.client,
  },
  mutations: {
    // イベント一覧をstateに保存
    setEvents: (state, events) => (state.events = events),
  
    // eventに特定のイベントを追加
    setEvent: (state, event) => (state.event = event),
  
    // 編集 or 閲覧を判定
    setEditEvent: (state, bool) => (state.isEditEvent = bool),
  
    // evemtsに追加
    addEvent: (state, event) => (state.events = [...state.events, event]),
  
    // eventsから削除
    deleteEvent: (state, event) => (state.events = state.events.filter(e => e.id !== event.id)),
  
    // eventをリセット
    resetEvent: state => (state.event = null),
  
    // eventを更新
    updateEvent: (state, event) => (state.events = state.events.map(e => (e.id === event.id ? event : e))),

    // clientを登録
    addClient: (state, param) => (state.client = param),

    // clientを削除
    deleteClient: state => state.client = '',
  },
  actions: {
    async fetchEvents({ commit }) { 
      const res = await axios.get(eventUrl)
      commit("setEvents", res.data)
    },
    setEvent({ commit }, event){ 
      commit('setEvent', event)
    },
    setEditEvent({ commit }, bool){ 
      commit('setEditEvent', bool)
    },
    async createEvent({ commit }, event){ 
      const res =  await axios.post(eventUrl, event)
      commit('addEvent', res.data)
    },
    async delEvent({ commit }, id){ 
      const res = await axios.delete(`${eventUrl}/${id}`)
      commit('deleteEvent', res.data)
    },
    async updateEvent({ commit }, event){ 
      const res = await axios.put(`${eventUrl}/${event.id}`, event)
      commit('updateEvent', res.data)
    },
    addClient({ commit }, param){
      commit('addClient', param)
    },
    deleteClient({ commit }){
      commit('deleteClient')
    }
  }
});
