import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    cursor: "pointer",
  },
  menuItem: {
    marginRight: "15px",
    fontSize: "18px",
    cursor: "pointer",
  },
}));

export default function Header() {
  const classes = useStyles();

  const handleLogout = () => {
    localStorage.setItem("x-access-token", "");
    window.open("/", "_self");
  };
  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton> */}
        <Typography variant="h5" className={classes.title} noWrap>
          Q-DineIn
        </Typography>

        {localStorage.getItem("x-access-token") && (
          <div style={{ display: "flex" }}>
            <Typography
              className={classes.menuItem}
              onClick={() => {
                window.open("/cart", "_self");
              }}
            >
              Your Cart
            </Typography>
            <Typography className={classes.menuItem} onClick={handleLogout}>
              Logout
            </Typography>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
}
