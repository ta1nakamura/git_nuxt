require("../config/config.js")
const { mongoose } = require("../db/mongoose")
const { Place } = require("../models/place")

//サンプルデータ定義
// http://gihyo.jp/dev/serial/01/mongodb/0009
const places = [
  {
    place_id: "1",
    place_name: "五反田",
    location: { type: "Point", coordinates: [139.723822, 35.625974] }
  },
  {
    place_id: "2",
    place_name: "恵比寿",
    location: { type: "Point", coordinates: [139.71007, 35.646685] }
  },
  {
    place_id: "3",
    place_name: "新宿",
    location: { type: "Point", coordinates: [139.700464, 35.689729] }
  },
  {
    place_id: "4",
    place_name: "新大久保",
    location: { type: "Point", coordinates: [139.700261, 35.700875] }
  },
  {
    place_id: "5",
    place_name: "池袋",
    location: { type: "Point", coordinates: [139.711086, 35.730256] }
  },
  {
    place_id: "6",
    place_name: "上野",
    location: { type: "Point", coordinates: [139.777043, 35.71379] }
  },
  {
    place_id: "7",
    place_name: "品川",
    location: { type: "Point", coordinates: [139.738999, 35.62876] }
  }
]
// テーブル初期化
async function populatePlaces() {
  await Place.deleteMany({})
  await Place.insertMany(places)
}

// FindAll
async function findAll() {
  console.log("--start--", findAll.name)
  const places = await Place.find({})
  console.log("find.length:", places.length)
  const names = places.map(v => v.place_name)
  console.log(names)
}
//getWihin
async function getWihin(distance) {
  console.log("---start--", getWihin.name)
  const places = await Place.find({
    "location.coordinates": {
      $geoWithin: {
        $centerSphere: [[139.701238, 35.658871], distance]
      }
    }
  })
  console.log(places.map(v => v.place_name))
}
//Near
//今回は渋谷駅[ 139.701238, 35.658871 ]から近い順に
async function near(min, max) {
  console.log("---start--", near.name)
  const results = await Place.find({
    location: {
      $nearSphere: {
        $geometry: {
          type: "Point",
          coordinates: [139.701238, 35.658871]
        },
        $minDistance: min,
        $maxDistance: max
      }
    }
  })
  console.log(results.map(v => v.place_name))
}

//GeoNear(aggregate) 距離を含む情報
//https://mongoosejs.com/docs/api.html#aggregate_Aggregate-near
async function geonear(limit, coordinates) {
  console.log("---start--", geonear.name)
  const results = await Place.aggregate()
    .near({
      // near: { type : "Point", coordinates: [139.701238, 35.658871] },  //渋谷駅
      near: { type: "Point", coordinates }, //渋谷駅
      spherical: true,
      distanceField: "distance" //メートル
    })
    .limit(limit)
  console.log(results)
}
//============================
async function main() {
  console.log("*** start ***")
  await populatePlaces()
  //--すべてのデータ取得
  // await findAll()
  //--範囲取得
  // await getWihin(0.0005)
  // for (let maxd = 0; maxd <= 5000; maxd +=500) {
  //   console.log('maxd:',maxd)
  //   await near(0,maxd)
  // }
  // await near(0,4000)
  //--距離が必要な場合(aggregate)
  await geonear(3, [139.701238, 35.658871]) //渋谷駅　[long,lat]
  console.log("*** End ***")
}
main()
