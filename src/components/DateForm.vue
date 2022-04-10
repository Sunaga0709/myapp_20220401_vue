<template>
  <v-menu offset-y>
    <!-- 日付選択メニュー -->
    <template v-slot:activator="{ on }">
      <v-btn text v-on="on">
        {{ value || '日付選択' }}
      </v-btn>
    </template>
    
    <!-- 日付選択用カレンダー -->
    <v-date-picker
      :value="value.replace(/\//g, '-')"
      @input="$emit('input', $event.replace(/-/g, '/'))"
      no-title
      locale="ja-jp"
      :day-format="value => new Date(value).getDate()"
    ></v-date-picker>
  </v-menu>
</template>

<script>
export default{
  name: 'DateForm',
  props: ['value']
}
</script>
