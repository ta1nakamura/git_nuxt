<template>
  <div>
    <!-- [main contents] -->
    <v-content>
      <v-container fluid>
        <!-- [sample xs12] -->
        <v-layout row wrap align-center justify-center class="text-xs-center" >
          <v-flex v-for="i in 12" :key="`1${i}`" xs1>
            <v-card dark color="glay">
              <v-card-text class="px-0">{{ i }}</v-card-text>
            </v-card>
          </v-flex>
        </v-layout>

        <h1>test</h1>
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
