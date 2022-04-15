// 保持データ
const state = {
  // ヘッダ情報
  header: {
    uid: '',
    client: '',
    accessToken: '',
  }
};

// stateから取得
const getters = {
  client: state => state.header.client,
  uid: state => state.header.uid,
  accessToken: state => state.header.accessToken
};

const mutations = {
  setHeader(state, headers){ // stateにヘッダ情報を保持
    state.header.uid = headers.uid,
    state.header.client = headers.client,
    state.header.accessToken = headers['access-token']
  },
  resetHeader(state){
    state.header.uid = '',
    state.header.client = '',
    state.header.accessToken = ''
  }
};

const actions = {
  setHeader({ commit }, headers){
    commit('setHeader', headers)
  },
  resetHeader({ commit }){
    commit('resetHeader')
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
