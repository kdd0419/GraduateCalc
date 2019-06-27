<template>
  <v-container fill height>
    <v-layout row wrap>
    <v-flex xs12 sm6 offset-sm3>
      <v-card class="pa-4">
      <v-text-field
        label="학번"
        
        placeholder="ex) 1101"
      ></v-text-field>
      <v-text-field
        label="비밀번호"

      ></v-text-field>
      <v-btn color="primary" dark large>로그인</v-btn>
      <v-btn color="primary" dark large @click="dialog = true">회원가입</v-btn>
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
                    :items="year"
                    label="학년"
                    ></v-select>
                  </v-flex>
                  <v-flex xs4 sm4 d-flex>
                    <v-select
                      :items="classes"
                      label="반"
                      ></v-select>
                    </v-flex>
                    <v-flex xs4 sm4 d-flex>
                      <v-select
                        :items="numbers"
                        label="번호"
                        ></v-select>
                      </v-flex>
                <v-flex xs12>
                  <v-text-field label="이름" required></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field label="비밀번호" type="password" required></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="dialog = false">취소  </v-btn>
            <v-btn color="blue darken-1" flat @click="dialog = false">회원가입</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card>
    </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      year: ['1', '2', '3'],
      classes: ['1', '2', '3', '4'],
      numbers: [...Array(22).keys()].map(i=> i+1)
    }
  }
}
</script>

<style lang="css" scoped>
</style>
