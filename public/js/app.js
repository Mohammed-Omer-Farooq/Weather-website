// console.log('This is client side javascript code!');

const weatherForm = document.querySelector('form');
const searchInputField = document.querySelector('input');
var paraOne = document.querySelector('#message-1');
var paraTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = searchInputField.value;

    paraOne.style.color = 'black';
    paraOne.textContent = 'Loading...';
    paraTwo.textContent = '';

    fetch('http://localhost:3000/weatherUpdate?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                paraOne.style.color = 'red';
                paraOne.textContent = data.error;
                document.querySelector('input').value = '';
            } else {
                paraOne.style.color = 'black';
                paraOne.textContent = data.location;
                paraTwo.textContent = data.forecastData;
                document.querySelector('input').value = '';
            }
        });
    });
});






























// geocode('Raichur');

// function geocode(address) {
//     fetch('https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1Ijoib21lci1mcnEiLCJhIjoiY2t0ejh6ZmN0MnlzeTJ1bnFjc2xxbjJvaSJ9.Yk-xbPpWl1pG_HZmxLOvcA&limit=1').then((response) => {
//         response.json().then((data) => {
//             if(data.features.length === 0) {
//                 return console.log('Unable to find loaction. Try another search!');
//             }

//             const latitude = data.features[0].center[1];
//             const longitude = data.features[0].center[0];
//             const location = data.features[0].place_name
//             console.log('Latitude:', latitude);
//             console.log('Longitude:', longitude);
//             console.log('Loaction:', location);

//             fetch('http://api.weatherstack.com/current?access_key=76723546f8e56bd1a95df72d67850ec1&query='+ latitude +','+ longitude).then((response) => {
//                 response.json().then((data) => {
//                     console.log(' its ' + data.current.weather_descriptions[0] +'. It is currently '+data.current.temperature+' degrees out. It feels like '+data.current.feelslike+' degrees out. There is '+data.current.precip+'% chance of rain.');
//                 });
//             });
//         });
//     });
// } 