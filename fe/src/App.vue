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
    <v-stepper non-linear>
      <v-stepper-header>
        <v-stepper-step
          editable
          step="1"
        >
          동국이를 때리세요
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step
          editable
          step="2"
        >
          Create an ad group
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step
          step="3"
          editable
        >
          Create an ad
        </v-stepper-step>
      </v-stepper-header>
    </v-stepper>
  </v-app>
</template>

<script>

</script>
