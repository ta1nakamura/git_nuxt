require('../config/config.js')
const { ObjectID } = require("mongodb")
const { mongoose } = require("../db/mongoose");
const {Car} = require('./CarModel')

const newCar = new Car({
    car_id: "1234556", 
    location: { 
        type: "Point", 
        coordinates: [91.361006, 24.752726]
    }
  });
  
//   newCar.save().then(car=>{
//     // do something
//   }).catch(err=>{
//     // debug
//   })

/**
 * Query
 */
Car.find({
    location: {$near: {$geometry: {
        type: "Point", coordinates: [90, 24]
    }, $maxDistance: 300}}} 
).then(car =>{
    console.log(car)
}).catch(e=>{
    console.log(e);
});