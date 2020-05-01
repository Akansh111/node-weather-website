const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geoCode = require('./utils/geocode');
const forcast = require('./utils/forecast');

const app = express();

// define path for Express config
const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// set up handlebars engine
app.set('view engine', 'hbs');
// set the views path
app.set('views', viewsPath);
// set the handlebas path
hbs.registerPartials(partialsPath);

//static directory to serve
app.use(express.static(publicPath));

app.get('', (req, res) => {
    // allows to render view
    // first args --> name of view
    // second args --> object contains values that view will access
    res.render('index', {
        title: 'Weather App',
        name: 'Akansh'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Akansh'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'Help!!',
        title: 'Help',
        name: 'Akansh'
    })
})

app.get('/weather', (req, res) => {
    const { address } = req.query; 
    if (!address) {
        return res.send({
            error: 'Address must be provided'
        })
    }

    geoCode(address, (error, { lat, long } = {}) => {
        if (error) {
            return res.send({ error })
        } 
        forcast(lat, long, (error, foreCastData) => {
            if (error) {
                return res.send({ error })
            } 
            res.send({
                forcast: foreCastData,
                // location: { lat, long },
                address: req.query.address
            });
        });
    })

    // res.send({
    //     forcast: 50,
    //     location: 'Boston',
    //     address: req.query.address
    // });
});

app.get('/products', (req,res) => {
    console.log(req.query);
    res.send({
        products: []
    })
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Akansh',
        errorMessage: 'Help article not found'
    });
})
// 404 page
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Akansh',
        errorMessage: 'Page not found'
    });
})
app.listen(3000, () => {
    console.log('Server is up on port 3000');
});


