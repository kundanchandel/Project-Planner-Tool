var express = require('express');
var app = express();


var PORT = 7000;
app.listen(PORT,(err)=>{
      if(err){
              console.log(err);
      }else{
              console.log(`Server Started at port: ${PORT}`);
      }
})