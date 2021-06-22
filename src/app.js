const path = require('path');
const express = require('express');
const hbs = require('hbs');
//const request = require('request');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Set up static directory
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  // gets view and converts to html
  res.render('index', {
    title: 'Weather App',
    name: 'Christine'
  });
})

app.get('/about', (req, res) => {
  // gets view and converts to html
  res.render('about', {
    title: 'About Page',
    name: 'Christine'
  });
})

app.get('/help', (req, res) => {
  // gets view and converts to html
  res.render('help', {
    title: 'Help',
    message: 'This page will display information to help with use of the site.',
    name: 'Christine',
    //errorMessage: 'Help article not found'
  });
})
 

app.get('/weather', (req, res) => {
  if (!req.query.address) {
      return res.send({
          error: 'You must provide an address!'
      })
  }

  geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
      if (error) {
          return res.send({ error }) 
      }

      forecast(latitude, longitude, (error, forecastData) => {
          if (error) {
              return res.send({ error })
          }

          res.send({
              forecast: forecastData,
              location,
              address: req.query.address
          })
      })
  })
})


app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term'
    })
  }
  res.send({
    products: []
  })
})

// Error handling – Help
app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    errorMessage: 'Help article not found',
    name: 'Christine'
  });
})

// Error handling – General
app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    errorMessage: 'Page not found',
    name: 'Christine'
  });
})


app.listen(3000, () => {
  console.log('Server is up on port 3000.');
})