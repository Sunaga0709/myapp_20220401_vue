// 保持データ
const state = {
  // ヘッダ情報
  accessToken: '',
  uid: '',
  client: ''
};

// stateから取得
const getters = {
  client: state => state.client,
  uid: state => state.uid,
  accessToken: state => state.accessToken
};

const mutations = {
  login(state, headers){  // ログイン時のレスポンスからヘッダ情報を取得、保持
    state.accessToken = headers['access-token'],
    state.client = headers['client'],
    state.uid = headers['uid']
  },
  logout(state){ // ヘッダ情報を削除
    state.headers.accessToken = '',
    state.headers.uid = '',
    state.headers.client = ''
  },
};

const actions = {
  setHeader({ commit }, headers){
    commit('login', headers)
  },
  resetHeader({ commit }){
    commit('logout')
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
