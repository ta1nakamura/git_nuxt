require('../config/config.js')
const { ObjectID } = require("mongodb")
const { mongoose } = require("../db/mongoose");
const { Todo } = require("../models/todo");

const userOneId = new ObjectID();

// careate todos[]
const todos = [{
    _id: new ObjectID(),
    text: 'First test tod',
    _creator: userOneId
}, {
    _id: new ObjectID(),
    text: 'Second test tod',
    completed: true,
    completedAt: 333,
    _creator: userOneId
}]
// remove all and Create todos[] and find
Todo.remove({}).then(() => {
    Todo.insertMany(todos).then(()=>{
        Todo.find({}).then((todos) => {
            console.log('Todos', todos);
        })
    })
});



// var id = '5b33733e5cb1cf3384ffd12f';

// if (!ObjectID.isValid(id)) {
//     console.log('Id not valid')
// }

// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log('Todos', todos);
// })

// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log('Todo', todo);
// })

// Todo.findById(id).then((todo) => {
//     if (!todo) {
//         return console.log('Id not found')
//     }
//     console.log('Todo', todo);
// }).catch((e) => console.log(e))
// //

// // ***** UER ****
// User.findById('5b3afe2d0f85b2804783ba85').then((user) => {
//     if (!user) {
//         return console.log('Unnable to find user')
//     }
//     console.log('User', user)
//     // console.log(JSON.stringify(user, undefined, 2));
// }, (e) => {
//     console.log(e);
// })
