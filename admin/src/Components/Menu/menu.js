import React, { useEffect, useState } from "react";
import axios from "../../services/Axios";
import AddItem from "./AddItem";
import Modal from "@material-ui/core/Modal";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { AiOutlineMenu, AiFillDelete, AiFillEdit } from "react-icons/ai";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import Button from "@material-ui/core/Button";
import EditMenu from "./EditMenu";
import CancelIcon from '@material-ui/icons/Cancel';
export default function Menu() {
  const [menu, setmenu] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editData, setEditData] = useState({});
  useEffect(() => {
    getData();
  }, []);

  const handleEdit = (data) => {
    setEditData(data);
    setEditOpen(true);
  };
  const handleDelete = async (id) => {
    const response = await axios.delete(`/dish/${id}`);
    if (response.data) {
      const tempMenu = menu.filter((dish) => {
        return dish._id != response.data._id;
      });
      setmenu(tempMenu);
    }
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getData = async () => {
    const response = await axios.get("/dish");
    if (response.data) {
      setmenu(response.data);
    }
  };
  const updateData = (data) => {
    var idx = -1;
    for (let i = 0; i < menu.length; i++) {
      if (menu[i]._id == data._id) {
        idx = i;
        break;
      }
    }
    var tempMenu = menu;
    tempMenu.splice(idx, 1, data);
    setmenu(tempMenu);
  };
  const pushData = (data) => {
    var tempdata = menu;
    tempdata.push(data);
    setmenu(tempdata);
  };

  return (
    <div>
      <button type="button" onClick={handleOpen}
      style={{
        textDecoration: "none",
        border: "1px solid #3f51b5",
        borderRadius: "5px",
        padding: "5px",
        backgroundColor: "#3f51b5",
        color: "white",
        fontWeight: "bold",
      }}>
        Add Dish
      </button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <p style={{ fontWeight: "bolder", fontSize: "1.4rem" }}>Name</p>
              </TableCell>
              <TableCell>
                <p style={{ fontWeight: "bolder", fontSize: "1.4rem" }}>
                  Description
                </p>
              </TableCell>
              <TableCell>
                <p style={{ fontWeight: "bolder", fontSize: "1.4rem" }}>
                  Category
                </p>
              </TableCell>
              <TableCell>
                <p style={{ fontWeight: "bolder", fontSize: "1.4rem" }}>
                  Price
                </p>
              </TableCell>
              <TableCell>
                <p style={{ fontWeight: "bolder", fontSize: "1.4rem" }}>
                  Edit/Delete
                </p>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {menu.map((item) => (
              <TableRow key={item.name}>
                <TableCell component="th" scope="row">
                  {item.name}
                </TableCell>
                <TableCell>{item.desc}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>₹{item.price}</TableCell>
                <TableCell>
                  <p style={{ textAlign: "center", cursor: "pointer" }}>
                    <ContextMenuTrigger id={item._id} holdToDisplay={0}>
                      <AiOutlineMenu />
                    </ContextMenuTrigger>
                  </p>
                  <ContextMenu
                    id={item._id}
                    style={{ backgroundColor: "#f5f5f5" }}
                  >
                    <MenuItem>
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={<AiFillEdit />}
                        style={{ width: "120px", margin: "5px" }}
                        onClick={() => {
                          handleEdit(item);
                        }}
                      >
                        Edit
                      </Button>
                    </MenuItem>
                    <MenuItem>
                      <Button
                        variant="contained"
                        color="secondary"
                        startIcon={<AiFillDelete />}
                        style={{ width: "120px", margin: "5px" }}
                        onClick={() => {
                          handleDelete(item._id);
                        }}
                      >
                        Delete
                      </Button>
                    </MenuItem>
                  </ContextMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal open={open} onClose={handleClose}>
        <div
          style={{
            width: "500px",
            background: "white",
            height: "600px",
            margin: "auto",
            marginTop: "100px",
            padding: "10px",
          }}
        >
          <div
            style={{
              float: "right",
              fontSize: "24px",
              fontWeight: "bolder",
              margin: "5px",
              cursor: "pointer",
            }}
            onClick={handleClose}
          >
            <CancelIcon/>
          </div>
          <AddItem pushData={pushData} handleClose={handleClose} />
        </div>
      </Modal>
      <Modal open={editOpen} onClose={() => setEditOpen(false)}>
        <div
          style={{
            width: "500px",
            background: "white",
            height: "500px",
            margin: "auto",
            marginTop: "100px",
            padding: "10px",
          }}
        >
          <div
            onClick={handleClose}
          >
            <CancelIcon/>
          </div>
          <EditMenu
            data={editData}
            updateData={updateData}
            handleClose={() => {
              setEditOpen(false);
            }}
          />
        </div>
      </Modal>
    </div>
  );
}
