import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

// Store ->
// 1. State - состояние приложения
// 2. Mutations -> this.setState({name: 'Katya'});
export const SORTBYTEMP = "sortByTemp";
export const SORTBYMAX = "sortByMax";
export const SORTBYMIN = "sortByMin";
export const SORTBYHUMIDITY = "sortByHumidity";
const store = new Vuex.Store({
  state: {
    weatherForecast: {
      list: [],
    },
    count: 1,
  },
  mutations: {
    updateWeather(state, data) {
      state.weatherForecast = data;
    },
    [SORTBYTEMP](state) {
      state.count += 1;
      state.weatherForecast.sort((a, b) => {
        if (state.count % 2 != 0) {
          //не изящно но быстро
          return b.temp - a.temp;
        } else {
          state.count = 0
          return a.temp - b.temp;
        }
      });
    },
    [SORTBYMAX](state) {
      state.count += 1;
      state.weatherForecast.sort((a, b) => {
        if (state.count % 2 != 0) {
          return b.temp_max - a.temp_max;
        } else {
          state.count = 0
          return a.temp_max - b.temp_max;
        }
      });
    },
    [SORTBYMIN](state) {
      state.count += 1;
      state.weatherForecast.sort((a, b) => {
        if (state.count % 2 != 0) {
          return b.temp_min - a.temp_min;
        } else {
          state.count = 0
          return a.temp_min - b.temp_min;
        }
      });
    },
    sortByHumidity(state) {
      state.count += 1;
      state.weatherForecast.sort((a, b) => {
        if (state.count % 2 != 0) {
          return b.humidity - a.humidity;
        } else {
          state.count = 0
          return a.humidity - b.humidity;
        }
      });
    },
  },
  actions: {
    initWeatherForecast({ commit }) {
      let thief = [];
      let cities = ["London", "Moscow", "Paris", "Odessa", "Pisa"];
      Promise.all(
        cities.map((id) =>
          fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${id}&appid=MyAPI&units=metric`
          )
            .catch((error) => {
              console.error(error);
              return { error };
            })
            .then((resp) => resp.json())
            .then((weather) => {
              thief.push(weather.main),
                commit("updateWeather", thief);
            })
        )
      );
    },
  },
});

export default store;
