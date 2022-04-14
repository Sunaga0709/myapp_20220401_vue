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
        label="パスワード"
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
    async login(){
      this.error = null
      const res = await axios.post('http://localhost:3000/auth/sign_in', {
        email: this.email,
        password: this.password,
      })
      .then(res => {
        if(!res){
          this.error = 'ログイン出来ませんでした'
        }
        console.log(res)
        this.email = ''
        this.password = ''
        return res
      }) 
      .catch(error => {
        this.error = 'ログイン出来ませんでした'
      })
    },
  },
};
</script>