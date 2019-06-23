<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline">
        <span>집에 가고 싶어</span>
      </v-toolbar-title>
    </v-toolbar>
    <v-content>
    `<v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-list two-line>
          <v-list-tile
            value="true"
            v-for="(item, i) in value"
            :key="i"
            :to="item.to"
          >
            <v-list-tile-content>
              <v-list-tile-title>{{item.title}}</v-list-tile-title>
              <v-list-tile-sub-title>
                <v-progress-linear
                  v-model="item.value"
                  height="20"
                  color="info"
                >
                  <span class="black--text">{{item.value}}%</span>
                </v-progress-linear>
              </v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-card>
    </v-flex>`
    </v-content>
  </v-app>
</template>

<script>


export default {
  methods: {
    getTimePersent(start, end) {
      var startTime = new Date(start).getTime()
      var now = new Date().getTime()
      var endTime = new Date(end).getTime()
      return (now-startTime)/(endTime-startTime)*100
    }
  },
  data () {
    return {
      value: [
        {
          title: '졸업일',
          value: this.getTimePersent('2017-03-01', '2020-01-11')
        },
        {
          title: '집으로 돌아간다!',
          value: this.getTimePersent('2019-06-24 00:00:00', '2019-06-28')
        }
      ]
    }
  }

}
</script>
