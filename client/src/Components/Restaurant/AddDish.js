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

  const [quantity, setQuantity] = useState(0);
  return (
    <div>
      <Card>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image="https://images.unsplash.com/photo-1490818387583-1baba5e638af?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1231&q=80"
            title="Contemplative Reptile"
          />
          <CardContent>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Typography gutterBottom variant="h5" component="h2" style={{marginTop:"50px"}}>
                {props.dish.name}
              </Typography>
              <Typography gutterBottom variant="h6" component="h2">
                {props.dish.price}/-
              </Typography>
            </div>
            <Typography variant="h6" color="textSecondary" component="h2">
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
                  setQuantity(e.target.value);
                }}
              />
              <Typography variant="h6" color="textSecondary" component="h2">
                Total: {quantity * props.dish.price}
              </Typography>
            </div>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Share
          </Button>
          <Button size="small" color="primary">
            Learn More
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}
