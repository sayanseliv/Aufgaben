<template>
  <div id="app">
    <CurrentInfo :val="value" :fields="fields" :errored="errored" v-model="city" />

    <hr />
    <button id="button-add-CurrentInfo" v-on:click="addFormElement(city)">
      Add
    </button>

    <input type="text" :value="city" @input="update" />//для примера
    <hr />
  </div>
</template>

<script>
import CurrentInfo from "./components/tester";
import axios from "axios";
export default {
  name: "App",
  components: {
    CurrentInfo
  },
  data() {
    return {
      value: 0,
      city: "",
      fields: [],
      count: 1,
      errored: false,
      currentInfo: {
        coord: {
          lon: 0,
        },
        main: {
          temp: 0,
        },
      },
    };
  },
  methods: {
    update: function(event) {
      let value = event.target.value;

      this.city = value;
    },
    addFormElement: function(type) {
      if (!this.city) return;
      else {
        axios
          .get(
            `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=MyAPI`
          )
          .then(
            (response) => (
              (this.currentInfo = { ...response.data }),
              this.fields.push({
                type: type,
                id: this.count++,
                name: this.currentInfo.name,
                lon: this.currentInfo.coord.lon,
                lat: this.currentInfo.coord.lat,
                temp: this.currentInfo.main.temp,
                humidity: this.currentInfo.main.humidity,
              })
            )
          )
          .catch((error) => {
            console.log(error);
            this.errored = true;
          })
          .finally(() => (this.loading = false));
      }
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
