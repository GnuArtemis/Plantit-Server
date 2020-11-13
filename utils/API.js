const axios = require("axios");
const fetch = require('node-fetch');

const API = {

    getAllPlants: function (usertoken) {
        return axios.get('https://trefle.io/api/v1/plants?token=' + usertoken)
    },

    searchPlant: function (query,userToken) {
        return axios.get('https://trefle.io/api/v1/plants/search?token=' +userToken + '&q=' + query)
    },

    searchSlug: function (slug) {
        return axios.get('https://trefle.io/api/v1/species/' + slug + '?token=Skz55F34QUIf4x5I-NbiZdMrmWgIUElcEwJHPncRbkA')
    },

    formatSearchResults: function({data}) {
        // console.log(data)
        const allData = [];
        data.forEach(element => {
            const dataFormatted = {};
            dataFormatted.common_name = element.common_name;
            dataFormatted.scientific_name = element.scientific_name;
            dataFormatted.image_url = element.image_url;
            allData.push(dataFormatted)
        })
        return allData;
    },

    fetchToken: async function () {

        const params = {
            origin: 'http://localhost:3000',
            token: 'Skz55F34QUIf4x5I-NbiZdMrmWgIUElcEwJHPncRbkA'
          }
        const response = await fetch(
            'https://trefle.io/api/auth/claim', {
              method: 'post',
              body: JSON.stringify(params),
              headers: { 'Content-Type': 'application/json' }
            });
          const json = await response.json();
        //   console.log(json);
          return json;
    }
    
}

module.exports = API