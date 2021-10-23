const path = require('path')
const express = require('express')
const hbs = require('hbs')
const { response } = require('express')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectory = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/parstials')

// Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory
app.use(express.static(publicDirectory))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather', 
        name: 'Phil'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Phil'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpText: 'This is a helpful message',
        name: 'Phil'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.location) {
        return res.send({
            error: "Please provide a location"
        })
    } else {
        geocode(req.query.location, (error, {longitude, latitude, location} = {}) => {
       
            if (error) {
            return res.send({
                error: error
            })
            } 
    
            forecast(longitude, latitude, (error, forecastObject) => {
                if (error) {
                    return res.send({
                        error: error
                    })
                }
                // console.log(location)
                // console.log(forecastData)
                res.send({
                    location: location,
                    forecast: forecastObject
                })
            })
            
        })
    }
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term."
        })

    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: "Phil",
        errorMessage: 'Help article not found!',
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: "404",
        name: "Phil",
        errorMessage: "Page not found."
    })
})

app.listen(port,() => {
    console.log('Server is up on port', port)
}) 