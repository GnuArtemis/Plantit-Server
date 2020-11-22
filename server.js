const express = require('express');
const mongoose = require("mongoose");
const apiGetRoutes = require('./routes/getRoutes')
const cors = require("cors")
const compression = require("compression");


const app = express();
const PORT = process.env.PORT || 3001;
app.use(cors())
app.use(express.urlencoded({ limit: '200mb',extended: true }));
app.use(express.json({ limit: '200mb',extended: true }));
app.use(compression());

app.use(express.static("public"));


mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/dbPlantit", {
    useNewUrlParser: true,
    useFindAndModify: false
})

//routes
app.use(require('./routes/getRoutes.js'));
app.use(require('./routes/postRoutes.js'));
app.use(require('./routes/editRoutes.js'))
app.use(require('./routes/userRoutes.js'))



app.listen(PORT, function () {
    console.log(`Now listening on port: ${PORT}`);
});
