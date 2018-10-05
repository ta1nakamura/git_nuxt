<template>
<v-content>
<v-container fluid  >
<v-layout row wrap justify-center >
<v-flex xs12 sm9 md6>
    <h1>Place Admin</h1>
    <!-- [add place] -->
    <v-list>
          <v-subheader>Add new Shop</v-subheader>
          <v-list-tile >
          <v-text-field v-model="newPlaceName" label="new place_name"></v-text-field>
          <v-btn fab dark color="red" @click="createPlace">
            <v-icon dark>add</v-icon>
          </v-btn>
          </v-list-tile>
        </v-list>
    <!-- [list place]-->
    <v-list three-line>
        <v-subheader>Place List</v-subheader>
        <template v-for="(place, index) in items" >
            <v-list-tile :key="place.name" avatar  >
            <!-- [avater] -->
            <v-list-tile-avatar @click="$router.push( '/place/'+place._id)">
            </v-list-tile-avatar>
            <!-- [contents] -->
            <v-list-tile-content @click="$router.push( '/place/'+place._id)">
                <v-list-tile-title v-html="place.place_name"></v-list-tile-title>
                <v-list-tile-sub-title>{{place.location}}</v-list-tile-sub-title>
                <!-- <v-list-tile-sub-title>lastupdate :{{place.lastupdate | date}}</v-list-tile-sub-title> --> -->
            </v-list-tile-content>
            <v-icon  large alt="delete"
                @click="onDeletePlace(place)"  >delete_forever</v-icon>
            </v-list-tile>    
            <!-- divider -->
            <v-divider :key="index"></v-divider>
        </template>
    </v-list >
</v-flex>
</v-layout>
<!-- [footer] -->
<v-footer  app inset>
      <span class="white--text">&copy; 2018 footer</span>
</v-footer>
<!-- [sample xs12] -->
<!-- <v-layout row wrap align-center  justify-center class="text-xs-center" >
        <v-flex v-for="i in 12" :key="`1${i}`" xs1>
            <v-card dark color="glay">
            <v-card-text class="px-0">{{i}}</v-card-text>
            </v-card>
        </v-flex>
</v-layout> -->
</v-container>
</v-content>
</template>

<script>
export default {
    data(){
        return {
            newPlaceName:null,
        }
    },
    asyncData(context){
        return context.app.$axios.$get('/api/places')
        .then(data =>{
        // console.log(data);
        return { items:data.places }
        }).catch(e => context.error(e));
    },
    methods:{
        async createPlace(){
            if (this.newPlaceName == null) return
            console.log('--createPlace:', this.newPlaceName)
            try{
                const res = await this.$axios.post('/api/places',{
                place_name : this.newPlaceName,
                });
                this.newPlaceName = null
                console.log('--success createPlace--')
                // reload ShopList
                let res2 =  await this.$axios.$get('/api/places')
                this.items = res2.places;
                return 
            }catch(e){
                console.log(e);
            } 
        },
        async onDeletePlace(place){
            console.log('--onDeleteShop')
            try{
                const res = await this.$axios.delete('/api/places/'+place._id)
                console.log('--success delete Shop--')
                // reload ShopList
                let res2 =  await this.$axios.$get('/api/places')
                this.items = res2.places;
            }catch(e){
                console.log(e)
            }
        },
    }
}
</script>

<style>

</style>
