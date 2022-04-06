<template>
  <div>
    <v-sheet height="6vh" class="d-flex align-center">
      <v-btn outlined small class="ma-4" @click="setToday">今日</v-btn>
      <v-btn icon>
        <v-icon @click="$refs.calendar.prev()">mdi-chevron-left</v-icon>
      </v-btn>
      <v-btn icon @click="$refs.calendar.next()">
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
      <v-toolbar-title>{{ title }}</v-toolbar-title>
    </v-sheet>
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
import { mapGetters, mapActions } from "vuex"
import EventDialog from './EventDialog.vue'
import EventFormDialog from './EventFormDialog.vue'

export default {
  name: "Calendar",
  data: () => ({
    value: format(new Date(), 'yyyy/MM/dd'),
  }),
  components: {
    EventDialog,
    EventFormDialog,
  },
  computed: {
    ...mapGetters("events", ["events", "event", "isEditEvent"]),
    title(){
      return format(new Date(this.value), 'yyyy年 M月')
    },
  },
  methods: {
    ...mapActions("events", ["fetchEvents", "setEvent", "setEditEvent"]),
    setToday(){
      this.value = format(new Date(), 'yyyy/MM/dd')
    },
    showEvent({ nativeEvent, event }){
      this.setEvent(event)
      nativeEvent.stopPropagation()
    },
    closeDialog(){
      this.setEvent(null)
      this.setEditEvent(false)
    },
    initEvent({ date }){
      date = date.replace(/-/g, '/')
      const [start, end] = getDefaultTime(date)
      this.setEvent({name: '', start, end})
      this.setEditEvent(true)
    },
  },
};
</script>
