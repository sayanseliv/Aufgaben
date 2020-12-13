<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div class="container">
      <div class="map-block">
        <GmapMap
          ref="mapRef"
          :center="mapCenter"
          :zoom="2"
          map-type-id="terrain"
          style="width: 700px; height: 600px"
        >
          <GmapMarker
            :key="index" 
            v-for="(m, index) in switcher ? favorite : markers"
            :icon ="m.icon"
            
            :visible.sync = m.visible
            :position="m.position"
            :clickable="true"
            :draggable="true"
            @drag="onMarkerDrag($event, index)"
            @click="mapCenter = m.position"
          />
        </GmapMap>
      </div>
      <div class="list-block">
        <md-button @click="onRefresh">Refresh</md-button>
     <md-checkbox id="checkbox" v-model="switcher" @change="swit"></md-checkbox>
        <md-table border="1">
          <colgroup>
            <col />
            <col style="width: 200px" />
            <col style="width: 200px" />
          </colgroup>
          <tr>
            <th>#</th>
            <th>Lat</th>
            <th>Lng</th>
          </tr>
          <tr
            class="table-row"
            v-for="(marker, index) in switcher ? favorite : markers"
            :key="index"
            @dblclick="onSelectMarker(marker)"
          >
            <td>{{ index }}</td>
            <td>
              <input
                type="number"
                min="-180"
                max="180"
                @input="onLatChange($event, index, 'lat')"
                :value="marker.position.lat"
              />
            </td>
            <td>
              <input
                type="number"
                min="-180"
                max="180"
                @input="onLatChange($event, index, 'lng')"
                :value="marker.position.lng"
              />
            </td>
            <td>
              <md-button @click="onRemove(index)">X</md-button>
               <md-checkbox v-model="marker.favorite" @change="makeFavorite(index)"></md-checkbox>
            </td>
          </tr>
        </md-table>
        <md-button @click="onAddMarker">Add</md-button>
        <md-button @click="Round_LatLng">Round LatLng</md-button>
        
      </div>
      
    </div>
  </div>
</template>

<script>

import {
  ADD_MARKER_MUTATION,
  REFRESH_MARKERS_ACTION, REMOVE_MARKER_MUTATION, UPDATE_MARKER_POSITION_BY_INDEX_MUTATION,
  UPDATE_MARKER_POSITION_KEY_BY_INDEX_MUTATION, ROUND_LAT_LNG, FLAG, SELECT
} from "../store";
import { mapState } from "vuex";
export default {

  data() {
    return {
      switcher: false,
      mapCenter: { lat: -25.363, lng: 131.044 }
    };
  },
  computed: {
    ...mapState(["markers"]),
    favorite: {
    get () {
      return this.$store.getters.favorite
    },
    set (value) {
      this.$store.commit(SELECT, value)
    }
  }
  },
  methods: {
    swit(){
      return this.switcher ? this.favorite : this.markers;
    },
makeFavorite(index){
this.$store.commit(FLAG, index)
},
    onRefresh() {
      this.$store.dispatch(REFRESH_MARKERS_ACTION);
    },
    onSelectMarker(marker) {
      this.mapCenter = marker.position;
    },
    onLatChange(event, index, positionKey) {
      
      this.$store.commit({
        type: UPDATE_MARKER_POSITION_KEY_BY_INDEX_MUTATION,
        positionKey,
        index,
        value: +event.target.value
      });
    },
    onMarkerDrag(event, index) {
      this.$store.commit({
        type: UPDATE_MARKER_POSITION_BY_INDEX_MUTATION,
        index,
        position: {
          lat: event.latLng.lat(),
          lng: event.latLng.lng()
        }
      });
    },
    Round_LatLng(){
this.$store.commit(ROUND_LAT_LNG)
    },
    onRemove(index) {
      this.$store.commit(REMOVE_MARKER_MUTATION, index);

    },
    onAddMarker() {
      this.$store.commit(ADD_MARKER_MUTATION);
    }
  },
  mounted() {
    this.$refs.mapRef.$mapPromise.then(map => {
      map.panTo(this.mapCenter);
    });
  },
};
</script>
<style lang="scss">
.container {
  display: flex;
  .map-block,
  .list-block {
    width: 50%;
  }
}
.table-row {
  &:hover {
    background-color: aliceblue;
    cursor: pointer;
  }
  input {
    width: 80%;
    margin: 5px;
  }

 
}</style>