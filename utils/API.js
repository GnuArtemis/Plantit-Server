const axios= require("axios");

function getAllPlants () {
       return axios.get('https://trefle.io/api/v1/plants?token=Skz55F34QUIf4x5I-NbiZdMrmWgIUElcEwJHPncRbkA')
    }

module.exports= getAllPlants