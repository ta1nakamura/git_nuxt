# gis_nuxt

> gis sample for nuxt , express, mongodb

#デモ、解説
- demo
  - https://gis-nuxt-sample.herokuapp.com/
- [Qiita]nuxt.js & vue2-google-maps
  - https://qiita.com/ta1nakamura/items/e1f9e6ca6f203ce69547

#ref

- Working with Geospatial support in MongoDB with NodeJS
   - https://osmangoni.info/posts/nodejs-mongodb-geolocation/

- module: [npm] vue2-google-maps
   - next2 対応サンプル
     - https://codesandbox.io/s/31j9l75xjm
   - https://www.npmjs.com/package/vue2-google-maps
   - https://github.com/xkjyeah/vue-google-maps
   - https://www.youtube.com/watch?v=2QboO0zuZ2Q 

- [official] Node.js  client library for Google Maps API Web Services
   - https://github.com/googlemaps/google-maps-services-js
   - https://qiita.com/chuck0523/items/bed2ec8cbc4fe2067364

# ESLint
  - nuxtプロジェクトにESLint導入
    - https://qiita.com/ta1nakamura/items/a7fa31f9cc7f34d20895


# Nuxt upgrade 1.4 -> 2.2 
## upgrade
> \>yarn upgrade-interactive --latest

## add core-js package

> \>yarn add core-js

## fix code (nuxtconfg.js)

```
変更が必要なコード
 isClient -> process.browser
 isServer -> process.server
```

nuxt2 サンプルを参考に
  - https://codesandbox.io/s/31j9l75xjm

nuxt.config.js
```javascript

  plugins: [{ src: "~/plugins/google-maps", ssr: true }],
  build: {
    transpile: [/^vue2-google-maps($|\/)/]
  }

```