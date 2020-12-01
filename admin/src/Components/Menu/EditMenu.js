import React, { useEffect, useState } from "react";
import axios from "../../services/Axios";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  content: {
    flexGrow: 1,
  },
  toolbar: theme.mixins.toolbar,
}));

export default function EditMenu(props) {
  const classes = useStyles();
  const [name, setName] = useState(props.data.name);
  const [price, setPrice] = useState(props.data.price);
  const [desc, setDescription] = useState(props.data.desc);
  const [category, setCategory] = useState(props.data.category);
  const onSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name,
      desc,
      price,
      category,
    };
    const response = await axios.put(`/dish/${props.data._id}`, data);
//     console.log(response);
    if (response) {
//       window.alert("Dish Edited successfully");
      setName("");
      setPrice(0);
      setDescription("");
      setCategory("");
      props.updateData(response.data);
    }

    props.handleClose();
  };
  return (
    <div className={classes.root}>
      <main className={classes.content}>
        <div component={Paper}>
          <Container maxWidth="sm">
            <h1> Edit Dish in Menu</h1>{" "}
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
              OK{" "}
            </Button>{" "}
          </Container>{" "}
        </div>{" "}
      </main>{" "}
    </div>
  );
}
