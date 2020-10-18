const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyparser = require("body-parser");

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
        extended: true
}));

const AdminRoutes = require('./Routes/restaurant');
const DishRoutes = require('./Routes/menu');
const UserRoutes = require('./Routes/user')
mongoose.connect('mongodb+srv://mayuri:3oOrxk6VIh2oIsHn@cluster0.rhdr5.mongodb.net/qDineIn?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true
}, () => {
        console.log('Connected')
})

app.use('/api/restaurant', AdminRoutes);
app.use('/api/user', UserRoutes);
app.use('/api/', DishRoutes);

const PORT = 7000;
app.listen(PORT, (err) => {
        if (err) {
                console.log(err);
        } else {
                console.log(`Server Started at port: ${PORT}`);
        }
})