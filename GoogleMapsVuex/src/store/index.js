import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const REFRESH_MARKERS_MUTATION = "refreshMarkers";
export const REFRESH_MARKERS_ACTION = "refreshAction";
export const UPDATE_MARKER_POSITION_KEY_BY_INDEX_MUTATION =
  "update_marker_by_index_mutation";
export const UPDATE_MARKER_POSITION_BY_INDEX_MUTATION =
  "update_marker_position_by_index_mutation";
export const REMOVE_MARKER_MUTATION = "remove_marker_mutation";
export const ADD_MARKER_MUTATION = "add_marker_mutation";
export const ROUND_LAT_LNG = "round_Lat_Lng";
export const FLAG = "flag";
export const SELECT = "select";

const icon = {
  url:
    "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
  scaledSize: { width: 28, height: 28 },
  labelOrigin: { x: 16, y: -10 },
};

const DEFAULT_MARKER = {
  position: {
    lat: 50,
    lng: 50,
  },
  favorite: false,
};
let timer = 300,
  wait = false;
export default new Vuex.Store({
  state: {
    markers: [
      { position: { lat: -25.363, lng: 131.044 }, icon: "", favorite: false },
    ],
  },
  mutations: {
    [ROUND_LAT_LNG](state) {
      let arrMarkers = state.markers;
      arrMarkers.forEach(function(elem) {
        elem.position.lat = Math.round(elem.position.lat);
        elem.position.lng = Math.round(elem.position.lng);
      });
    },
    [ADD_MARKER_MUTATION](state) {
      state.markers.push({ ...DEFAULT_MARKER });
    },
    [REFRESH_MARKERS_MUTATION](state, { markers }) {
      state.markers = markers;
    },
    [UPDATE_MARKER_POSITION_KEY_BY_INDEX_MUTATION](
      state,
      { index, value, positionKey }
    ) {
      state.markers[index].position[positionKey] = value;
    },
    [UPDATE_MARKER_POSITION_BY_INDEX_MUTATION](state, { index, position }) {
      if (!wait) {
        wait = true;
        state.markers[index].position = position;
        setTimeout(() => {
          wait = false;
        }, timer);
      }
    },
    [FLAG](state, index) {
      if (state.markers[index].favorite === true) {
        state.markers[index].icon = icon;
      } else {
        state.markers[index].icon = "";
      }
    },
    [REMOVE_MARKER_MUTATION](state, index) {
      state.markers.splice(index, 1);
    },
    [SELECT](state, favorite) {
      favorite = favorite.filter(function(el) {
        return el != false;
      });
      state.markers = favorite;
    },
  },
  getters: {
    favorite: (state) =>
      state.markers.filter(function(el) {
        return el.favorite;
      }),
  },
  actions: {
    [REFRESH_MARKERS_ACTION]({ commit }) {
      const markers = [];
      const count = 20;
      const getLat = () => Math.floor(Math.random() * 180 - 90);
      const getLng = () => Math.floor(Math.random() * 360 - 180);
      for (let i = 0; i < count; i++) {
        markers[i] = {
          position: {
            lat: getLat(),
            lng: getLng(),
          },
          favorite: false,
        };
      }
      commit({
        type: REFRESH_MARKERS_MUTATION,
        markers,
      });
    },
  },

  modules: {},
});
