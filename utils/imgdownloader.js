const fs = require('fs');
const axios = require('axios');

const URL_BASE = 'http://localhost:3001/'
// const URL_BASE = "https://plantit-server.herokuapp.com/"

/* ============================================================
  Function: Download Image
============================================================ */

const downloadImage = (url, name) => {
  if(url === null) return new Promise((resolve,reject)=>resolve(null))
  return axios({
    url,
    responseType: 'stream',
  }).then(
    response =>
      new Promise((resolve, reject) => {
        response.data
          .pipe(fs.createWriteStream('public/images/' + name + '.jpg'))
          .on('finish', () => resolve(URL_BASE + 'images/' + name + '.jpg'))
          .on('error', e => reject(e));
      }),
  );
}



exports.downloadImage = downloadImage;

