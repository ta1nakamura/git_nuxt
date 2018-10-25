<template>
  <div>

    <!-- [main] -->
    <v-content>
      <v-container fluid>
        <h1> gis_nuxt sample </h1>
        <pre>
    1. 1_map     : googlemap 
    2. 2_geocode : geocode , googlemap
    3. place/_id : placeData read/write sample
    testui : vuetify test
        </pre>
  
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
