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

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 500,
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
  const [cart, setCart] = useState({});
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
  useState(() => {
    getData();
  }, []);

  return (
    <div>
      <div
        style={{
          color: "#3f51b5",
          textAlign: "center",
          width: "100%",
          float: "left",
        }}
      >
        <h1>Welcome to {name}!!!</h1>
      </div>
      {menu.map((dish) => (
        <div className={classes.root}>
          <Paper className={classes.paper}>
            <Grid container spacing={2}>
              <Grid item>
                <ButtonBase className={classes.image}>
                  <img
                    className={classes.img}
                    alt="complex"
                    src="https://th.bing.com/th/id/OIP.ZMGnz9qTvFn5Kfm5Hes_HwHaHa?w=211&h=211&c=7&o=5&dpr=1.25&pid=1.7"
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
                      color="textSecondary"
                      style={{ margin: 0 }}
                    >
                      {dish.category}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="body2" style={{ cursor: "pointer" }}>
                      <Button
                        style={{ margin: 0 }}
                        onClick={() => {
                          handleSetDishToAdd(dish);
                        }}
                      >
                        Add To Cart
                      </Button>
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

      {menu.length == 0 ? <p>No Menu Item</p> : ""}

      <Modal open={addDishOpen} onClose={handleAddDishClose}>
        <div
          style={{
            width: "500px",
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
