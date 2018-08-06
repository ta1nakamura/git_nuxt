const expect = require("expect");
const request = require("supertest");
const { ObjectID } = require("mongodb");

const { path,app } = require("./../apptest");
const { Place } = require("./../models/place")
// const { User } = require("./../models/user");
const { todos, populateTodos, places, populatePlaces } = require("./seed/seed");

// beforeEach(populateUsers);
beforeEach(populatePlaces);
// beforeEach(populateTodos);


describe('Get Test /test/:id', function(){
    this.timeout(10000);
    it('should work [it]', function(done) {
        done();
    })
    it('should get id',function(done){
        request(app)
            .get(path+'/test/3')
            .expect(200)
            .expect((res)=>{
                console.log(res.body)
                expect(res.body.message).toBeTruthy(); //exsist
                // expect(res.body.email).toBe(3);
            })
            .end(done);
    })
});
// describe('POST /users', () => {
//     it('should create a user', (done) => {
//         var email = 'esample@example.com';
//         var password = '123nmb!';

//         request(app)
//             .post(path + '/users')
//             .send({ email, password })
//             .expect(200)
//             .expect((res) => {
//                 // expect(res.headers['x-auth']).toExist();
//                 expect(res.headers['x-auth']).toBeTruthy();
//                 // expect(res.body._id).toExist();
//                 expect(res.body._id).toBeTruthy();
//                 expect(res.body.email).toBe(email);
//             })
//             .end((err) => {
//                 if (err) {
//                     return done(err);
//                 }

//                 User.findOne({ email }).then((user) => {
//                     // expect(user).toExist();
//                     expect(user).toBeTruthy();
//                     // expect(user.password).toNotBe(password);
//                     expect(user.password).not.toBe(password);
//                     done();
//                 }).catch((e) => done(e));;

//             });
//     })

//     it('should return validateion error if request invalid', (done) => {
//         request(app)
//             .post(path + '/users')
//             .send({
//                 email: 'and',
//                 password: '123'
//             })
//             .expect(400)
//             .end(done);
//     })
