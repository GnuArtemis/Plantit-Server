const express = require('express');
const mongoose = require("mongoose");
const apiGetRoutes = require('./routes/getRoutes')

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/dbPlantit", {
    useNewUrlParser: true,
})

//routes
<<<<<<< HEAD
app.use(apiGetRoutes);
=======
app.use(require('./routes/getRoutes.js'));
app.use(require('./routes/postRoutes.js'));

>>>>>>> dev

app.listen(PORT, function () {
    console.log(`Now listening on port: ${PORT}`);
});
