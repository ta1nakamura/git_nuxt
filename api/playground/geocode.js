const googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyAI6Er3iebU-3jzbVnCbonURfKceqEGUEc',
    // key:''
    Promise: Promise
  });

  googleMapsClient.geocode({
    // address: '1600 Amphitheatre Parkway, Mountain View, CA'
    address: 'softwarepark , Thailand'
  })
  .asPromise()
  .then((response) => {
    console.log(response.json.results);
  })
  .catch((err) => {
    console.log(err);
  });