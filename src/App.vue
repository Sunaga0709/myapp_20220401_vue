<template>
  <v-app>
    <v-main>
      <div v-if="client === ''">
        <div v-if="showLogin">
          <v-container class="mt-7" style="width: 400px;">
            <LoginForm />
            <p class="mt-5">
              ユーザ登録をされていない方は
              <span class="blue--text" @click="showLogin = false">こちら</span>
              をクリック
            </p>
          </v-container>
        </div>

        <div v-else>
          <v-container class="mt-7" style="width: 400px;">
            <SignupForm />
            <p class="mt-5">
              ユーザ登録済みの方は
              <span class="blue--text" @click="showLogin = true">こちら</span>
              をクリック
            </p>
          </v-container>
        </div>
      </div>

      <div v-else>
        <Calendar />
      </div>
    </v-main>
  </v-app>
</template>

<script>
import Calendar from "./components/Calendar.vue"
import LoginForm from "./components/LoginForm.vue"
import SignupForm from "./components/SignupForm.vue"

export default {
  name: "App",
  components: {
    Calendar,
    LoginForm,
    SignupForm,
  },
  data: () => ({
    uid: "",
    access_token: "",
    client: "",
    showLogin: true,
  }),
};
</script>
