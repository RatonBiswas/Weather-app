const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');


const app = express();
const port = process.env.PORT || 3000;
// ** Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')

// **  Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// ** Setup static directory to serve static files
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {    // ! home page
        "title": "Weather App",
        "name": "Raton Biswas"
    });
});
app.get('/about', (req, res) => {  // ! about page
    res.render('about', {
        "title": "About me",
        "name": "Raton Biswas"
    })
})
app.get('/help', (req, res) => { // ! help page
    res.render('help', {
        "title": "Help",
        "name": "Raton Biswas",
        "message": "This is some helpful text"
    })
})
app.get('/weather', (req, res) => {  // ! weather page
    // let address = req.body.address;
    if (!req.query.address) {
        return res.send({
            error: "Please enter address."
        })
    }

    geocode(req.query.address, (error, {
        latitude,
        longitude,
        location,
        shortCode
    } = {}) => {
        if (error) {
            return res.send({
                error
            });
        }
        // console.log('Error',error);
        // console.log('Data',data);
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                });
            }
            // console.log(location);
            // console.log(forecastData);
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address,
                shortCode
                // time,
                // summary,
                // humidity,
                // icon,
                // windSpeed

            });
        })
    })
})


app.get('/products', (req, res) => {  // ! products page
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term.'
        })
    }
    //console.log(req.query.search);
    res.send({
        products: []
    })
})
app.get('/help/*', (req, res) => {  // ! error page
    res.render('404', {
        "title": "404",
        "name": "Raton Biswas",
        "errorMessage": "Help artical not found"
    })
})

app.get('*', (req, res) => {  // ! error page
    res.render('404', {
        "title": "404",
        "name": "Raton Biswas",
        "errorMessage": "Page not found"
    })
})


app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
})