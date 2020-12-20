import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
const useStyles = makeStyles({
  media: {
    height: "200px",
  },
});
export default function AddDish(props) {
  const classes = useStyles();

  const [quantity, setQuantity] = useState(1);
  const handelCancel = () => {
    props.handleClose();
  };
  const handleAdd = () => {
    var cart = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];
    cart.push({ dish: props.dish, quantity });
    localStorage.setItem("cart", JSON.stringify(cart));
    handelCancel();
  };
  return (
    <div>
      <Card>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={props.dish.image}
            title=""
          />
          <CardContent>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Typography gutterBottom variant="h5" component="h2" style={{}}>
                {props.dish.name}
              </Typography>
              <Typography gutterBottom variant="h6" component="h2">
                ₹{props.dish.price}/-
              </Typography>
            </div>
            <Typography
              variant="h6"
              color="textSecondary"
              component="h2"
              style={{ marginBottom: "10px", fontSize: "1em" }}
            >
              {props.dish.desc}
            </Typography>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <TextField
                id="filled-number"
                label="Quantity"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                size="small"
                value={quantity}
                onChange={(e) => {
                  e.target.value > 0 && setQuantity(e.target.value);
                }}
              />
              <Typography variant="h6" color="textSecondary" component="h2">
                Total: ₹{quantity * props.dish.price}/-
              </Typography>
            </div>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" style={{ color: "#fe346e" }} onClick={handleAdd}>
            Add
          </Button>
          <Button
            size="small"
            style={{ color: "#fe346e" }}
            onClick={handelCancel}
          >
            Cancel
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}
