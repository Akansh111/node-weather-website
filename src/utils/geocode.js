const request = require('request');

const geoCode = (address, callback) => {
    const url = `http://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiYWthbnNoMTExMSIsImEiOiJjazlqbWJ3MjUxbHFvM2Rud3A2a3B0eXM0In0._2i7FCxx_plFySEgHDKCuQ&limit=1`;

    request({ url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location service');
        } else if (body.features.length === 0) {
            callback('Unable to find the coordinates, Try another search');
        }
        else {
            const lat = body.features[0].center[1];
            const long = body.features[0].center[0];
            console.log(lat, long);
            callback(undefined, { lat, long} );
        }
    })
}

module.exports = geoCode;