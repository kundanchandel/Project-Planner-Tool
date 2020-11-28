import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  menuItem:{
    marginRight:'15px',
    fontSize:'18px'
  }
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
        </Typography >
        <Typography className={classes.menuItem} onClick={()=>{window.open('/menu','_self')}}>Menu</Typography>
        <Typography className={classes.menuItem}>Orders</Typography>
        {localStorage.getItem("x-access-token") && (
          <Typography className={classes.menuItem} onClick={handleLogout}>Logout</Typography>
        )}
      </Toolbar>
    </AppBar>
  );
}
