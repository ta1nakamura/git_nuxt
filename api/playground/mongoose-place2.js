require('../config/config.js')
const { ObjectID } = require("mongodb")
const { mongoose } = require("../db/mongoose");
const { Place } = require("../models/place");

const userOneId = new ObjectID();

var place = new Place({
    place_name   : 'test new place',
});
funcplace = async()=>{
    try{
    const doc = await place.save();
    console.log('--success',doc);
    }catch(e){console.log('--erro',e)}
    // Find
    Place.find({})
    .then(places=>{
        console.log(places);
    })
}
// execute
funcplace();

