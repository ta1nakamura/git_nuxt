const { ObjectID } = require("mongodb");
// const jwt = require("jsonwebtoken")
/** MongoDB and Models */
var { mongoose } = require('./../../db/mongoose');

const { Todo } = require("./../../models/todo")
const { Place } = require("./../../models/place")

const userOneId = new ObjectID();
const userTwoId = new ObjectID();

const todos = [{
    _id: new ObjectID(),
    text: 'First test tod',
    _creator: userOneId
}, {
    _id: new ObjectID(),
    text: 'Second test tod',
    completed: true,
    completedAt: 333,
    _creator: userTwoId
}]

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
const place1 = new Place(places[0])

const populateTodos = function(done){
    console.log('--populateTodo')
    this.timeout(10000); // change timeout 10sec
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done());
}
const  populatePlaces = async function()  {
    this.timeout(10000); // change timeout 10sec
    await Place.remove({});
    await Place.insertMany(places);
}


module.exports = {
    todos,
    populateTodos,
    places,
    populatePlaces,
    // users,
    // populateUsers
}
