import React, { useState, useEffect } from "react";
import axios from "../../services/Axios";
import AddDish from "./AddDish";
import Modal from "@material-ui/core/Modal";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import "./Restaurant.css";
const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: "500px",
    backgroundColor: "rgb(0,0,0,0.5)",
    color: "white",
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
}));
export default function Restaurant(props) {
  const classes = useStyles();
  const [menu, setMenu] = useState([]);
  const [name, setName] = useState("");
  // const [cart, setCart] = useState({});
  const [addDishOpen, setAddDishopen] = useState(false);
  const [dishToAdd, setDishToAdd] = useState({});
  const handleAddDishClose = () => {
    setAddDishopen(false);
  };
  const getData = async () => {
    const id = props.match.params.id;
    const response = await axios.get(`/restaurant/${id}/menu`);
    if (response.data) {
      setMenu(response.data.menu);
      setName(response.data.username);
    }
  };
  const handleSetDishToAdd = (dish) => {
    setDishToAdd(dish);
    setAddDishopen(true);
  };
  useEffect(() => {
    getData();
    localStorage.setItem("restId", props.match.params.id);
  }, []);

  return (
    <div className="restContainer">
      <div
        style={{
          color: "#fe346e",
          textAlign: "center",
          width: "100%",
          float: "left",
        }}
      >
        <h1>Welcome to {name}!!!</h1>
      </div>
      <div className="cardContainer">
        {menu.map((dish) => (
          <div className="card">
            <Paper className={classes.paper}>
              <Grid container spacing={2}>
                <Grid item>
                  <ButtonBase className={classes.image}>
                    <img
                      className={classes.img}
                      alt="complex"
                      src={dish.image}
                    />
                  </ButtonBase>
                </Grid>
                <Grid item xs={12} sm container>
                  <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs>
                      <Typography gutterBottom variant="subtitle1">
                        <h3 style={{ margin: "0" }}>{dish.name}</h3>
                      </Typography>
                      <Typography
                        variant="body2"
                        gutterBottom
                        style={{ margin: 0 }}
                      >
                      {dish.desc}
                      </Typography>
                      <Typography
                        variant="body2"
                        style={{ margin: 0 }}
                      >
                        {dish.category}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="body2" style={{ cursor: "pointer" }}>
                        <button
                          className='atcBtn'
                          onClick={() => {
                            handleSetDishToAdd(dish);
                          }}
                        >
                          Add To Cart
                        </button>
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle1">₹{dish.price}</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </div>
        ))}
      </div>
      {menu.length == 0 ? <p>No Menu Item</p> : ""}

      <Modal open={addDishOpen} onClose={handleAddDishClose}>
        <div
          style={{
            width: "500px",
            maxWidth: "90vw",
            background: "white",
            margin: "auto",
            marginTop: "100px",
            padding: "0px",
          }}
        >
          <AddDish dish={dishToAdd} handleClose={handleAddDishClose} />
        </div>
      </Modal>
    </div>
  );
}
