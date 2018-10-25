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
          <v-flex xs4>
            <v-text-field v-model="inputaddress" 
                          label="input address"/>
          </v-flex>
        </v-layout>
        <v-btn color="secondary" @click="onGeocode">goMap</v-btn>

        <!-- [output] -->
        <v-flex xs12 md5>
          <!-- <p>input:{{inputaddress}} </p> -->
          <p> Address  : {{ formatted_address }} </p>
          <p> Location : {{ maplocation }}</p>
          <!-- [repotedCenter] -->
          <h3>Map information</h3> 
          Map center : {{ reportedCenter }} 
          <!-- [googelmap] -->
          <GmapMap ref="mmm" :draggable="true" 
                   :center="maplocation"
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
        <v-layout row wrap align-center justify-center class="text-xs-center" >
          <v-flex v-for="i in 12" :key="`1${i}`" xs1>
            <v-card dark color="glay">
              <v-card-text class="px-0">{{ i }}</v-card-text>
            </v-card>
          </v-flex>
        </v-layout>

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
      maplocation: { lng: 100.52973, lat: 13.904549 },
      //-update--
      reportedCenter: { lng: 100.52973, lat: 13.904549 },
      zoom: 15
    }
  },
  methods: {
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
    }
  }
}
</script>
