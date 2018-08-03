<template>
<div>

<!-- [main contents] -->
<v-content>
  <v-container fluid>
    <h2>geocode test</h2>
  </v-container>
</v-content>
<v-text-field label="input address" v-model="inputaddress"></v-text-field>
<v-btn @click="onGeocode">geocode</v-btn>
<!-- <p>input:{{inputaddress}} </p> -->
<p>address  : {{formatted_address}}</p>
<p>location : {{maplocation}}</p>

<!-- [googelmap] -->
<GmapMap
:center="maplocation"
:zoom="15"
map-type-id="terrain"
style="width: 500px; height: 300px"
>
  <GmapMarker
  :position = "maplocation"
  :clickable="true" 
  :draggable="true"
  @click="onMarkerClick"
  />
</GmapMap>


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
      //-- input --
      inputaddress:'',
      //-- output --
      formatted_address:'', 
      maplocation:{lng: 100.52973, lat: 13.904549},
    };

  },
  methods:{
    onMarkerClick(){
      console.log('--click maerker')
    },
    async onGeocode(){
      console.log('--[methods]')
      let data = await this.$store.dispatch('getGeocode',this.inputaddress)
      this.maplocation = data.geometry.location;
      this.formatted_address = data.formatted_address
      // console.log('--maplocation',this.maplocation)
    }
  }
};
</script>

