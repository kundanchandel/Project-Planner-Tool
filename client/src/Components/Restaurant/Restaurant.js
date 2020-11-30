import React, { useState, useEffect } from "react";
import axios from "../../services/Axios";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import AddDish from "./AddDish";
import Modal from "@material-ui/core/Modal";
import { Button } from "@material-ui/core";
export default function Restaurant(props) {
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
      <div>{name}</div>
      <TableContainer>
        <Table aria-label="simple table">
          {menu.length > 0 && (
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Decsription</TableCell>
                <TableCell>Categroy</TableCell>
                <TableCell>Price</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
          )}
          <TableBody>
            {menu &&
              menu.map((dish) => (
                <TableRow key={dish.name}>
                  <TableCell component="th" scope="row">
                    {dish.name}
                  </TableCell>
                  <TableCell>{dish.desc}</TableCell>
                  <TableCell>{dish.category}</TableCell>
                  <TableCell>{dish.price}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => {
                        handleSetDishToAdd(dish);
                      }}
                    >
                      Add To Cart
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
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
