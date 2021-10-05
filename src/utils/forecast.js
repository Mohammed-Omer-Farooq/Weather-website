const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=76723546f8e56bd1a95df72d67850ec1&query='+ latitude +','+ longitude;

    // request({url: url, json:true}, (error, response) => {
    //     if(error) callback('Unable to connect to weather service!', undefined);
    //     else if(response.body.error) callback('Unable to find loaction', undefined);
    //     else {
    //         callback(undefined, 'In '+ chalk.green.inverse.italic(response.body.location.name) + ' its ' + chalk.yellow.inverse(response.body.current.weather_descriptions[0]) +'. It is currently '+chalk.red.inverse(response.body.current.temperature)+' degrees out. It feels like '+chalk.red.inverse(response.body.current.feelslike)+' degrees out. There is '+chalk.cyan.inverse(response.body.current.precip)+'% chance of rain.');
    //     }
    // });

    // -------------------- Object destructuring and property shorthand methods for same above code --------------------
    request({url, json:true}, (error, { body }) => {
        if(error) callback('Unable to connect to weather service!', undefined);
        else if(body.error) callback('Unable to find loaction', undefined);
        else {
            callback(undefined, 'Its ' + body.current.weather_descriptions[0] +'. It is currently '+body.current.temperature+' degrees out. It feels like '+body.current.feelslike+' degrees out. There is '+body.current.precip+'% chance of rain.');
        }
    });
}

module.exports = forecast;