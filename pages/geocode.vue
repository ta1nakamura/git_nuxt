<template>
<div>

<!-- [main contents] -->
<v-content>
  <v-container fluid>
    <h2>geocode test</h2>
  </v-container>
</v-content>

<!-- [footer] -->
<v-footer  app inset>
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
    };
  }
};
</script>

