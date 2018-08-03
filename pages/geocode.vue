<template>
<div>

<!-- [main contents] -->
<v-content>
<v-container fluid justify-center >
<h2>geocode test</h2>

<!-- [input] -->
<v-layout row wrap 1>
    <v-flex xs3>
      <v-select 
      v-model     = "selected_country"
      :hint       = "`${selected_country.name}, ${selected_country.region}`"
      label       = "select country"
      :items      = "countries"
      item-text   = "name"
      item-value  = "region"
      persistent-hint
      return-object
      single-line
      ></v-select>
    </v-flex>
    <v-flex xs4>
      <v-text-field label="input address" 
      v-model="inputaddress"></v-text-field>
    </v-flex>
</v-layout>

<v-btn @click="onGeocode" color="secondary">goMap</v-btn>


<!-- <p>input:{{inputaddress}} </p> -->
<p> Address  : {{formatted_address}} </p>
<p> Location : {{maplocation}}</p>
<!-- [repotedCenter] -->
<h3>Map information</h3> 
Map center : {{reportedCenter}} 
<!-- [googelmap] -->
<GmapMap class="map-panel" map-type-id="terrain" style="width: 500px; height: 300px"
@zoom_changed="update('zoom', $event)" 
@center_changed="update('reportedCenter', $event)"
:draggable="true"
:center="maplocation"
:zoom="15"
>
  <!-- <GmapMarker 
  :position = "reportedCenter" :clickable="true"  :draggable="true"
  @click="onMarkerClick"
  /> -->
  <gmap-info-window :position="reportedCenter" :opened="true" style="font color:black">
    <div style="color:black">test test</div>
  </gmap-info-window>
</GmapMap>


<!-- [footer] -->
<v-footer  app inset>
      <span class="white--text">&copy; 2018 footer</span>
</v-footer>

</v-container>
</v-content>
</div>
</template>
<script>
export default {
  data() {
    return {
      //-- input --
      inputaddress:'',
      countries:[
        {name:'Japan', region:'jp' } ,
        {name:'Thai' , region:'th' } 
      ],
      selected_country:{name:'Thai', region:'th'},
      //-- output --
      formatted_address:'', 
      maplocation:{lng: 100.52973, lat: 13.904549},
      //-update--
      reportedCenter: {lng: 100.52973, lat: 13.904549},
    };

  },
  methods:{
     update(field, event) {
      if (field === 'reportedCenter') {
        // N.B. It is dangerous to update this.center
        // Because the center reported by Google Maps is not exactly
        // the same as the center you pass it.
        // Instead we update this.center only when the input field is changed.
        this.reportedCenter = {
          lat: event.lat(),
          lng: event.lng(),
        };
        // If you wish to test the problem out for yourself, uncomment the following
        // and see how your browser begins to hang:
        // this.center = _.clone(this.reportedCenter)
      } else if (field === 'bounds') {
        this.mapBounds = event;
      } else {
        this.$set(this, field, event);
      }
    },
    onMarkerClick(){
      console.log('--click maerker')
    },
    async onGeocode(){
      console.log('--[methods]')
      let data = await this.$store.dispatch('getGeocode',{
        address:this.inputaddress, region:this.selected_country.region })
      this.maplocation = data.geometry.location;
      this.reportedCenter = data.geometry.location;
      this.formatted_address = data.formatted_address
      // console.log('--maplocation',this.maplocation)
      // this.$forceUpdate()
    }
  }
};
</script>

