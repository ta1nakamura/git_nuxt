const pkg = require("./package")
const bodyParser = require("body-parser")
const nodeExternals = require("webpack-node-externals")
/**
 * Load Env from .envfile
 */
// require("dotenv").config();

//setBaseURL for Axios
var env = process.env.NODE_ENV || "development"
let API_URL
if (env === "development" || env === "test") {
  API_URL = "http://localhost:3000"
} else {
  API_URL = process.env.API_URL
}
module.exports = {
  mode: "universal",
  /**
   * add for API
   */
  serverMiddleware: [bodyParser.json(), "~/api"],

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: pkg.description }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons"
      }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: "#FFFFFF" },

  /*
  ** Global CSS
  */
  css: ["vuetify/src/stylus/main.styl"],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    "@/plugins/vuetify",
    { src: "~plugins/vue2-google-maps.js", ssr: true }
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    "@nuxtjs/axios"
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    baseURL: API_URL
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config) {
      if (process.server) {
        config.externals = [
          nodeExternals({
            whitelist: [/^vuetify/]
          })
        ]
      }
    },
    transpile: [/^vue2-google-maps($|\/)/]
  }
}
