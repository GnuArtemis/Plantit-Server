const axios= require("axios");

const API= {

getAllPlants: function() {
       return axios.get('https://trefle.io/api/v1/plants?token=Skz55F34QUIf4x5I-NbiZdMrmWgIUElcEwJHPncRbkA')
    },

searchPlant: function(query) {
        return axios.get('https://trefle.io/api/v1/plants/search?token=Skz55F34QUIf4x5I-NbiZdMrmWgIUElcEwJHPncRbkA&q=' + query)
    },
    
searchSlug: function(slug) {
        return axios.get('https://trefle.io/api/v1/species/' + slug + '?token=Skz55F34QUIf4x5I-NbiZdMrmWgIUElcEwJHPncRbkA')
    },

}

module.exports= API