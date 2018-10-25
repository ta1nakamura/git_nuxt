const expect = require("expect")
const request = require("supertest")
const { ObjectID } = require("mongodb")

const { path, app } = require("./../apptest")
const { Place } = require("./../models/place")
const { places, populatePlaces } = require("./seed/seed")

beforeEach(populatePlaces)

describe("[Get places]", () => {
  it("get all places", async () => {
    let res = await request(app)
      .get(path + "/places/")
      .expect(200)
    expect(res.body.places.length).toBe(places.length)
  })
  it("get place by id", async () => {
    let res = await request(app)
      .get(path + "/places/" + places[1]._id.toHexString())
      .expect(200)
    // console.log(res.body.place)
    expect(res.body.place._id).toBe(places[1]._id.toHexString())
  })
  it("get place near", async () => {
    let res = await request(app).get(
      path + "/places/near/" + "?limit=3&lng=139.701238&lat=35.658871"
    )
    expect(res.body.places.length).toBe(3)
  })
})

describe("Get Test /test/:id", function() {
  this.timeout(10000)
  it("should work [it]", function(done) {
    done()
  })
  it("should get id", function(done) {
    request(app)
      .get(path + "/test/3")
      .expect(200)
      .expect(res => {
        // console.log(res.body)
        expect(res.body.message).toBeTruthy() //exsist
        // expect(res.body.email).toBe(3);
      })
      .end(done)
  })
})
