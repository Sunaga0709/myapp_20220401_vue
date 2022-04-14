import axios from "axios";
import { serializeEvent } from '../../functions/serializers';

// APIのURL
const eventUrl = "http://localhost:3000/events";

// 保持データ
const state = {
  events: [],
  event: null,
  isEditEvent: false,
};

// stateから取得
const getters = {
  events: state => state.events.map(event => serializeEvent(event)),
  event: state => serializeEvent(state.event),
  isEditEvent: state => state.isEditEvent,
};

const mutations = {
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
};

const actions = {
  async fetchEvents({ commit }) { // APIからイベントを取得
    const res = await axios.get(eventUrl)
    commit("setEvents", res.data)
  },
  setEvent({ commit }, event){ // 編集、閲覧用にイベントを追加
    commit('setEvent', event)
  },
  setEditEvent({ commit }, bool){ // 編集、閲覧切り替え
    commit('setEditEvent', bool)
  },
  async createEvent({ commit }, event){ // イベント作成
    const res =  await axios.post(eventUrl, event)
    commit('addEvent', res.data)
  },
  async delEvent({ commit }, id){ // イベント削除
    const res = await axios.delete(`${eventUrl}/${id}`)
    commit('deleteEvent', res.data)
  },
  async updateEvent({ commit }, event){ // イベント更新
    const res = await axios.put(`${eventUrl}/${event.id}`, event)
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
