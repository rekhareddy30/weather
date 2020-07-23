const request = require("request")

const forecast = (latitude, longitude, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=cb266de7383c13e8dc10698d113d49b5&query="+latitude+","+longitude+"&units=f";
    request({url, json:true}, (error, {body} = {})=>{
        if(error){
            callback("Unable to connect forecase service")
        }else if(body.error){
            callback("Invalid Geocode Details. Please try another search")
        }
        else{
            const temp = body.current.temperature;
            const precep = body.current.precip;
            callback(undefined, {
                temp:temp,
                precep : precep,
                weather_description: body.current.weather_descriptions[0],
                humidity: body.current.humidity
            })
        }
    })
}

module.exports = forecast;