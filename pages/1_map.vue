<template>
  <div>

    <!-- [main] -->
    <v-content>
      <v-container fluid>
        <h1>vue2-googlemap sample </h1>

        <GmapMap
          :center="{lng:100.52973,lat:13.904549}"
          :zoom="15"
          map-type-id="terrain"
          style="width: 500px; height: 300px"
        >
          <GmapMarker
            v-for="(m, index) in markers"
            :key="index"
            :position="m.position"
            :clickable="true"
            :draggable="true"
            @click="center=m.position"
          />
        </GmapMap>
      </v-container>
    </v-content>
    <!-- [footer] -->
    <v-footer app inset>
      <span class="white--text">&copy; 2018 footer</span>
    </v-footer>

  </div>
</template>
<script>
export default {
  data() {
    return {
      markers: [
        {
          position: { lng: 100.52973, lat: 13.904549 }
        },
        {
          position: { lng: 100.527834, lat: 13.903676 }
        }
      ]
    }
  }
}
</script>
