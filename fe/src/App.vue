<template>
  <v-app>
    <v-toolbar app class="primary">
      <v-toolbar-title class="headline white--text">
        <span>I Want to Go Home</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <span class="subheading white--text">{{user_name}}</span>
      <v-btn v-if="user_name" class="primary" flat @click="logout()">
        로그아웃
      </v-btn>
    </v-toolbar>
    <v-content :style="{'background-image': 'url(' + require('./back.png') + ')', 'background-size': '100% 100%'}">
      <router-view></router-view>
    </v-content>
    <!-- <v-stepper non-linear>
      <v-stepper-header>
        <v-stepper-step
          editable
          step="1"
        >
          <v-btn flat>회원가입을 하세요</v-btn>
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step
          editable
          step="2"
        >
        <v-btn flat>로그인을 하세요</v-btn>
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step
          step="3"
          editable
        >
        <v-btn flat>일정을 추가, 관리하세요</v-btn>
        </v-stepper-step>
      </v-stepper-header>
    </v-stepper> -->
  </v-app>
</template>

<script>
  export default {
    data() {
      return {
        user_name: ''
      }
    },

    updated(){
      if(localStorage.user_name){
        this.user_name = localStorage.user_name+" 님"

      }
    },
    methods: {
      logout() {
        localStorage.clear()
        location.href = '/'
      }
    }
  }
</script>
