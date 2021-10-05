const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();


// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');


// Setup handlebars enigne and views loaction
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);


// Setup static directory to serve 
app.use(express.static(publicDirectoryPath));


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Mohammed Omer Farooq'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Andalusia - Masjid-e-cordoba',
        name: 'Al-jazari'
    })
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Helping page for needy',
        name: 'Mohammed Omer Farooq'
    })
});

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'Please provide an address'
        });
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if(error) {
            return res.send({
                // error: error --> or below line is also as per object shorthand method
                error
            });
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({ error });
            }
            res.render('weather', {
                title: 'Weather forecast',
                name: 'Mohammed Omer Farooq',
                forecastData: forecastData,
                location
            });
        });
    });    
});

app.get('/weatherUpdate', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'Please provide an location in query string.'
        });
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if(error) {
            return res.send({
                // error: error --> or below line is also as per object shorthand method
                error
            });
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({ error });
            }

            res.send({
                location,
                forecastData,
            })
        });
    }); 
});

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide an search term'
        });
    }

    console.log(req.query.search);
    res.send({
        products: []
    });
});


// ----------------------------------- Error messages page for showing 404 page -----------------------------------

app.get('/help/*', (req, res) => {
    res.render('pageNotFound', {
        title: '404',
        name: 'Mohammed Omer Farooq',
        errorMsg: 'Help article not found.'
    });
});

app.get('*', (req, res) => { 
    res.render('pageNotFound', {
        title: '404',
        name: 'Mohammed Omer Farooq',
        errorMsg: 'Page not found.'
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});