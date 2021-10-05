const request = require('request');

const geocode = (address, callback) => {
    const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1Ijoib21lci1mcnEiLCJhIjoiY2t0ejh6ZmN0MnlzeTJ1bnFjc2xxbjJvaSJ9.Yk-xbPpWl1pG_HZmxLOvcA&limit=1';

    // request({url: geocodeURL, json: true}, (error, response) => {
    //     if(error) callback('Unable to connect to loaction service!', undefined);
    //     else if(response.body.features.length === 0) callback('Unable to find loaction. Try another search.', undefined);
    //     else {
    //         callback(undefined, {
    //             latitude: response.body.features[0].center[1],
    //             longitude: response.body.features[0].center[0],
    //             location: response.body.features[0].place_name
    //         })
    //     }
    // });

    // -------------------- Object destructuring and property shorthand methods for same above code --------------------
    request({url: geocodeURL, json: true}, (error, { body }) => {
        if(error) callback('Unable to connect to loaction service!', undefined);
        else if(body.features.length === 0) callback('Unable to find loaction. Try another search.', undefined);
        else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            });
        }
    });
}

module.exports = geocode;