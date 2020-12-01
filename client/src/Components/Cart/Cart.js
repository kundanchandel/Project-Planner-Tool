import React, { useEffect, useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { MdDelete } from "react-icons/md";
import Button from "@material-ui/core/Button";
import axios from "../../services/Axios";
export default function Cart() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    getData();
    const cart = JSON.parse(localStorage.getItem("cart"));
    setCart(cart);
    var total = 0;
    cart.map((item) => {
      total = total + item.quantity * item.dish.price;
    });
    setTotal(total);
  }, []);
  const getData = async () => {
    const orders = await axios.get("/order");
    console.log(orders,'orders');
  };
  const handleRemoveFromCart = (idx) => {
    cart.splice(idx, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    window.location.reload();
  };

  const handlePlaceOrder = async () => {
    const restId = localStorage.getItem("restId");
    var dish = [];
    cart.forEach((item) => {
      dish.push({ _id: item.dish._id, quantity: item.quantity });
    });
    const response = await axios.post(`/restaurant/${restId}/order`, { dish });
    console.log(response);
  };
  return (
    <div>
      <div>
        <h1>Cart</h1>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Total</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cart.map((item, idx) => {
                return (
                  <TableRow>
                    <TableCell>{item.dish.name}</TableCell>
                    <TableCell>{item.dish.price}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>
                      {item.dish.price * parseInt(item.quantity)}
                    </TableCell>
                    <TableCell onClick={() => handleRemoveFromCart(idx)}>
                      {<MdDelete />}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <div
          style={{
            display: "flex",
            marginTop: "5px",
            justifyContent: "flex-end",
          }}
        >
          <p>Total Price: {total}/-</p>
          <Button
            variant="contained"
            color="primary"
            style={{ margin: "0px 5px 0px 25px", height: "40px" }}
            onClick={handlePlaceOrder}
          >
            Place Order
          </Button>
        </div>
      </div>
    </div>
  );
}
