// CarModel.js

// import mongoose from 'mongoose';
var mongoose = require('mongoose')
const Schema = mongoose.Schema;
const geoSchema = new Schema({
 type: {
   type: String,
   default: 'Point'
 },
 coordinates: {
   type: [Number]
 }
});

const placeSchema = new Schema({
 place_id : {
   type : String,
   required : [true, 'Place id is required']
 },
 place_name : {
   type : String
 },
 location : {
   type: geoSchema,
   index: '2dsphere'
 }
},{timestamp : true});

const Car = mongoose.model('Place', placeSchema);

// export default Car;
module.exports = {Car}