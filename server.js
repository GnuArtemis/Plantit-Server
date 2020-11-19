const express = require('express');
const mongoose = require("mongoose");
const apiGetRoutes = require('./routes/getRoutes')
const cors = require("cors")

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ limit: '200mb',extended: true }));
app.use(express.json({ limit: '200mb',extended: true }));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/dbPlantit", {
    useNewUrlParser: true,
})

//routes
app.use(require('./routes/getRoutes.js'));
app.use(require('./routes/postRoutes.js'));
app.use(require('./routes/userRoutes.js'))

// app.use(cors(
//     // {origin:["http://localhost:3000"]}
//     ))

app.use(cors())

app.listen(PORT, function () {
    console.log(`Now listening on port: ${PORT}`);
});
