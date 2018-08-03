<template>
  <v-app dark>  
    <!-- [toolbar] -->
    <v-toolbar dark color="primary">
      <v-toolbar-side-icon to='/'></v-toolbar-side-icon>
      <!-- *manu -->
      <v-btn to='/geocode'>geocode</v-btn>
      <v-btn to='/testui'>test-ui</v-btn>
      

      <v-toolbar-title class="white--text">toolbar title</v-toolbar-title>
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
