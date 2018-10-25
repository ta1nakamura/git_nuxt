import Vuex from "vuex"
const googleMapsClient = require("@google/maps").createClient({
  key: "AIzaSyAI6Er3iebU-3jzbVnCbonURfKceqEGUEc",
  Promise: Promise
})

const createStore = () => {
  return new Vuex.Store({
    state: {
      // place_name:null,
      // formatted_address:null,
      // location:null,
    },
    mutations: {},
    actions: {
      // nuxtServerInit(vuexContext, context) {},
      async getGeocode(vuexContext, inputdata) {
        // console.log('--[store]geocode')
        try {
          let res = await googleMapsClient
            .geocode({
              address: inputdata.address,
              region: inputdata.region
            })
            .asPromise()
          // console.log(res.json.results)

          let formatted_address = res.json.results[0].formatted_address
          let localtion = res.json.results[0].geometry.location
          console.log("--formatted_address", formatted_address)
          console.log("--localtion", localtion)

          //set status
          // vuexContext.state.localtion = res.json.results[0].geometry.location;
          // vuexContext.state.formatted_address = res.json.results[0].formatted_address;

          return res.json.results[0]
        } catch (e) {
          console.log(e)
        }
      }
    },
    getters: {}
  })
}
export default createStore
