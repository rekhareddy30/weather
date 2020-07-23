const path = require("path")
const express = require("express")
const hbs = require("hbs")
const forecast = require("./utilis/forecast")
const geocode = require("./utilis/geocode")

const app = express(); 
const port = process.env.PORT || 3000

//Define Paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//set handlebars engine and views location
app.set("views", viewsPath);
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath);
// set up static directory to server
app.use(express.static(publicDirectoryPath))

app.get('', (req, res)=>{
    res.render('index', {
        title:"Weather",
        name: "Rekha"
    })
})
app.get('/about', (req, res) => {
    res.render("about", {
        title: "About ME",
        name:"Rekha 1"
    })
})
app.get('/help', (req, res) => {
    res.render("help", {
        title: "Help ME",
        name: "Rekha 2"
    })
})
app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({
            error: "You must provide an address to check weather details"
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({
                error:"Error :" + error
            })
        }

        forecast(latitude, longitude, (error, {weather_description, temp, precep, humidity} = {}) => {
            if(error){
                return res.send({
                    error:"Error :" + error
                })
            }
           // console.log("Location : " + location);
           //console.log();
           res.send({
            address:req.query.address,
            forecast:weather_description+ ". It is currently "+ temp + " degrees out. There is "+ precep + "% chance of rain. Humidity " + humidity + "%" ,
            location,
            temp,
            precep
        })
        })
    })
    
})
app.get('/products', (req, res) => {
    if(!req.query.address){
        return res.send({
            error:"You must provide address to check weather details"
        })
    }
    res.send({
        address:req.query.address
    })
})
app.get('/help/*', (req, res) => {
    res.render("error", {
        title:"404",
        name:"Rekha",
        error: "Help Article not found."
    })
})
app.get('*', (req, res) => {
    res.render("error", {
        title:"404",
        name:"Rekha",
        error: "Page not Found"
    })
})
app.listen(port, () => {
    console.log("Server is UP on port "+port)
})
