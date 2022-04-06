<template>
  <v-card class="pb-12">
    <v-card-actions class="d-flex justify-end pa-2">
      <v-btn icon @click="edit">
        <v-icon size="20px">mdi-pencil-outline</v-icon>
      </v-btn>

      <v-btn icon @click="del">
        <v-icon size="20px">mdi-trash-can-outline</v-icon>
      </v-btn>

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

    <v-card-text v-if="event.memo !== null">
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
    ...mapActions('events', ['setEvent', 'delEvent', 'setEditEvent']),
    closeDialog(){
      this.setEvent(null)
    },
    del(){
      this.delEvent(this.event.id)
      this.closeDialog()
    },
    edit(){
      this.setEditEvent(true)
    },
  },
}
</script>