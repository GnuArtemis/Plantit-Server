const axios= require("axios");

function SearchPlant(query) {
    return axios.get('https://trefle.io/api/v1/plants/search?token=Skz55F34QUIf4x5I-NbiZdMrmWgIUElcEwJHPncRbkA&q=' + query)
}

module.exports= SearchPlant