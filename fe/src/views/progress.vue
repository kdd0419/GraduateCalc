<template>
  <v-container fill-height>
    <v-layout row wrap>
  <v-flex xs12 sm8 offset-sm2>
    <v-card>
      <v-list two-line>
        <template v-for="(item, i) in value">
        <v-list-tile
          :key="item._id"
          class="pt-2"
        >
          <v-list-tile-content>
            <v-list-tile-title class="indigo--text title font-weight-bold">{{item.name}} ( {{item.end}} )</v-list-tile-title>
            <v-list-tile-sub-title>
              <v-progress-linear
                v-model="item.value"
                height="22"
                color="info"
              >
                <span class="black--text ml-3 subheading">{{item.value}}% {{item.left_time}}</span>
              </v-progress-linear>

            </v-list-tile-sub-title>
          </v-list-tile-content>
          <v-list-tile-action>
          <v-btn v-if="i >= 2" color="primary" icon ripple @click="openEditDialog(item)">
            <v-icon>edit</v-icon>
          </v-btn>
        </v-list-tile-action>
        </v-list-tile>
        <v-divider :key="i"></v-divider>
      </template>
      </v-list>
      <v-btn large color="primary" dark @click="add.dialog = true">D-Day 항목 추가</v-btn>

    <v-dialog v-model="add.dialog" persistent max-width="800px">
      <v-card>
        <v-card-title>
          <span class="headline">D-DAY 추가 항목 입력창</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm12 d-flex>
              <v-text-field
                label="해야 할 일 이름 (제목)"
                v-model="add.title"
              ></v-text-field>
              </v-flex>
              <v-flex xs8 sm10>
                <v-menu
                   v-model="add.startTimeMenu"
                   :close-on-content-click="false"
                   :nudge-right="0"
                   lazy
                   transition="scale-transition"
                   offset-y
                   full-width
                   min-width="290px"
                 >
                   <template v-slot:activator="{ on }">
                     <v-text-field
                       v-model="add.startTime"
                       label="시작 일자"
                       prepend-icon="event"
                       readonly
                       v-on="on"
                     ></v-text-field>
                   </template>
                   <v-date-picker v-model="add.startTime" @input="add.startTimeMenu = false; chkStartIsToday(add)"></v-date-picker>
                 </v-menu>
              </v-flex>
              <v-flex xs4 sm2 d-flex>
                <v-checkbox label="오늘로 설정" v-model="add.setStartTimeNow" @change="setStartTime(add)"></v-checkbox>
              </v-flex>
              <v-flex xs12 sm12>
                <v-menu
                   v-model="add.endTimeMenu"
                   :close-on-content-click="false"
                   :nudge-right="0"
                   lazy
                   transition="scale-transition"
                   offset-y
                   full-width
                   min-width="290px"
                 >
                   <template v-slot:activator="{ on }">
                     <v-text-field
                       v-model="add.endTime"
                       label="종료 일자"
                       prepend-icon="event"
                       readonly
                       v-on="on"
                     ></v-text-field>
                   </template>
                   <v-date-picker v-model="add.endTime" @input="add.endTimeMenu = false"></v-date-picker>
                 </v-menu>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey darken-1" flat @click="add.dialog = false">취소  </v-btn>
          <v-btn color="blue darken-1" flat @click="addDDay()">항목 추가</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="update.dialog" persistent max-width="800px">
      <v-card>
        <v-card-title>
          <span class="headline">D-DAY 항목 수정 창</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm12 d-flex>
              <v-text-field
                label="해야 할 일 이름 (제목)"
                v-model="update.title"
              ></v-text-field>
              </v-flex>
              <v-flex xs9 sm9>
                <v-menu
                   v-model="update.startTimeMenu"
                   :close-on-content-click="false"
                   :nudge-right="0"
                   lazy
                   transition="scale-transition"
                   offset-y
                   full-width
                   min-width="290px"
                 >
                   <template v-slot:activator="{ on }">
                     <v-text-field
                       v-model="update.startTime"
                       label="시작 일자"
                       prepend-icon="event"
                       readonly
                       v-on="on"
                     ></v-text-field>
                   </template>
                   <v-date-picker v-model="update.startTime" @input="update.startTimeMenu = false; chkStartIsToday(update)"></v-date-picker>
                 </v-menu>
              </v-flex>
              <v-flex xs3 sm3 d-flex>
                <v-checkbox label="오늘로 설정" v-model="update.setStartTimeNow" @change="setStartTime(update)"></v-checkbox>
              </v-flex>
              <v-flex xs12 sm12>
                <v-menu
                   v-model="update.endTimeMenu"
                   :close-on-content-click="false"
                   :nudge-right="0"
                   lazy
                   transition="scale-transition"
                   offset-y
                   full-width
                   min-width="290px"
                 >
                   <template v-slot:activator="{ on }">
                     <v-text-field
                       v-model="update.endTime"
                       label="종료 일자"
                       prepend-icon="event"
                       readonly
                       v-on="on"
                     ></v-text-field>
                   </template>
                   <v-date-picker v-model="update.endTime" @input="update.endTimeMenu = false"></v-date-picker>
                 </v-menu>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey darken-1" flat @click="update.dialog = false">수정 취소</v-btn>
          <v-btn color="red darken-1" flat @click="deleteDDay()">항목 삭제</v-btn>
          <v-btn color="blue darken-1" flat @click="editDDay()">항목 수정</v-btn>
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
  methods: {
    getTimePersent(start, end) {
      var startTime = new Date(start).getTime()
      var now = new Date().getTime()
      var endTime = new Date(end).getTime()
      now = new Date(now - new Date().getTimezoneOffset()*60*1000).getTime()
      return Math.round((now-startTime)/(endTime-startTime)*1000)/10
    },

    getSunday() {
      var today = new Date();
      var sun = new Date(today.getFullYear(), today.getMonth(), today.getDate()-today.getDay()+1)
      sun.setHours(6, 0, 0, 0)
      return sun.getTime()
    },

    getFriday() {
      var today = new Date();
      var fri = new Date(today.getFullYear(), today.getMonth(), today.getDate()-today.getDay()+6)
      fri.setHours(1,0,0,0)
      return fri.getTime()
    },

    setStartTime(menu) {
      if(menu.setStartTimeNow===true){
        menu.startTime = new Date().toISOString().substr(0, 10)
      }else{
        menu.startTime = ''
      }
    },

    chkStartIsToday(menu) {
      if(menu.startTime !== new Date().toISOString().substr(0, 10)){
        menu.setStartTimeNow = false
      }
    },
    getDDay(end){
      var now = new Date().getTime()
      var endTime = new Date(end).getTime()
      now = new Date(now - new Date().getTimezoneOffset()*60*1000).getTime()
      var dur = endTime-now
      var left_day = Math.floor((dur)/(1000*60*60*24))
      var left_hour = Math.floor((dur%(1000*60*60*24))/(1000*60*60))
      return "( D- "+left_day+" days "+ left_hour + " hours )"
    },
    addDDay(){
      if(!this.add.title||this.add.title.legnth <= 0) return this.pop('주어진 항목을 입력하지 않았습니다')
      if(!this.add.startTime||this.add.startTime.legnth <= 0) return this.pop('주어진 항목을 입력하지 않았습니다')
      if(!this.add.endTime||this.add.endTime.legnth <= 0) return this.pop('주어진 항목을 입력하지 않았습니다')
      this.add.dialog = false
      axios.post('http://localhost:3000/api/time/', {
        id: localStorage.user_id,
        name: this.add.title,
        start: this.add.startTime,
        end: this.add.endTime
      })
      .then((r) => {
        if(r.data.success){
          this.pop("D-Day 항목 추가에 성공했습니다")
          this.getAllDDay()
        }
        else this.pop("D-Day 항목 추가에 실패했습니다")
      })
      .catch(() => {
        this.pop("D-Day 항목 추가에 실패했습니다")
      })
    },
    getAllDDay(){
      axios.get(`http://localhost:3000/api/time/${localStorage.user_id}`)
        .then((r) => {
          this.value = this.value.slice(0,2)
          var val_rlt = r.data.times
          while(val_rlt.length > 0){
            var v = val_rlt.pop()
            v.left_time = this.getDDay(v.end)
            v.value = this.getTimePersent(v.start, v.end)
            this.value.push(v)
          }
        })
    },
    pop (msg) {
      this.snackbar = true
      this.sbMsg = msg
    },
    editDDay(){
      if(!this.update.title||this.update.title.legnth <= 0) return this.pop('주어진 항목을 입력하지 않았습니다')
      if(!this.update.startTime||this.update.startTime.legnth <= 0) return this.pop('주어진 항목을 입력하지 않았습니다')
      if(!this.update.endTime||this.update.endTime.legnth <= 0) return this.pop('주어진 항목을 입력하지 않았습니다')
      axios.put(`http://localhost:3000/api/time/${this.update.item_id}`,{
        id: localStorage.user_id,
        name: this.update.title,
        start: this.update.startTime,
        end: this.update.endTime
      })
      .then(() => {
        this.pop('D-Day 항목 수정 완료되었습니다')
        this.update.dialog = false
        this.getAllDDay()
      })
      .catch(()=>{
        this.pop('D-Day 항목 수정에 실패했습니다')
      })
    },
    openEditDialog(item){
      this.update.title = item.name
      this.update.startTime = item.start
      this.update.endTime = item.end
      this.update.dialog = true
      this.update.item_id = item._id
    },
    deleteDDay(){
      this.update.dialog = false
      axios.delete(`http://localhost:3000/api/time/${this.update.item_id}`)
        .then(() => {
          this.pop('해당 D-Day 항목이 삭제되었습니다')
          this.getAllDDay()
        })
        .catch(() => {
          this.pop("D-Day 항목 삭제에 실패했습니다")
        })
    }
  },
  created(){
    if(!localStorage.user_id){
      location.href = '/'
    }
    this.getAllDDay()
  },
  data () {
    return {
      value: [
        {
          name: '졸업일',
          start: '2017-03-01',
          end: '2020-01-11',
          value: this.getTimePersent('2017-03-01', '2020-01-11'),
          left_time: this.getDDay('2020-01-11')
        },
        {
          name: '집으로 돌아간다!',
          start: new Date(this.getSunday()).toISOString().substr(0,10),
          end: new Date(this.getFriday()).toISOString().substr(0,10),
          value: this.getTimePersent(this.getSunday(), this.getFriday()),
          left_time: this.getDDay(this.getFriday())
        }
      ],
      add: {
        dialog: false,
        title: '',
        startTime: '',
        setStartTimeNow: false,
        startTimeMenu: false,
        endTime: '',
        endTimeMenu: false
      },
      update: {
        dialog: false,
        title: '',
        startTime: '',
        setStartTimeNow: false,
        startTimeMenu: false,
        endTime: '',
        endTimeMenu: false,
        item_id: ''
      },
      snackbar: false,
      sbMsg: ''

    }
  }

}
</script>
