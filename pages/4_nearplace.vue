<template>
<div>
<!-- [main contents] -->
<v-content>
<v-container fluid justify-center >
<h2>最寄りのポイントを表示</h2>

<!-- [input] -->
<v-layout row wrap 1>
    <v-flex xs3>
      <v-select v-model = "selected_country" :hint = "`${selected_country.name}, ${selected_country.region}`"
      :items = "countries" item-text = "name"  item-value = "region"
      label = "select country"  persistent-hint return-object single-line></v-select>
    </v-flex>
    <v-flex xs4>
      <v-text-field label="input address" v-model="inputaddress"></v-text-field>
    </v-flex>
</v-layout>
<v-btn @click="onGeocode" color="secondary">goMap</v-btn>
<v-btn @click="onNearSation(1)" color="secondary">最寄りポイント</v-btn>
<v-btn @click="onNearSation(40)" color="secondary">すべてのポイント</v-btn>


<!-- [output] -->
<v-flex xs12 md10>
  <!-- <p>input:{{inputaddress}} </p> -->
  <p> Address  : {{formatted_address}} </p>
  <p> Location : {{maplocation}}</p>
  <!-- [repotedCenter] -->
  <h3>Map information</h3> 
  Map center : {{reportedCenter}} 
  <!-- [googelmap] -->
  <GmapMap class="map-panel" map-type-id="terrain" 
    style="width: 100%; height: 300px"
    @zoom_changed="update('zoom', $event)" 
    @center_changed="update('reportedCenter', $event)"
    :draggable="true"
    :center="maplocation"
    :zoom="zoom"
    ref="mmm">
    <!-- <GmapMarker 
    :position = "reportedCenter" 
    :clickable="true"  
    :draggable="false"
    @click="onMarkerClick"
    /> -->
    <GmapMarker :key="item._id" v-for="item in this.stations"
      :position="{ lng:item.location.coordinates[0], lat:item.location.coordinates[1]}" 
      :clickable="true" :draggable="true"
  />
    <gmap-info-window :position="reportedCenter" :opened="true" :draggable="true" style="font color:black">
      <div style="color:black">Center of Map</div>
    </gmap-info-window>
  </GmapMap>
  <v-card>
    <h3>Result Place</h3>  
    <v-list-tile v-for="(item,i) in this.stations" :key="item._id">
      <v-list-tile-content>
        {{i}} : {{item.place_name}} : {{Math.round(item.distance).toString().replace( /(\d)(?=(\d\d\d)+(?!\d))/g, '$1,' )}} m
      </v-list-tile-content>
    </v-list-tile>
  </v-card>
</v-flex>
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
      //[ 139.701238, 35.658871 ] 渋谷駅　[long,lat]
      maplocation:{lng: 139.701238, lat: 35.658871},
      // maplocation:null,
      //-update--
      reportedCenter: {lng: 139.701238, lat: 35.658871},
      // reportedCenter: null,
      zoom:11,
      //--stations
      stations:[]
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
      console.log('--[methods] onGeocode')
      try{
        let data = await this.$store.dispatch('getGeocode',{
        address:this.inputaddress, region:this.selected_country.region })
        this.maplocation = data.geometry.location;
        this.reportedCenter = data.geometry.location;
        this.$refs.mmm.panTo(data.geometry.location);
        this.formatted_address = data.formatted_address
      }catch(e){
        console.log('--error',e)
      }
      
      // console.log('--maplocation',this.maplocation)
      // this.$forceUpdate()
      
    },
    async onNearSation(limit){
      console.log('--click onNearStation')
      const {places} = await this.$axios.$get('/api/places/near',{
        params:{
          limit : limit,
          lng   : this.reportedCenter.lng,
          lat   : this.reportedCenter.lat, 
        }
      });
      console.log(places)
      this.stations = places
    }
  }
};
</script>

