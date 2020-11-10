const express = require('express');
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/dbPlantit", {
    useNewUrlParser: true,
})

//routes
app.use(require('./routes/getRoutes.js'));

app.listen(PORT, function () {
    console.log(`Now listening on port: ${PORT}`);
});
