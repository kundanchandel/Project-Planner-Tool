import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
// import { deleteTokens } from "./auth";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import axios from "../../services/Axios";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  content: {
    flexGrow: 1,
  },
  toolbar: theme.mixins.toolbar,
}));

export default function ClippedDrawer(props) {
  const classes = useStyles();

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [desc, setDescription] = useState("");
  const [category, setCategory] = useState("Chef's Special");
  const [image, setImage] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name,
      desc,
      price,
      category,
      image,
    };
    const response = await axios.post("/dish", data);
    if (response) {
      window.alert("Dish added successfully");
      setName("");
      setPrice(0);
      setDescription("");
      setCategory("");
      setImage("");
      props.pushData(response.data);
    }
    //     console.log(resposne);
    props.handleClose();
  };

  return (
    <div className={classes.root}>
      <main className={classes.content}>
        <div component={Paper}>
          <Container maxWidth="sm">
            <h1> Add Dish to Menu </h1>{" "}
            <TextField
              placeholder="Name"
              label="Name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              variant="outlined"
              fullWidth="true"
              margin="normal"
            />
            <br />
            <TextField
              placeholder="Description"
              label="Description"
              value={desc}
              onChange={(event) => setDescription(event.target.value)}
              variant="outlined"
              margin="normal"
              fullWidth="true"
            />
            <br />
            <Select
              labelId="demo-simple-select-outlined-label"
              placeholder="Category"
              id="demo-simple-select-outlined"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              label="Category"
              variant="outlined"
              margin="normal"
              fullWidth="true"
            >
              <MenuItem value="" disabled>
                Category
              </MenuItem>
              <MenuItem value={"Chef's Special"}>Chef's Special</MenuItem>
              <MenuItem value={"Starter"}>Starter</MenuItem>
              <MenuItem value={"Main Course"}>Main Course</MenuItem>
              <MenuItem value={"Drink"}>Drink</MenuItem>
              <MenuItem value={"Sizzler"}>Sizzler</MenuItem>
              <MenuItem value={"Italian"}>Italian</MenuItem>
              <MenuItem value={"Chinese"}>Chinese</MenuItem>
              <MenuItem value={"South Indian"}>South Indian</MenuItem>
              <MenuItem value={"Sea Food"}>Sea Food</MenuItem>
              <MenuItem value={"Chicken"}>Chicken</MenuItem>
              <MenuItem value={"Mutton"}>Mutton</MenuItem>
              <MenuItem value={"Dessert"}>Dessert</MenuItem>
            </Select>
            <br />
            <TextField
              placeholder="Dish Image"
              label="Dish Image"
              value={image}
              onChange={(event) => setImage(event.target.value)}
              variant="outlined"
              margin="normal"
              fullWidth="true"
            />
            <br />
            <TextField
              placeholder="Enter Price"
              label="Price(in ₹)"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
              variant="outlined"
              margin="normal"
              fullWidth="true"
            />
            <br />
            <br />
            <br />
            <Button color="primary" variant="contained" onClick={onSubmit}>
              Add Dish{" "}
            </Button>{" "}
          </Container>{" "}
        </div>{" "}
      </main>{" "}
    </div>
  );
}
