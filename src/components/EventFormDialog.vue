<template>
  <v-card class="pb-12">
    <v-card-actions class="d-flex justify-end pa-2">
      <v-btn icon @click="closeDialog">
        <v-icon size="20px">mdi-close</v-icon>
      </v-btn>
    </v-card-actions>

    <v-card-text>
      <DialogSection icon="mdi-circle" :color="event.color">
        <v-text-field v-model="name" label="イベント名"></v-text-field>
      </DialogSection>
    </v-card-text>

    <DialogSection icon="mdi-clock-outline">
      <DateForm v-model="startDate" />
      <TimeForm v-model="startTime" />
      <DateForm v-model="endDate" />
      <TimeForm v-model="endTime" />
    </DialogSection>

    <v-card-actions class="d-flex justify-end mr-4">
      <v-btn @click="submit">保存</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import DialogSection from './DialogSection.vue'
import DateForm from './DateForm.vue'
import TimeForm from './TimeForm.vue'

export default{
  name: 'EventFormDialog',
  components: {
    DialogSection,
    DateForm, 
    TimeForm,
  },
  data: () => ({
    name: '',
    startDate: null,
    startTime: null,
    endDate: null,
    endTime: null,
  }),
  computed: {
    ...mapGetters('events', ['event'])
  },
  methods: {
    ...mapActions('events', ['setEvent', 'setEditEvent', 'createEvent']),
    closeDialog(){
      this.setEvent(null)
      this.setEditEvent(false)
    },
    submit(){
      const params = {
        name: this.name,
        start: `${this.startDate} ${this.startTime} || ''`,
        end: `${this.endDate} ${this.endTime} || ''`,
      }
      this.createEvent(params)
      this.closeDialog()
    },
  },
  created(){
    this.startDate = this.event.startDate,
    this.startTime = this.event.startTime,
    this.endDate = this.event.endDate,
    this.endTime = this.event.endTime
  }
}
</script>