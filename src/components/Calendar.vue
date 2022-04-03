<template>
  <div>
    <h1>カレンダー</h1>
    <ul>
      <li v-for="event in events" :key="event.id">
        {{ event.name }}
      </li>
    </ul>
    <button type="submit" @click="fetchEvents()">イベント取得</button>

    <CalendarDetails />
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import CalendarDetails from './CalendarDetails.vue'

  export default{
    name: 'Calendar',
    components: {
      CalendarDetails,
    },
    computed: {
      ...mapGetters('events', ['events'])
    },
    methods: {
      ...mapActions('events', ['fetchEvents'])
    },
  }
</script>