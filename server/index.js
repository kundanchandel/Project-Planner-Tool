const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require('mongoose');
const methodOverride = require("method-override");

const config = require("./config/key");

const connect = mongoose.connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));


app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(cookieParser());

const Dishes = require('./models/dishModel');


app.use('/uploads', express.static('uploads'));

// // Serve static assets if in production
// if (process.env.NODE_ENV === "production") {

//   // Set static folder
//   app.use(express.static("client/build"));

//   // index.html for all page routes
//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
//   });
// }

const port = process.env.PORT || 5000

app.get("/", async (req, res) => {
  try {
    const dishes = await Dishes.find();
    res.json(dishes);
  } catch (err) {
    res.json({
      message: err
    });
  }
})

app.get("/dishes", async (req, res) => {
  try {
    const dishes = await dishModel.find();
    res.json(dishes);
  } catch (err) {
    res.json({
      message: err
    });
  }
});




//ADD DISHES

app.post("/dishes", async (req, res) => {
  const dish = new Dishes({
    name: req.body.name,
    image: req.body.image,
    price: req.body.price,
    category: req.body.category,
    desc: req.body.desc,
    quantity: req.body.quantity
  });
  try {
    const savedDish = await dish.save();
    res.json(savedDish)
  } catch (err) {
    res.json({
      message: err
    });
  };
})

//SHOW ROUTE

app.listen(port, () => {
  console.log(`Server Running at ${port}`)
});