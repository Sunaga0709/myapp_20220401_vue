<template>
  <v-row>
    <!-- アイコン -->
    <v-col cols="2" class="d-flex justify-center align-center">
      <v-icon size="20px" :color="color">{{ icon }}</v-icon>
    </v-col>

    <!-- 内容 -->
    <v-col cols="9" class="d-flex align-center">
      <slot></slot>
    </v-col>
  </v-row>
</template>

<script>
export default{
  name: 'DialogSection',
  props: ['icon', 'color'],
}
</script>