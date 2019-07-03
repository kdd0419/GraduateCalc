<template>
  <v-container fill height>
    <v-layout row wrap>
    <v-flex xs12 sm6 offset-sm3>
      <v-card class="pa-4 mt-5">
        <v-flex xs12 sm12 d-flex>
      <v-text-field
        label="학번"
        v-model="login_form.id"
        placeholder="ex) 1101"
        required
      ></v-text-field>
    </v-flex>
    <v-flex xs12 sm12 d-flex>
      <v-text-field
        label="비밀번호"
        v-model="login_form.pw"
        type="password"
        required
      ></v-text-field>
    </v-flex>
    <v-flex xs6 sm6 offset-xs6 offset-sm6 d-flex>
      <v-btn color="primary" dark large @click="login()">로그인</v-btn>
      <v-btn color="primary" dark large @click="dialog = true">회원가입</v-btn>
    </v-flex>
      <v-dialog v-model="dialog" persistent max-width="800px">
        <v-card>
          <v-card-title>
            <span class="headline">회원가입 입력창</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs4 sm4 d-flex>
                  <v-select
                    v-model="selectGrade"
                    :items="year"
                    label="학년"
                    ></v-select>
                  </v-flex>
                  <v-flex xs4 sm4 d-flex>
                    <v-select
                      v-model="selectClass"
                      :items="classes"
                      label="반"
                      ></v-select>
                    </v-flex>
                    <v-flex xs4 sm4 d-flex>
                      <v-select
                        v-model="selectNum"
                        :items="numbers"
                        label="번호"
                        ></v-select>
                      </v-flex>
                <v-flex xs12>
                  <v-text-field label="이름" required v-model="signin_name"></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field label="비밀번호" type="password" required v-model="signin_pw"></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="grey darken-1" flat @click="dialog = false">취소  </v-btn>
            <v-btn color="primary" flat @click="postUser()">회원가입</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card>
    </v-flex>
    </v-layout>
    <v-snackbar
      v-model="snackbar"
      top
    >
      {{ sbMsg }}
      <v-btn
        color="primary"
        flat
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      dialog: false,
      year: ['1', '2', '3'],
      classes: ['1', '2', '3', '4'],
      numbers: [...Array(22).keys()].map(i=> i+1),
      users: [],
      login_form: {
        id: '',
        pw: ''
      },
      selectGrade: '',
      selectClass: '',
      selectNum: '',
      signin_name: '',
      signin_pw: '',
      snackbar: false,
      sbMsg: ''
    }
  },
  created () {
    if(localStorage.user_id){
      location.href = '/main'
    }
  },
  methods: {
    login() {
      if (!this.login_form.id || this.login_form.id.length <= 0) return this.pop('학번이 입력되지 않았습니다.')
      if (!this.login_form.pw || this.login_form.pw.length <= 0) return this.pop('비밀번호가 입력되지 않았습니다.')
      axios.post('http://localhost:3000/api/user/in', this.login_form)
        .then((r) => {
          if (!r.data.success) return this.pop(r.data.msg)
          else this.pop("로그인에 성공하셨습니다.")
          localStorage.setItem('user_id', this.login_form.id)
          localStorage.setItem('user_name', r.data.msg.name)
          location.href='/main'
        })
        .catch((e)=>{
          this.pop(e.message)
        })
    },

    getUsers () {
      axios.get('http://localhost:3000/api/user')
        .then((r) => {
          this.users = r.data.users
        })
    },
    getOneUsers(){
      axios.get(`http://localhost:3000/api/user/${this.login_form.id}`, this.login_form.pw)
        .then((r) => {
          this.users = r.data.users
        })
        .catch((e)=>{
          this.pop(e.message)
        })
    },
    postUser () {
      if(!this.selectGrade||this.selectGrade.legnth <= 0) return this.pop('주어진 항목을 입력하지 않았습니다')
      if(!this.selectClass||this.selectClass.legnth <= 0) return this.pop('주어진 항목을 입력하지 않았습니다')
      if(!this.selectNum||this.selectNum.legnth <= 0) return this.pop('주어진 항목을 입력하지 않았습니다')
      if(!this.signin_name||this.signin_name.legnth <= 0) return this.pop('주어진 항목을 입력하지 않았습니다')
      if(!this.signin_pw||this.signin_pw.legnth <= 0) return this.pop('주어진 항목을 입력하지 않았습니다')
      this.dialog = false
      if(this.selectNum < 10){
        this.selectNum = '0' + this.selectNum
      }
      var signin_id = this.selectGrade + this.selectClass + this.selectNum
      axios.post('http://localhost:3000/api/user', {
        id: signin_id,
        name: this.signin_name,
        pw: this.signin_pw
      })
      .then((r) => {
        if(r.data.success){
          this.pop("회원가입에 성공했습니다")
          location.href = '/'
        }
        else this.pop("회원가입에 실패했습니다")
      })
      .catch(() => {
        this.pop("회원가입에 실패했습니다")
      })
    },
    pop (msg) {
      this.snackbar = true
      this.sbMsg = msg
    }
  }
}
</script>

<style lang="css" scoped>
</style>
