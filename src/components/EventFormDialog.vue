<template>
  <v-card class="pb-12">
    <v-card-actions class="d-flex justify-end pa-2">
      <v-btn icon @click="closeDialog">
        <v-icon size="20px">mdi-close</v-icon>
      </v-btn>
    </v-card-actions>

    <v-card-text class="pl-0">
      <DialogSection icon="mdi-circle" :color="color" class="pl-1">
        <v-text-field v-model="name" label="イベント名" class="pl-1"></v-text-field>
      </DialogSection>
    </v-card-text>

    <DialogSection icon="mdi-clock-outline">
      <div>
        <DateForm v-model="startDate" />
        <TimeForm v-model="startTime" />
      </div>
      <span>〜</span>
      <div>
        <DateForm v-model="endDate" />
        <TimeForm v-model="endTime" />
      </div>
    </DialogSection>

    <DialogSection icon="mdi-card-text-outline">
      <TextForm v-model="description" />
    </DialogSection>

    <DialogSection icon="mdi-palette">
      <ColorForm v-model="color" />
    </DialogSection>

    <v-card-actions class="d-flex justify-center">
      <v-btn @click="submit">保存</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import DialogSection from './DialogSection.vue'
import DateForm from './DateForm.vue'
import TimeForm from './TimeForm.vue'
import TextForm from './TextForm.vue'
import ColorForm from './ColorForm.vue'

export default{
  name: 'EventFormDialog',
  components: {
    DialogSection,
    DateForm, 
    TimeForm,
    TextForm,
    ColorForm,
  },
  data: () => ({
    name: '',
    startDate: null,
    startTime: null,
    endDate: null,
    endTime: null,
    description: '',
    color: '',
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
        description: this.description,
        color: this.color,
      }
      this.createEvent(params)
      this.closeDialog()
    },
  },
  created(){
    this.startDate = this.event.startDate,
    this.startTime = this.event.startTime,
    this.endDate = this.event.endDate,
    this.endTime = this.event.endTime,
    this.color = this.event.color
  }
}
</script>