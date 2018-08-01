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

const carSchema = new Schema({
 car_id : {
   type : String,
   required : [true, 'Car id is required']
 },
 car_name : {
   type : String
 },
 location : {
   type: geoSchema,
   index: '2dsphere'
 }
},{timestamp : true});

const Car = mongoose.model('Car', carSchema);

// export default Car;
module.exports = {Car}