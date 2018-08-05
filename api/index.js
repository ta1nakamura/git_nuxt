const express = require("express");
// const aws = require('aws-sdk');
require('./config/config.js') //config for mongodb,
const _ = require("lodash")
/** MongoDB and Models */
const { ObjectID } = require("mongodb")
var { mongoose } = require('./db/mongoose');
const { Place } = require("./models/place")

const router = express.Router();
const app = express()


// [url is for get req.query]
//  https://github.com/nuxt/nuxt.js/issues/1909
const url = require('url')
router.use((req, res, next) => {
  Object.setPrototypeOf(req, app.request)
  Object.setPrototypeOf(res, app.response)
  req.res = res
  res.req = req
  //add
  req.query = url.parse(req.url, true).query
  next()
});

//[Get /places]
router.get('/places',(req,res)=>{
  Place.find({
  }).then(places =>{
    res.send({places});
  }).catch(e=> res.status(400).send(e))
});
//[Get /places/:id]
router.get('/places/:id',  (req, res) => {
  var id = req.params.id;
  if (!ObjectID.isValid(id)) {
      return res.status(400).send();
  }
  Place.findOne({
      _id: id,
      // _creator: req.user._id
  }).then((place) => {
      if (!place) {
          return res.status(404).send();
      }
      return res.status(200).send({ place });
  }).catch((e) => {
      return res.status(400).send();
  })
});

//[Path /places/:id]
router.patch('/places/:id',  (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['location', 'place_name']);
  if (!ObjectID.isValid(id)) {
      return res.status(404).send();
  }
  // Todo.findByIdAndUpdate(id, { $set: body }, { new: true }).then((todo) => {
  console.log('--body',body)  
  Place.findOneAndUpdate({
      _id: id,
      // _creator: req.user.id
  }, {
      $set: body
      // body
  }, { new: true }).then((place) => {
      if (!place) {
          return res.status(404).send();
      }
      console.log('--result',place)
      res.send({ place });
  }).catch((e) => {
      res.status(400).send();
  })
})
//[Post /places]
router.post('/places',async(req,res)=>{
    var place = new Place({
        place_name   : req.body.place_name,
    });
    try{
      const doc = await place.save();
      res.send(doc);
    }catch(e){
      res.status(400).send(e);
    }
});
//[Delete /places/:id]
router.delete('/places/:id', async(req, res) => {
    const id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    try {
        const place = await Place.findOneAndRemove({
            _id: id,
            // _creator: req.user._id
        })
        if (!place) {
            return res.status(404).send();
        }
        return res.status(200).send({ place });
    }
    catch (e) {
        res.status(400).send();
    }
});

//====================================================
/**
 * GET TEST
 */
router.get("/test/:id", (req, res) => {
  console.log("--test get");
  console.log("--id " ,req.params.id)
  res.status(200).json({message:`test_id = ${req.params.id}`});
});

module.exports = {
  path: '/api',
  handler: router
}