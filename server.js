// Server setup, with a mongo database and a external site.

const express = require('express');
const mongoose = require("mongoose");
const cors = require("cors")
const compression = require("compression");
require('dotenv').config()

// Configuration
const app = express();
const PORT = process.env.PORT || 3001;
app.use(cors())
app.use(express.urlencoded({ limit: '200mb',extended: true }));
app.use(express.json({ limit: '200mb',extended: true }));
app.use(compression());

app.use(express.static("public"));

// Mongo database connection
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/dbPlantit", {
    useNewUrlParser: true,
    useFindAndModify: false
})

//routes
app.use(require('./routes/getRoutes.js'));
app.use(require('./routes/postRoutes.js'));
app.use(require('./routes/editRoutes.js'))
app.use(require('./routes/userRoutes.js'))


// Starts the server
app.listen(PORT, function () {
    console.log(`Now listening on port: ${PORT}`);
});
