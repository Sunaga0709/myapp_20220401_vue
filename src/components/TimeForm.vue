<template>
  <v-menu offset-y>
    <!-- 時間選択用メニュー -->
    <template v-slot:activator="{ on }">
      <v-btn text v-on="on">
        {{ value || '時間を選択' }}
      </v-btn>
    </template>

    <!-- 日時選択 -->
    <v-list height="300px" class="overflow-y-auto">
      <v-list-item v-for="(time, i) in times" :key="i" @click="$emit('input', time)">
        {{ time }}
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import { getTimeList } from '../functions/time.js'

export default{
  name: 'TimeForm',
  props: ['value'],
  computed: { // 分のリスト取得
    times(){
      return getTimeList()
    }
  },
}
</script>