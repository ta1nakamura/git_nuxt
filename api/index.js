const express = require("express");
// const aws = require('aws-sdk');
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
})

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