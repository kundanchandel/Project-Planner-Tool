var express = require('express');
var app = express();
var AdminRoutes = require('./Routes/admin');
var mongoose = require('mongoose');
var bodyparser      = require("body-parser");

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
mongoose.connect('mongodb+srv://mayuri:3oOrxk6VIh2oIsHn@cluster0.rhdr5.mongodb.net/qDineIn?retryWrites=true&w=majority',()=>{
        console.log('Connected')
})

app.use('/api/admin',AdminRoutes);

var PORT = 7000;
app.listen(PORT,(err)=>{
      if(err){
              console.log(err);
      }else{
              console.log(`Server Started at port: ${PORT}`);
      }
})