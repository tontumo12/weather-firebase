<template>
  <v-row>
    <v-col cols="1"></v-col>
    <v-col cols="10">
      <v-text-field v-model="nhietdo" :counter="10"  label="Nhiệt độ" required></v-text-field>
      <v-text-field v-model="checkRain" :counter="10" label="Khả năng mưa" required></v-text-field>
      <v-text-field v-model="wind" :counter="10" label="Tốc độ gió" required></v-text-field>
      <v-text-field v-model="humidity" :counter="10" label="Độ ẩm" required></v-text-field>
      <v-btn class="mr-4" @click="sendTem">
        submit
      </v-btn>
      <v-btn @click="clear">
        clear
      </v-btn>
    </v-col>
  </v-row>
</template>
<script>
  import axios from 'axios'
  import {
    mapState
  } from 'vuex'

  export default {
    data() {
      return {
        nhietdo: 0,
        checkRain: '',
        wind: '',
        humidity: 0,
        select: null,
        items: [
          {
            text: 'Ngày',
            value: 'day'
          },
          {
            text: 'Đêm',
            value: 'night'
          },
        ],
      }
    },
    computed: {
      ...mapState('Noti', ['token'])
    },
    methods: {
      clear() {
        this.nhietdo = 0,
        this.checkRain = 0
        this.wind = 0
        this.humidity = 0
      },
      async sendTem() {
        let data = {
          nhietdo: parseInt(this.nhietdo),
          checkRain: parseInt(this.checkRain),
          wind: parseInt(this.wind),
          humidity: parseInt(this.humidity),
          type: 'night'
        }
        let article = {
          title: "Thay đổi thời tiết",
          body: data,
          token: this.token
        }
        console.log(article)
        await axios.post("http://18.222.13.99:3001/request", article).then((result) => {
          alert(JSON.stringify(result))
        })
      }
    },
  }

</script>
