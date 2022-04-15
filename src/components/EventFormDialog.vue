<template>
  <v-card class="pb-12">
    <!-- 非表示ボタン -->
    <v-card-actions class="d-flex justify-end pa-2">
      <v-btn icon @click="closeDialog">
        <v-icon size="20px">mdi-close</v-icon>
      </v-btn>
    </v-card-actions>

    <!-- イベント名 -->
    <v-card-text class="pl-0">
      <DialogSection icon="mdi-circle" :color="color" class="pl-1">
        <v-text-field v-model="name" label="イベント名" class="pl-1"></v-text-field>
      </DialogSection>
    </v-card-text>

    <!-- 開始終了日時 -->
    <DialogSection icon="mdi-clock-outline">
      <!-- 開始 -->
      <div>
        <DateForm v-model="startDate" />
        <TimeForm v-model="startTime" />
      </div>

      <span>〜</span>

      <!-- 終了 -->
      <div>
        <DateForm v-model="endDate" />
        <TimeForm v-model="endTime" />
      </div>
    </DialogSection>

    <!-- メモ -->
    <DialogSection icon="mdi-card-text-outline">
      <TextForm v-model="memo" />
    </DialogSection>

    <!-- カラー -->
    <DialogSection icon="mdi-palette">
      <ColorForm v-model="color" />
    </DialogSection>

    <!-- 登録ボタン -->
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
  validations: { // バリデーション 
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
    ...mapGetters(['event']), // イベント取得
    isInvalidEndTime(){ // 終了日時をチェック
      return !checkEndTime(this.startDate, this.startTime, this.endDate, this.endTime)
    },
    isInvalid(){ // バリデーション判定
      return this.$v.$invalid || this.isInvalidEndTime
    },
  },
  methods: {
    ...mapActions(['setEvent', 'setEditEvent', 'createEvent', 'updateEvent']),
    closeDialog(){ // イベントダイアログ非表示
      this.setEvent(null)
      this.setEditEvent(false)
    },
    submit(){ // APIに送信
      if(this.isInvalid){ // バリデーションに該当する場合は送信されない
        return
      }
      const params = { // 送信データ
        ...this.event,
        name: this.name,
        start: `${this.startDate} ${this.startTime} || ''`,
        end: `${this.endDate} ${this.endTime} || ''`,
        memo: this.memo,
        color: this.color,
      }
      if(params.id){ // 新規作成 or 更新
        this.updateEvent(params)
      }else{
        this.createEvent(params)
      }
      this.closeDialog()
    },
  },
  created(){ // イベントフォーム初期値
    this.name = this.event.name,
    this.startDate = this.event.startDate,
    this.startTime = this.event.startTime,
    this.endDate = this.event.endDate,
    this.endTime = this.event.endTime,
    this.memo = this.event.memo,
    this.color = this.event.color
  }
}
</script>