const { ObjectID } = require("mongodb");
// const jwt = require("jsonwebtoken")
/** MongoDB and Models */
var { mongoose } = require('./../../db/mongoose');

const { Place } = require("./../../models/place")

const userOneId = new ObjectID();
const userTwoId = new ObjectID();

const places=[{
    // _id : new ObjectID() ,
    place_id : 'seed-001',
    place_name : 'Software Park',
    location:{ type:'Point', coordinates:[ 100.529730,13.904549,]}
},{
    _id : new ObjectID() ,
    place_id : 'seed-002',
    place_name : 'CentralPlaza Changwattana',
    location:{ type:'Point', coordinates:[100.527834,13.903676 ]}
}]
const place1 = new Place(places[0])


const  populatePlaces = async function()  {
    this.timeout(10000); // change timeout 10sec
    await Place.remove({});
    await Place.insertMany(places);
}


module.exports = {
    places,
    populatePlaces,
}
