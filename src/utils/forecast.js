const request = require('request')

const forecast = (longitude, latitude, callback) => {
    const weatherUrl = 'http://api.weatherstack.com/current?access_key=83335a7823daf4bb7b2dfd74e17c640a&query=' + latitude + ',' + longitude + '&units=m'
    
    request({url: weatherUrl, json:true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback(body.error.info, undefined)
        } else {
            // console.log(body)
            const currentTemp = body.current.temperature
            const feelsLike = body.current.feelslike
            callback(undefined, {
                currentTemp,
                feelsLike,
                description: body.current.weather_descriptions,
                precip: body.current.precip,
                cloudcover: body.current.cloudcover,
                humidity: body.current.humidity,
                time: body.current.observation_time,
                region: body.location.region,
                country: body.location.country
            })
        }
    })
}

module.exports = forecast