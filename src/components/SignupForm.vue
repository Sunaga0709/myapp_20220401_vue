<template>
  <div>
    <h3>サインアップ</h3>

    <div v-if="error !== null">
      <p class="red--text">{{ error }}</p>
    </div>

    <v-form>
      <v-text-field
        v-model="name"
        label="ユーザ名"
        required
      >
      </v-text-field>

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

      <v-text-field
        v-model="password_confirmation"
        label="パスワード(確認)"
        type="password"
        required
      >
      </v-text-field>

      <v-btn color="primary" @click="signUp">サインアップ</v-btn>
    </v-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import axios from 'axios'

export default {
  name: 'SignupForm',
  data() {
    return {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      error: null,
    };
  },
  methods: {
    ...mapActions('sessions', ['setHeader']),
    signUp(){
      this.error = null
      axios.post('http://localhost:3000/auth', {
        name: this.name,
        email: this.email,
        password: this.password,
        password_confirmation: this.password_confirmation
      })
      .then(res => {
        if(res.status != 200){
          this.error = 'ユーザ登録に失敗しました'
        }else{
          this.setHeader('setHeader', res.headers)
        }
      })
    }
  },
};
</script>