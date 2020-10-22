const express     = require('express');
const app         = express();
const AdminRoutes = require('./Routes/restaurant');
require("dotenv").config()

// const DishRoutes = require('./Routes/dishes');

const UserRoutes = require('./Routes/user')
const mongoose   = require('mongoose');
const bodyparser = require("body-parser");

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
        extended: true
}));
mongoose.connect(process.env.MONGO_URI, () => {
        console.log('Connected')
})

app.use('/api/restaurant', AdminRoutes);
app.use('/api/user', UserRoutes);

// app.use('/api/', DishRoutes);

const PORT = 7000;
app.listen(PORT, (err) => {
        if (err) {
                console.log(err);
        } else {
                console.log(`Server Started at port: ${PORT}`);
        }
})