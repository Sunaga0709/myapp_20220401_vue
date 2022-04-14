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
import axios from 'axios'
import { mapActions } from 'vuex'

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
    ...mapActions('sessions', ['setHeader']),
    login(){
      this.error = null
      axios.post('http://localhost:3000/auth/sign_in', {
        email: this.email,
        password: this.password,
      })
      .then(res => {
        if(res.status != 200){
          this.error = 'ログインできませんでした'
        }else{
          this.setHeader('setHeader', res.headers)
        }
      })
    }
  },
};
</script>