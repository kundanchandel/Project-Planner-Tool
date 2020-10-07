var mongoose = require('mongoose');

var AdminSchema = new mongoose.Schema({
        username:{type:String},
        email:{type:String},
        phoneno:{type:String},
        password:{type:String}
});

module.exports = mongoose.model("Admin",AdminSchema);