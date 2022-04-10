<template>
  <v-card class="pb-12">
    <v-card-actions class="d-flex justify-end pa-2">
      <!-- 編集ボタン -->
      <v-btn icon @click="edit">
        <v-icon size="20px">mdi-pencil-outline</v-icon>
      </v-btn>

      <!-- 削除ボタン -->
      <v-btn icon @click="del">
        <v-icon size="20px">mdi-trash-can-outline</v-icon>
      </v-btn>

      <!-- イベント非表示 -->
      <v-btn icon @click="closeDialog">
        <v-icon size="20px">mdi-close</v-icon>
      </v-btn>
    </v-card-actions>

    <!-- イベント名 -->
    <v-card-title>
      <DialogSection icon="mdi-circle" :color="event.color">
        {{ event.name }}
      </DialogSection>
    </v-card-title>

    <!-- 開始終了日時 -->
    <v-card-text>
      <DialogSection icon="mdi-clock-time-three-outline">
        {{ event.start.toLocaleString() }} 〜 {{ event.end.toLocaleString() }}
      </DialogSection>
    </v-card-text>

    <!-- メモ -->
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
  computed: { // vuexからイベント取得
    ...mapGetters('events', ['event'])
  },
  methods: {
    ...mapActions('events', ['setEvent', 'delEvent', 'setEditEvent']),
    closeDialog(){ // イベントダイアログを非表示
      this.setEvent(null)
    },
    del(){ // イベント削除
      this.delEvent(this.event.id)
      this.closeDialog()
    },
    edit(){ // 編集フォームに切り替え
      this.setEditEvent(true)
    },
  },
}
</script>