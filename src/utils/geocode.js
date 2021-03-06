const request = require('request');

const geocode = (addresss, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + addresss + '.json?access_token=pk.eyJ1IjoicmF0b25iaXN3YXMiLCJhIjoiY2tibDN6NHdvMTVqYzJ3cW5qcGtyaGZkbiJ9.ZpjwxEts3VFwkjh3NTAqxA'
    request({
         url,
        json: true
    }, (error, {body}) => {
        if(error){
            callback('Unable to connect to location services!',undefined);
        }else if(body.features.length===0){
            callback('Unable to find location.Try another search!',undefined);
        }else{
            callback(undefined,{
                latitude:body.features[0].center[1],
                longitude:body.features[0].center[0],
                location:body.features[0].place_name,
                shortCode: body.features[0].context[body.features[0].context.length - 1].short_code
            })
        }
    });
}

module.exports = geocode; 