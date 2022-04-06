<template>
  <v-card class="pb-12">
    <v-card-actions class="d-flex justify-end pa-2">
      <v-btn icon @click="closeDialog">
        <v-icon size="20px">mdi-close</v-icon>
      </v-btn>
    </v-card-actions>

    <v-card-title>
      <DialogSection icon="mdi-circle" :color="event.color">
        {{ event.name }}
      </DialogSection>
    </v-card-title>

    <v-card-text>
      <DialogSection icon="mdi-clock-time-three-outline">
        {{ event.start.toLocaleString() }} 〜 {{ event.end.toLocaleString() }}
      </DialogSection>
    </v-card-text>

    <v-card-text v-if="event.memo">
      <DialogSection icon="mdi-card-text-outline">
        {{ event.memo }}
      </DialogSection>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import DialogSection from './DialogSection.vue'

export default{
  name: 'EventDialog',
  components: {
    DialogSection,
  },
  computed: {
    ...mapGetters('events', ['event'])
  },
  methods: {
    ...mapActions('events', ['setEvent']),
    closeDialog(){
      this.setEvent(null)
    },
  },
}
</script>