<template>
  <div>
    <!-- カレンダーヘッダ -->
    <v-sheet height="6vh" class="d-flex align-center">
      <div>
        <v-btn outlined small class="ma-4" @click="setToday">今日</v-btn>

        <v-btn icon>
          <v-icon @click="$refs.calendar.prev()">mdi-chevron-left</v-icon>
        </v-btn>

        <v-btn icon @click="$refs.calendar.next()">
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>        
      </div>

      <v-toolbar-title>{{ title }}</v-toolbar-title>

      <v-row class="justify-end ma-4">
        <v-btn outlined small class="ma-4" @click="logout">ログアウト</v-btn>
      </v-row>
    </v-sheet>

    <!-- カレンダーボディ -->
    <v-sheet height="94vh">
      <v-calendar
        ref="calendar"
        v-model="value"
        :events="events"
        @change="fetchEvents"
        locale="ja-jp"
        :day-format="(timestamp) => new Date(timestamp.date).getDate()"
        :month-format="(timestamp) => (new Date(timestamp.date).getMonth() + 1) + ' /'"
        @click:event="showEvent"
        @click:day="initEvent"
      ></v-calendar>
    </v-sheet>

    <v-dialog :value="event !== null" @click:outside="closeDialog" width="600">
      <EventDialog v-if="event !== null && !isEditEvent" />
      <EventFormDialog v-if="event !== null && isEditEvent" />
    </v-dialog>
  </div>
</template>

<script>
import { getDefaultTime } from '../functions/time.js'
import { format } from 'date-fns'
import { mapGetters, mapActions } from 'vuex'
import axios from 'axios'

import EventDialog from './EventDialog.vue'
import EventFormDialog from './EventFormDialog.vue'

export default {
  name: 'Calendar',
  data: () => ({
    value: format(new Date(), 'yyyy/MM/dd'),
  }),
  components: {
    EventDialog,
    EventFormDialog,
  },
  computed: {
    ...mapGetters(['events', 'event', 'isEditEvent', 'client']),
    title(){
      return format(new Date(this.value), 'yyyy年 M月')
    },
  },
  methods: {
    ...mapActions(['fetchEvents', 'setEvent', 'setEditEvent', 'deleteClient']),
    setToday(){  // 現在日時
      this.value = format(new Date(), 'yyyy/MM/dd')
    },
    showEvent({ nativeEvent, event }){ // イベント表示
      this.setEvent(event)
      nativeEvent.stopPropagation()
    },
    closeDialog(){ // イベントダイアログ非表示
      this.setEvent(null)
      this.setEditEvent(false)
    },
    initEvent({ date }){ // イベントフォーム初期化
      date = date.replace(/-/g, '/')
      const [start, end] = getDefaultTime(date)
      this.setEvent({name: '', start, end})
      this.setEditEvent(true)
    },
    logout(){
      axios.delete('http://localhost:3000/auth/sign_out', {
        headers: {
          'access-token': localStorage.getItem('access-token'),
          'uid': localStorage.getItem('uid'),
          'client': localStorage.getItem('client'),
        }
      })
      .then(() => {
        // localstorageのヘッダ情報を削除
        localStorage.removeItem('access-token')
        localStorage.removeItem('uid')
        localStorage.removeItem('client')

        // state.clientを削除
        this.deleteClient()
      })
    }
  },
};
</script>
