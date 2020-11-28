import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
// import { deleteTokens } from "./auth";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import axios from "../../services/Axios";
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
  const [category, setCategory] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name,
      desc,
      price,
      category,
    };
    const response = await axios.post("/dish", data);
    if (response) {
      window.alert("Dish added successfully");
      setName("");
      setPrice(0);
      setDescription("");
      setCategory("");
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
            <h1> Add Item </h1>{" "}
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
            <TextField
              placeholder="Category"
              label="Category"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              variant="outlined"
              margin="normal"
              fullWidth="true"
            />
            <br />
            <TextField
              placeholder="Enter Price"
              label="Price"
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
              Add Item{" "}
            </Button>{" "}
          </Container>{" "}
        </div>{" "}
      </main>{" "}
    </div>
  );
}
