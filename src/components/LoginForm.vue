<template>
  <div>
    <h3>ログイン</h3>

    <div v-if="error !== null">
      <p class="red--text">{{ error }}</p>
    </div>

    <v-form>
      <v-text-field
        v-model="email"
        label="メールアドレス"
        required
      >
      </v-text-field>

      <v-text-field
        v-model="password"
        label="パスワード(6文字以上)"
        type="password"
        required
      >
      </v-text-field>

      <v-btn color="primary" @click="login">ログイン</v-btn>
    </v-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import axios from 'axios'

export default {
  name: 'LoginForm',
  data() {
    return {
      email: '',
      password: '',
      error: null,
    };
  },
  methods: {
    ...mapActions(['addClient']),
    login(){
      this.error = null  // エラー初期化
      axios.post('http://localhost:3000/auth/sign_in', {  // ログイン
        email: this.email,
        password: this.password,
      })
      .then(res => {  // 失敗の時 
        if(res.status !== 200){
          this.error = 'ログインできませんでした'
        }

        // localStorageにヘッダを保存
        localStorage.setItem('access-token', res.headers['access-token'])
        localStorage.setItem('uid', res.headers['uid'])
        localStorage.setItem('client', res.headers['client'])

        // state.client登録
        this.addClient(res.headers['client'])
      })
      .catch(() => {
        this.error = 'ログインできませんでした'
      })
    }
  },
};
</script>