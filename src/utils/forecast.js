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
            callback(undefined, `${body.daily.data[0].summary} It is currently ${Math.floor((body.currently.temperature-32)*(5/9))}°C out.This high today is ${Math.floor((body.daily.data[0].temperatureHigh-32)*(5/9))}°C with a low of ${Math.floor((body.daily.data[0].temperatureLow-32)*(5/9))}°C.There is a ${body.currently.precipProbability} % chance of rain..Humidity is ${body.currently.humidity * 100} %rh`);
            // console.log(body.daily.data[0]);
            // callback(undefined,{
            //     forecastData :`${body.daily.data[0].summary} It is currently ${Math.floor((body.currently.temperature-32)*(5/9))} °C out. This high today is ${Math.floor((body.daily.data[0].temperatureHigh-32)*(5/9))} °C with a low of ${Math.floor((body.daily.data[0].temperatureLow))} °C. There is a ${body.currently.precipProbability} % chance of rain.`,
            // time : body.currently.time,
            //  time : `${Math.floor(new Date().getTime(body.currently.time)/1000.0)}`,
            // summary: `${body.currently.summary}`,
            // humidity:`${body.currently.humidity * 100} %rh`,
            // icon:`${body.currently.icon}`,
            // windSpeed:`${Math.floor(body.currently.windSpeed)} km/h`,   
            // })
            // console.log(forecastData);
        }
    });
}

module.exports = forecast;