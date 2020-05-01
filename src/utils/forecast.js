const request = require('request'); 

const weatherStack = (lat, long, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=17372f4780996039daced1ffdc778c89&query=${lat},${long}`;

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service');
        } else if (body.error) {
            callback('Incorrect location provided');
        } 
        else {
            const { current } = body;
            callback(undefined, `It is currently ${current.temperature} degrees out. There is a ${current.precip}% chances of rain`);
        }
    })
}

module.exports = weatherStack;