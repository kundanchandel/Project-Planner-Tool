import React, { useState } from "react";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import { makeStyles } from "@material-ui/core/styles";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  toolbar: theme.mixins.toolbar,
}));

export default function Sidebar() {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.toolbar} />{" "}
      <List>
        <ListItem button>
          <ListItemText primary="Order" />{" "}
        </ListItem>{" "}
        <ListItem button>
          <ListItemText primary="Menu" />{" "}
          {open ? <ExpandLess /> : <ExpandMore />}{" "}
        </ListItem>{" "}
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button className={classes.nested}>
              <ListItemText primary="Menu List" />{" "}
            </ListItem>{" "}
            <ListItem button className={classes.nested}>
              <ListItemText primary="Add Item" />{" "}
            </ListItem>{" "}
          </List>{" "}
        </Collapse>{" "}
        <ListItem button>
          <ListItemText primary="Payment" />
        </ListItem>{" "}
      </List>{" "}
    </Drawer>
  );
}
