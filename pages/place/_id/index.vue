<template>
  <div>

    <!-- [main contents] -->
    <v-content>
      <v-container fluid justify-center >
        <h2>Place Read/Write Sample</h2>

        <!-- [input] -->
        <v-layout row wrap 1>
          <v-flex xs3>
            <v-select 
              v-model = "selected_country"
              :hint = "`${selected_country.name}, ${selected_country.region}`"
              :items = "countries"
              label = "select country"
              item-text = "name"
              item-value = "region"
              persistent-hint
              return-object
              single-line
            />
          </v-flex>
          <v-flex xs9 sm6 md3>
            <v-text-field v-model="inputaddress" 
                          label="input address"/>
          </v-flex>
        </v-layout>

        <v-btn color="secondary" @click="onGeocode">goAddress</v-btn>
        <v-btn flat icon color="secondary" @click="onClickCurrent">
          <v-icon>gps_fixed</v-icon>
        </v-btn>
        <v-btn color="indigo" @click="onSave">save</v-btn>

        <!-- [output] -->
        <v-flex xs12 md5>
          <!-- <p>input:{{inputaddress}} </p> -->
          <p> Address  : {{ formatted_address }} </p>
          <p> Location : {{ maplocation }}</p>
          <!-- [repotedCenter] -->
          <h3>Map information</h3> 
          Map center : {{ reportedCenter }} 
          <!-- [googelmap] -->
          <GmapMap :draggable="true" :center="maplocation" 
                   ref="mmm"
                   :zoom="zoom" 
                   class="map-panel"
                   map-type-id="terrain"
                   style="width: 100%; height: 300px"
                   @zoom_changed="update('zoom', $event)"
                   @center_changed="update('reportedCenter', $event)">
            <GmapMarker 
              :position = "reportedCenter" 
              :clickable="true"  
              :draggable="false"
              @click="onMarkerClick"
            />
            <!-- <gmap-info-window 
    :position="reportedCenter" 
    :opened="true" 
    :draggable="true"
    style="font color:black">
      <div style="color:black">test test</div>
    </gmap-info-window> -->

          </GmapMap>
        </v-flex>
        <!-- [sample xs12] -->
        <!-- <v-layout row wrap align-center  justify-center class="text-xs-center" >
        <v-flex v-for="i in 12" :key="`1${i}`" xs1>
            <v-card dark color="glay">
            <v-card-text class="px-0">{{i}}</v-card-text>
            </v-card>
        </v-flex>
    </v-layout> -->

        <!-- [footer] -->
        <v-footer app inset>
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
      inputaddress: "",
      countries: [
        { name: "Japan", region: "jp" },
        { name: "Thai", region: "th" }
      ],
      selected_country: { name: "Thai", region: "th" },
      //-- output --
      formatted_address: "",
      // maplocation:{lng: 100.52973, lat: 13.904549},
      maplocation: null,
      //-update--
      reportedCenter: null,
      zoom: 15
    }
  },
  asyncData(context) {
    console.log(context.params)
    return context.app.$axios
      .$get("/api/places/" + context.params.id)
      .then(data => {
        console.log(data)
        return {
          maplocation: {
            lng: data.place.location.coordinates[0],
            lat: data.place.location.coordinates[1]
          },
          reportedCenter: {
            lng: data.place.location.coordinates[0],
            lat: data.place.location.coordinates[1]
          },
          inputaddress: data.place.place_name
          // editplace:data.place
        }
      })
  },
  methods: {
    onSave({ params }) {
      console.log("--onSave", this.$route)
      return this.$axios
        .patch(`/api/places/${this.$route.params.id}`, {
          place_name: this.inputaddress,
          location: {
            coordinates: [this.reportedCenter.lng, this.reportedCenter.lat]
          }
        })
        .then(data => {
          console.log("--success--")
          this.$router.push("/place")
        })
        .catch(e => {
          console.log("--error--", e)
          // this.$router.push('/shopadmin')
        })
    },
    update(field, event) {
      if (field === "reportedCenter") {
        // N.B. It is dangerous to update this.center
        // Because the center reported by Google Maps is not exactly
        // the same as the center you pass it.
        // Instead we update this.center only when the input field is changed.
        this.reportedCenter = {
          lat: event.lat(),
          lng: event.lng()
        }
        // If you wish to test the problem out for yourself, uncomment the following
        // and see how your browser begins to hang:
        // this.center = _.clone(this.reportedCenter)
      } else if (field === "bounds") {
        this.mapBounds = event
      } else {
        this.$set(this, field, event)
      }
    },
    onMarkerClick() {
      console.log("--click maerker")
    },
    async onGeocode() {
      console.log("--[methods] onGeocode")
      try {
        let data = await this.$store.dispatch("getGeocode", {
          address: this.inputaddress,
          region: this.selected_country.region
        })
        this.maplocation = data.geometry.location
        this.reportedCenter = data.geometry.location
        this.$refs.mmm.panTo(data.geometry.location)
        this.formatted_address = data.formatted_address
      } catch (e) {
        console.log("--error", e)
      }

      // console.log('--maplocation',this.maplocation)
      // this.$forceUpdate()
    },
    async onClickCurrent() {
      console.log("--onClickCurrent")
      try {
        let data = await getPosition()
        console.log("--success", data)
        console.log("typeof", typeof data)

        let data2 = {}
        data2.lat = data.coords.latitude
        data2.lng = data.coords.longitude
        data2.alt = data.coords.altitude
        data2.accLatlng = data.coords.accuracy
        data2.accAlt = data.coords.altitudeAccuracy
        data2.heading = data.coords.heading //0=北,90=東,180=南,270=西
        data2.speed = data.coords.speed

        // Object.assign(data2,data.coords); // not work
        // this.$set(this.currentLoc,"data2",data.coords);//not work
        console.log("data2", data2)
        // this.$set(this.currentLoc,"coords",data2);

        //set Googlemap
        this.maplocation.lat = data2.lat
        this.maplocation.lng = data2.lng
        this.reportedCenter.lat = data2.lat
        this.reportedCenter.lng = data2.lng
        this.$refs.mmm.panTo(this.maplocation)
      } catch (e) {
        console.log("--error", e)
      }
    }
  }
}
var getPosition = function(options) {
  return new Promise(function(resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject, options)
  })
}
</script>
