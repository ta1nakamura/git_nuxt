require('../config/config.js')
const { ObjectID } = require("mongodb")
const { mongoose } = require("../db/mongoose");
const { Place } = require("../models/place");

const userOneId = new ObjectID();
const places=[{
    // _id : new ObjectID() ,
    place_id : '001',
    place_name : 'Software Park',
    location:{ type:'Point', coordinates:[ 100.529730,13.904549,]}
},{
    _id : new ObjectID() ,
    place_id : '002',
    place_name : 'CentralPlaza Changwattana',
    location:{ type:'Point', coordinates:[100.527834,13.903676 ]}
}]
// init
const  populatePlaces = async function()  {
    // this.timeout(10000); // change timeout 10sec
    await Place.remove({});
    await Place.insertMany(places);
}
// populatePlaces()

// Find
Place.find({})
.then(places=>{
    console.log(places);
})


//findOneUpdate
Place.findOneAndUpdate({
    place_id : '001',
}, {
    // $set: body
    $set:{place_name:'updated'}
    // place_name:'updated12345'
}, { new: true }).then((place) => {
    if (!place) {
        console.log('--not found')
        return 
    }
    console.log('--result',place)
}).catch((e) => {
    console.log(e)
})

