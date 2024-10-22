const path = require('path');
const hbs = require('hbs');
const express = require('express');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

//define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, "../templates/partials");


//set up handlebars and views location
app.set('view engine', 'hbs');
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//set up static directory to serve (html, css, other assets)
app.use(express.static(publicDirectoryPath));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
 
//configure the routes for the app
app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Nada Rachedi',
  }); //'index' handlebars template
})

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Nada Rachedi",
  }); //'about' handlebars template
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: 'Nada Rachedi',
    message: "This is the help message to display on the help page.",
  }); //'help' handlebars template
});

app.get("/weather", (req, res) => {
  const address = req.query.address;
  console.log(res);
  if (!address) {
    return res.send({
      error: 'You must specify an address.'
    });
  }

  geocode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({
        error,
      });
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (!forecastData) {
        return res.send({
          error,
        });
      }

      res.send({
        address,
        location,
        forecast: forecastData,
      });
    });
  });
});

app.get('/help/*', (req, res) => {
  res.render("page-not-found", {
    title: "404",
    name: "Nada Rachedi",
    errorMessage: "Help article not found",
  });});

app.get('*', (req, res) => {
  res.render("page-not-found", {
    title: "404",
    name: "Nada Rachedi",
    errorMessage: "Page not found",
  });
});

app.listen(3000, () => {
  console.log('Server is up on port 3000.')
});
