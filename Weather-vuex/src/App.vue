<template>
  <div id="app">
    <table border="1">
<tr>
  <th><button @click="sortTemp">Температура</button></th>
  <th><button @click="sortMax">Максимальная температура</button></th>
  <th><button @click="sortMin">Минимальня температура</button></th>
  <th><button @click="sortHumidity">Влажность</button></th>
</tr>
<tr>
  <th>Температура</th>
  <th>Максимальная температура</th>
  <th>Минимальня температура</th>
  <th>Влажность</th>
</tr>
      <tr v-for="(val, key) in weatherForecast" :key="key">
        <th>{{ val.temp }}</th>
        <th>{{ val.temp_max }}</th>
        <th>{{ val.temp_min }}</th>
        <th>{{ val.humidity }}</th>
      </tr>
    </table>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { SORTBYTEMP, SORTBYMAX, SORTBYMIN, SORTBYHUMIDITY } from "../src/store";
export default {
  name: 'App',
  components: {
  },
  computed: {
    ...mapState(['weatherForecast'])
  },
  methods: {
    ...mapActions({
      initWeatherAction: 'initWeatherForecast'
    }),
    sortMax(){
      this.$store.commit(SORTBYMAX)
    },
    sortTemp(){
      this.$store.commit(SORTBYTEMP)
    },
    sortMin(){
      this.$store.commit(SORTBYMIN)
    },
    sortHumidity(){
      this.$store.commit(SORTBYHUMIDITY)
    }
  },
  created() {
      this.initWeatherAction();   
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
  text-align: center;
}
</style>
