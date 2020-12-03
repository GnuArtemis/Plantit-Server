const fs = require('fs');
const axios = require('axios');
const cloudinary = require('cloudinary').v2
const db = require("../models");

/* ============================================================
  Function: Download Image
============================================================ */

const downloadImage = (url, name, _id) => {
  console.log(url + " " + name)
  if(url === null) return
  cloudinary.uploader.upload(url, { public_id: name }, function (err, image) {
  console.log();
  console.log("** Remote Url");
  if (err) { console.warn(err); }
  console.log("* " + image.public_id);
  console.log("* " + image.url);
  db.Plant.findByIdAndUpdate(_id, {image_url:image.url}).then(res=>console.log("updated"))
});
}



exports.downloadImage = downloadImage;

