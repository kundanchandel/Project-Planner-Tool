const express = require('express');
const app = express();
const AdminRoutes = require('./Routes/restaurant');
// const DishRoutes = require('./Routes/dishes');
<<<<<<< HEAD
=======
const UserRoutes = require('./Routes/user')
>>>>>>> fbf5d1fd81080d52cea90b4fc43c1abb3f3da429
const mongoose = require('mongoose');
const bodyparser = require("body-parser");

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
        extended: true
}));
mongoose.connect('mongodb+srv://mayuri:3oOrxk6VIh2oIsHn@cluster0.rhdr5.mongodb.net/qDineIn?retryWrites=true&w=majority', () => {
        console.log('Connected')
})

app.use('/api/restaurant', AdminRoutes);
<<<<<<< HEAD
=======
app.use('/api/user', UserRoutes);
>>>>>>> fbf5d1fd81080d52cea90b4fc43c1abb3f3da429
// app.use('/api/', DishRoutes);

const PORT = 7000;
app.listen(PORT, (err) => {
        if (err) {
                console.log(err);
        } else {
                console.log(`Server Started at port: ${PORT}`);
        }
})