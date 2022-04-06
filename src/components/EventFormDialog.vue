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
      <TextForm v-model="memo" />
    </DialogSection>

    <DialogSection icon="mdi-palette">
      <ColorForm v-model="color" />
    </DialogSection>

    <v-card-actions class="d-flex justify-center">
      <v-btn @click="submit" :disabled="isInvalid">保存</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
import { mapActions, mapGetters } from 'vuex'
import { checkEndTime } from '../functions/time.js'

import DialogSection from './DialogSection.vue'
import DateForm from './DateForm.vue'
import TimeForm from './TimeForm.vue'
import TextForm from './TextForm.vue'
import ColorForm from './ColorForm.vue'

export default{
  name: 'EventFormDialog',
  mixins: [validationMixin],
  components: {
    DialogSection,
    DateForm, 
    TimeForm,
    TextForm,
    ColorForm,
  },
  validations: {
    name: { required },
    startDate: { required },
    endDate: { required },
  },
  data: () => ({
    name: '',
    startDate: null,
    startTime: null,
    endDate: null,
    endTime: null,
    memo: null,
    color: '',
  }),
  computed: {
    ...mapGetters('events', ['event']),
    isInvalidEndTime(){
      return !checkEndTime(this.startDate, this.startTime, this.endDate, this.endTime)
    },
    isInvalid(){
      return this.$v.$invalid || this.isInvalidEndTime
    },
  },
  methods: {
    ...mapActions('events', ['setEvent', 'setEditEvent', 'createEvent']),
    closeDialog(){
      this.setEvent(null)
      this.setEditEvent(false)
    },
    submit(){
      if(this.isInvalid){
        return
      }
      const params = {
        name: this.name,
        start: `${this.startDate} ${this.startTime} || ''`,
        end: `${this.endDate} ${this.endTime} || ''`,
        memo: this.memo,
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