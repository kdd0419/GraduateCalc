<template>
  <v-app>
    <v-toolbar app class="primary">
      <v-toolbar-title class="headline white--text">
        <span>I want to go home</span>
      </v-toolbar-title>
    </v-toolbar>
    <v-content :style="{'background-image': 'url(' + require('./back.png') + ')', 'background-size': '100% 100%'}">
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>

</script>
