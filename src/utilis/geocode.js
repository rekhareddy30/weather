const request = require("request")

const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+ encodeURIComponent(address)+".json?access_token=pk.eyJ1IjoicmVraGFtYXBib3giLCJhIjoiY2tjZDJoZjV6MGFmdzJ4cG0zaW4ydnh4biJ9._Q61O-VuqgQyLXSkrFIPRw&limit=1"
    request({url, json:true}, (error, {body} = {}) => {
        if(error){
            callback('Unable to connect to location services')
        } else if(!body.features){
            callback("Unable to find location. Try another search")
        }else if(!body.features[0]){
            callback("Unable to find location. Try another search")
        }
        else {
            callback(undefined, {
                latitude : body.features[0].center[0],
                longitude : body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode;