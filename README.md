# gis_nuxt

> gis sample for nuxt , express, mongodb

#demo
- https://gis-nuxt-sample.herokuapp.com/

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

## compile

> \> yarn run dev
error

```javascript
 ERROR  Failed to compile with 7 errors                                                                                                               15:33:45
These dependencies were not found:

* core-js/modules/es6.regexp.to-string in ./.nuxt/client.js, ./.nuxt/utils.js
* core-js/modules/es7.promise.finally in ./.nuxt/client.js
* core-js/modules/es7.symbol.async-iterator in ./.nuxt/client.js, ./.nuxt/middleware.js and 2 others

To install them, you can run: npm install --save core-js/modules/es6.regexp.to-string core-js/modules/es7.promise.finally core-js/modules/es7.symbol.async-iterator
```
add pakkege

```bash
> yarn add core-js
```

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