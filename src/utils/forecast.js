const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/35e034ff5c54760416633a2bb01f5292/' + latitude + ',' + longitude + '';
    request({
        url,
        json: true
    }, (error, {
        body
    }) => {
        if (error) {
            callback('Unable to connect to weather services!', undefined);
        } else if (body.error) {
            callback('Unable to find location.Try another search.', undefined);
        } else {
            callback(undefined, body.daily.data[0].summary + 'It is currently ' + body.currently.temperature + ' degrees out.The high today is ' + body.daily.data[0].temperatureHigh + ' With a low of ' +body.daily.data[0].temperatureLow + '.There is a ' + body.currently.precipProbability + '% chance of rain!');
            // console.log(body.daily.data[0]);
        }
    });
}

module.exports = forecast;