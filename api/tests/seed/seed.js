const { ObjectID } = require("mongodb")
// const jwt = require("jsonwebtoken")
/** MongoDB and Models */
require("./../../db/mongoose")

const { Place } = require("./../../models/place")

const placeOneId = new ObjectID()
const placeTwoId = new ObjectID()

// const places=[{
//     // _id : new ObjectID() ,
//     place_id : 'seed-001',
//     place_name : 'Software Park',
//     location:{ type:'Point', coordinates:[ 100.529730,13.904549,]}
// },{
//     _id : new ObjectID() ,
//     place_id : 'seed-002',
//     place_name : 'CentralPlaza Changwattana',
//     location:{ type:'Point', coordinates:[100.527834,13.903676 ]}
// }]
// const place1 = new Place(places[0])
const places = [
  {
    _id: placeOneId,
    place_id: "seed-1",
    place_name: "五反田",
    location: { type: "Point", coordinates: [139.723822, 35.625974] }
  },
  {
    _id: placeTwoId,
    place_id: "seed-2",
    place_name: "恵比寿",
    location: { type: "Point", coordinates: [139.71007, 35.646685] }
  },
  {
    place_id: "seed-3",
    place_name: "新宿",
    location: { type: "Point", coordinates: [139.700464, 35.689729] }
  },
  {
    place_id: "seed-4",
    place_name: "新大久保",
    location: { type: "Point", coordinates: [139.700261, 35.700875] }
  },
  {
    place_id: "seed-5",
    place_name: "池袋",
    location: { type: "Point", coordinates: [139.711086, 35.730256] }
  },
  {
    place_id: "seed-6",
    place_name: "上野",
    location: { type: "Point", coordinates: [139.777043, 35.71379] }
  },
  {
    place_id: "seed-7",
    place_name: "品川",
    location: { type: "Point", coordinates: [139.738999, 35.62876] }
  }
]

const populatePlaces = async function() {
  this.timeout(10000) // change timeout 10sec
  await Place.remove({})
  await Place.insertMany(places)
}

module.exports = {
  places,
  populatePlaces
}
