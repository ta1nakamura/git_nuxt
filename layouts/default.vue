<template>
  <v-app dark>  
    <!-- [toolbar] -->
    <v-toolbar dark color="primary">
      <v-toolbar-side-icon to='/'></v-toolbar-side-icon>
      <!-- *manu -->
      <v-btn to='/place/01'>/place/01</v-btn>
      <v-btn to='/place/02'>/place/02</v-btn>

      <v-btn to='/2_geocode'>2_geocode</v-btn>
      <v-btn to='/1_map'>1_map</v-btn>
      
      <v-btn to='/testui'>test-ui</v-btn>
      
      <v-toolbar-title class="white--text">title</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
      <nuxt />
  </v-app>
</template>

<script>
  export default {
    data() {
      return {
   
      }
    }
  }
</script>
